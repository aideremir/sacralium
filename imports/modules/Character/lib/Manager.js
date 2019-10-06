import { Meteor } from 'meteor/meteor';
import _ from 'lodash';

import InventoryManager from '/imports/modules/Inventory/lib/Manager';
import AttributesSecondary from '/imports/content/Attribute/Primary';
import flatTable from '/imports/content/GameData/lib/ExperienceTable.json';

import AttributeHelpers from './AttributeHelpers';

const {
  sumAttributeValues,
  sumAttributeGroups,
  fillEmptyAttributes,
  calculateDerivedAttributes,
} = AttributeHelpers;

export default class {
  static experienceToLevelData({
    currentExperience = 0, // Сколько у перса сейчас опыта
    deltaExperience = 0, // Сколько хотим ему добавить
  }) {
    let i = 0;
    let allAP = 0;
    while (flatTable[i].exp <= currentExperience) {
      allAP += flatTable[i].bonus.attributesPoints;
      i += 1;
    }
    if (currentExperience + deltaExperience < flatTable[i].exp) {
      return {
        reward: false,
        level: flatTable[i].level,
        experiencesRange: {
          min: flatTable[i - 1].exp,
          max: flatTable[i].exp,
        },
        allAP,
      };
    }
    // TODO очень надеюсь игроки найдут какой-то способ ДВП и будут скакать через несколько уровней
    // тогда надо будет выдавать им бонусы за каждый левел который они проскочат
    return {
      reward: {
        ...flatTable[i].bonus,
      },
      level: flatTable[i].level,
      experiencesRange: {
        min: flatTable[i].exp,
        max: flatTable[i + 1].exp,
      },
      allAP,
    };
  }

  // куда игрок распределил очки характеристик
  static getDistributedAttributes(user = Meteor.user()) {
    return user.character.distributedAttributes || {};
  }

  static getAttributesDetailed(user = Meteor.user()) {
    // TODO потенциальная оптимизация: параметр для выборки только определенных атрибутов
    const distributedAttributes = this.getDistributedAttributes(user);
    const primaryWithBase = _.mapValues(AttributesSecondary, attributeType => (
      sumAttributeValues(
        attributeType.base,
        distributedAttributes[attributeType.id],
      )
    ));
    const bonusEquipment = fillEmptyAttributes(sumAttributeGroups(
      InventoryManager.getUserEquipmentBonuses(user),
      InventoryManager.getBonusForCompleteElementsSet(user.character.equipment),
    ));
    const primaryBaseWithEquipment = _.mapValues(primaryWithBase, (attributeValue, attributeId) => (
      sumAttributeValues(attributeValue, bonusEquipment[attributeId])
    ));
    const bonusPrimary = calculateDerivedAttributes(primaryBaseWithEquipment);
    const total = sumAttributeGroups(primaryWithBase, bonusEquipment, bonusPrimary);
    total['Attribute/Level'] = this.experienceToLevelData({
      currentExperience: user.character.experience,
    }).level;
    return {
      primaryBaseWithEquipment,
      bonusPrimary,
      bonusEquipment,
      total,
    };
  }

  // сколько очков характеристик уже распределено игроком
  static getDistributedAttributePoints(user = Meteor.user()) {
    return _.reduce(
      this.getDistributedAttributes(user),
      (total, count) => total + count,
      0,
    );
  }

  // сколько у игрока остается свободных для распределения очков характеристик
  static getFreeAttributePoints(user = Meteor.user()) {
    const { allAP } = this.experienceToLevelData({
      currentExperience: user.character.experience,
    });
    return allAP - this.getDistributedAttributePoints(user);
  }

  // сколько опыта требуется до левел-апа, возвращает диапазоном <Object={min, max}>
  static getExperiencesRange(user = Meteor.user()) {
    const { experiencesRange } = this.experienceToLevelData({
      currentExperience: user.character.experience,
    });
    return experiencesRange;
  }
}
