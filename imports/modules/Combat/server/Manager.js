import { Meteor } from 'meteor/meteor';
import _ from 'lodash';

import agenda from '/imports/modules/Core/server/Agenda';
import GameDesign from '/imports/content/GameData/server/GameDesign';

import CombatCollection from './collection';
import { JOB_TYPE, COMBAT_STATE, LOG_ACTION } from '../lib/constants';
import CombatMath from './CombatMath';
import LogLine from './LogLine';
import UserHelpers from '/imports/modules/User/lib/helpers';
import CharacterManager from '/imports/modules/Character/server/Manager';

function getNextTurnDate() {
  const timeoutDate = new Date();
  const { combatTurnTimeout } = GameDesign;
  timeoutDate.setSeconds(timeoutDate.getSeconds() + combatTurnTimeout);
  return timeoutDate;
}

function scheduleNextTurn(timeoutDate, combatId) {
  agenda.schedule(timeoutDate, JOB_TYPE, { combatId });
}

export default class {
  static create(participantUsers) {
    const timeout = getNextTurnDate();

    let combatId;
    try {
      combatId = CombatCollection.insert({
        state: COMBAT_STATE.RUNNING,
        participants: participantUsers.map(user => user._id),
        timeout,
        log: [],
      });
    } catch (error) {
      if (error.code === 11000) { // Коллизия по уникальному индексу
        throw new Error('Невозможно создать бой: игрок уже участвует в бою');
      }
      throw error;
    }

    participantUsers.forEach((user) => {
      const calculated = CharacterManager.getAttributesDetailed(user).total;
      const armorActive = {};
      GameDesign.attackZones.forEach((zone) => {
        armorActive[zone] = calculated['Attribute/ArmorActive'];
      });

      Meteor.users.update(
        { _id: user._id },
        {
          $set:
          {
            'character.combat._id': combatId,
            'character.combat.health': calculated['Attribute/Health'],
            'character.combat.armorActive': armorActive,
          },
        },
      );
    });
    scheduleNextTurn(timeout, combatId);
  }

  static applyMove(combat, user, attackZone, defenseZone) {
    const { _id } = combat;
    const combatClone = _.cloneDeep(combat);
    const userActions = { attackZone, defenseZone };
    _.setWith(combatClone, `userActions.${user._id}`, userActions, Object);
    CombatCollection.update(
      { _id },
      {
        $set: {
          [`userActions.${user._id}`]: userActions,
        },
      },
    );
    if (combatClone.participants.every(participant => combatClone.userActions[participant])) {
      agenda.cancel({
        name: JOB_TYPE,
        'data.combatId': combatClone._id,
      });
      this.processTurnCatchable(combatClone);
    }
  }

  static processTurnCatchable(combat) {
    try {
      this.processTurn(combat);
    } catch (error) {
      try {
        this.complete(combat, null, COMBAT_STATE.ABORTED);
      } finally {
        // Если ошибка случилась после завершения боя
        throw error; // eslint-disable-line no-unsafe-finally
      }
    }
  }

  static processTurn(combat) {
    // TODO Добавить защиту от двойного вызова processTurn
    const users = Meteor.users.find(
      { 'character.combat._id': combat._id },
      {
        fields: { character: true },
      },
    ).fetch();
    users.forEach((user) => {
      _.set(user, 'calculated', CharacterManager.getAttributesDetailed(user).total);
      _.set(user, 'actions', combat.userActions?.[user._id]);
      if (user.actions?.defenseZone) {
        const { armorActive } = user.character.combat;
        user.actions.defenseZone.forEach((zone) => {
          armorActive[zone] = user.calculated['Attribute/ArmorActive'];
        });
        Meteor.users.update(
          { _id: user._id },
          { $set: { 'character.combat.armorActive': armorActive } },
        );
      }
    });

    const logLine = new LogLine(combat, users);

    users.forEach((user) => {
      const attacker = user;
      const defender = users.find(item => item !== attacker);
      const attackZone = attacker.actions?.attackZone;
      let logAction;
      let logDamage;
      if (attackZone) {
        if (!CombatMath.eventHappened(CombatMath.dodgeChance(attacker, defender))) {
          const isBlock = defender.actions?.defenseZone?.includes(attackZone) || false;
          const isCritical = CombatMath.eventHappened(
            CombatMath.criticalChance(attacker, defender),
          );

          const armorAttributeId = GameDesign.zoneToArmorAttribute[attackZone];
          const armorPassiveRange = defender.calculated[armorAttributeId];
          const armorPassive = CombatMath.getRandomIntInclusive(armorPassiveRange);
          const armorActive = defender.character.combat.armorActive[attackZone];

          let damageMultiplier = 1;
          logAction = LOG_ACTION.DAMAGE;
          if (isCritical && !isBlock) {
            damageMultiplier = 2;
            logAction = LOG_ACTION.CRITICAL;
          } else if (!isCritical && isBlock) {
            damageMultiplier = 0;
            logAction = LOG_ACTION.BLOCK;
          }
          const damageRange = attacker.calculated['Attribute/Damage'];
          let damageLeft = (
            damageMultiplier
            * CombatMath.getRandomIntInclusive(damageRange)
          );
          const damageLeak = damageMultiplier === 0 ? 0 : 1;
          let damageConsumed = Math.min(
            damageLeft,
            armorActive,
          );
          if (damageConsumed === damageLeft) {
            damageConsumed -= damageLeak;
          }
          damageLeft -= damageConsumed;
          damageLeft = Math.max(damageLeak, damageLeft - armorPassive);
          damageLeft = Math.min(damageLeft, defender.character.combat.health);
          logDamage = damageLeft;

          defender.character.combat.health -= damageLeft;
          defender.character.combat.armorActive[attackZone] -= damageConsumed;
          Meteor.users.update(
            { _id: defender._id },
            {
              $inc: {
                'character.combat.health': -damageLeft,
                [`character.combat.armorActive.${attackZone}`]: -damageConsumed,
              },
            },
          );
        } else {
          logAction = LOG_ACTION.DODGE;
        }
      } else {
        logAction = LOG_ACTION.SKIP;
      }
      logLine.addUserResult(attacker._id, defender._id, logAction, logDamage);
    });

    logLine.save();

    const skippingUsers = users.filter(user => !user.actions);
    if (skippingUsers.length) {
      const $inc = {};
      skippingUsers.forEach((user) => {
        $inc[`turnSkips.${user._id}`] = 1;
        _.set(combat, ['turnSkips', user._id], combat.turnSkips?.[user._id] + 1);
      });
      CombatCollection.update({ _id: combat._id }, { $inc });
    }

    const [dead, alive] = _.partition(users, user => (
      user.character.combat.health === 0
      || combat.turnSkips?.[user._id] >= GameDesign.combatTurnSkipsLimit
    ));
    let winner = null;
    if (dead.length > 0 || !users.length) {
      if (alive.length > 0) {
        [winner] = alive;
      }
      this.complete(combat, winner?._id);
    } else {
      const timeout = getNextTurnDate();
      CombatCollection.update(
        { _id: combat._id },
        {
          $unset: { userActions: null },
          $set: { timeout },
        },
      );
      scheduleNextTurn(timeout, combat._id);
    }
  }

  static complete(
    { _id: combatId, participants },
    winnerId = null,
    state = COMBAT_STATE.COMPLETED,
  ) {
    const modified = CombatCollection.update(
      {
        _id: combatId,
        state: COMBAT_STATE.RUNNING,
      },
      {
        $set: {
          state,
          winnerId,
        },
      },
    );
    if (modified) {
      Meteor.users.update(
        { _id: { $in: participants } },
        { $unset: { 'character.combat._id': null } },
        { multi: true },
      );
      if (winnerId) {
        const loserId = participants.filter(id => id !== winnerId)[0];
        this.giveExperience(winnerId, loserId);
      } else {
        this.giveExperience(participants[0], participants[1], 0.5);
        this.giveExperience(participants[1], participants[0], 0.5);
      }
    } else {
      throw new Error(`Не удалось завершить бой ${combatId}`);
    }
  }

  // Выдаем опыт за бой
  // Если мощь игрока больше мощи побеждённого, применяется понижающий коэффициент:
  // exp = base_exp * min(1, enemy_power / player_power).
  // Базовый опыт равен количеству выбитого здоровья.
  // в виду отсутствия на данный момент hp можно приравнять это максимальному здоровью врага
  // ^^^ TODO исправить после ввода hp ^^^
  static giveExperience(winnerId = null, loserId = null, multiplierExperience = 1) {
    const winner = UserHelpers.getSanitizedUserById(winnerId);
    const loser = UserHelpers.getSanitizedUserById(loserId);
    if (
      !winner
      || !loser
    ) {
      return;
    }
    const winnerPower = winner.character.power || 1;
    const loserPower = loser.character.power || 1;
    CharacterManager.incExperience({
      user: winner,
      deltaExperience: (
        Math.floor(
          // TODO рассчитывать опыт от реально выбитого здоровья
          CharacterManager.getAttributesDetailed(loser).total['Attribute/Health']
          * Math.min(1, loserPower / winnerPower)
          * multiplierExperience,
        )
      ),
    });
  }
}
