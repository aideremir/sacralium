import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import CombatRequestManager from '/imports/modules/CombatRequest/lib/Manager';
import UserHelpers from '/imports/modules/User/lib/helpers';
import AttributesPrimary from '/imports/content/Attribute/Primary';

import Manager from './Manager';

/**
 * @param incAttributes Какая характеристика и на сколько будет изменена
 */
Meteor.methods({
  'Character.setAttributes'(incAttributes) {
    check(incAttributes, Object);

    const user = UserHelpers.getSanitizedUserById(this.userId);
    if (!user?.character) {
      throw new Meteor.Error('Персонажа не существует');
    }
    if (CombatRequestManager.isCharacterLocked(user.character)) {
      throw new Meteor.Error('Вы слишком заняты для распределения очков');
    }
    if (!Object.keys(incAttributes).every(attr => AttributesPrimary[attr])) {
      throw new Meteor.Error('Не известная характеристика');
    }
    if (!Object.values(incAttributes).every(Number.isInteger)) {
      throw new Meteor.Error('Попытка изменить характеристику на дробную величину');
    }

    const additionallyDistributedPoints = Object.values(incAttributes).reduce((p, c) => p + c, 0);
    if (Manager.getFreeAttributePoints(user) < additionallyDistributedPoints) {
      throw new Meteor.Error('Закончились свободные очки опыта');
    }

    const distributedAttributes = Manager.getDistributedAttributes(user);
    if (!Object.entries(incAttributes).every(
      ([attr, value]) => (distributedAttributes[attr] || 0) + value >= 0,
    )) {
      throw new Meteor.Error('Попытка изменить характеристику в минус');
    }

    return Manager.increaseAttributes({ user, incAttributes });
  },
});
