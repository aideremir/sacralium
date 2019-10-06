import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';
import _ from 'lodash';

import UserHelpers from '/imports/modules/User/lib/helpers';
import GameDesign from '/imports/content/GameData/server/GameDesign';

import CombatManager from './Manager';
import CombatHelpers from '../lib/helpers';

Meteor.methods({
  'Combat.makeMove'(attackZone, defenseZone) {
    check(attackZone, Match.Maybe(String));
    check(defenseZone, Match.Maybe(Array));
    // TODO Требовать attackZone и defenseZone в зависимости от статуса персонажа
    if (attackZone && !GameDesign.attackZones.includes(attackZone)) {
      throw new Meteor.Error('Туда нельзя ударить');
    }
    const [sanitizedDefenseZone] = _.intersectionWith(
      GameDesign.defenseZones,
      [defenseZone],
      _.isEqual,
    );
    if (defenseZone && !sanitizedDefenseZone) {
      throw new Meteor.Error('Сюда нельзя поставить блок');
    }

    const user = UserHelpers.getSanitizedUserById(this.userId);
    if (!user?.character) {
      throw new Meteor.Error('Персонажа не существует');
    }

    const combat = CombatHelpers.getCombatById(user.character.combat?._id);
    if (!combat) {
      throw new Meteor.Error('Сейчас вы не участвуете в бою');
    }
    if (combat.userActions?.[this.userId]) {
      throw new Meteor.Error('Вы уже спланировали ближайшие действия');
    }

    CombatManager.applyMove(combat, user, attackZone, sanitizedDefenseZone);
  },
});
