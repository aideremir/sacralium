import { Meteor } from 'meteor/meteor';
import _ from 'lodash';

import AttributeHelpers from '/imports/modules/Character/lib/AttributeHelpers';
import ItemTypes from '/imports/content/Item';
import bonusForCompleteElementsSetTable from '/imports/content/GameData/lib/ElementsSetBonus.json';

import InventoryCollection from './collection';

export default class {
  static getWeightCurrent(userId = Meteor.userId()) {
    const items = InventoryCollection.find(
      { userId },
      {
        fields: {
          _id: false,
          typeId: true,
        },
        reactive: false,
      },
    ).fetch();
    return items.reduce((total, item) => total + ItemTypes[item.typeId].weight, 0);
  }

  // находим стихию одетых на перса шмоток
  // Universe подходит всем всем - вернем его даже если на персе нет шмота
  static getEquippedElement(characterEquipment = {}, excludedSlots = []) {
    let equippedElement = 'Universe';
    Object.entries(characterEquipment).some(([slot, { typeId }]) => {
      const itemType = ItemTypes[typeId];
      if (
        excludedSlots.includes(slot)
        || itemType.element === 'Universe'
        || !itemType.element
      ) {
        return false;
      }
      equippedElement = itemType.element;
      return true;
    });
    return equippedElement;
  }

  // Возвращает агрегированные бонусы всех вещей
  static getUserEquipmentBonuses(user = Meteor.user()) {
    return _.reduce(user.character.equipment, (mods, { typeId }) => (
      AttributeHelpers.sumAttributeGroups(
        mods,
        ItemTypes[typeId].attributeMods,
      )
    ), {});
  }

  static getBonusForCompleteElementsSet(characterEquipment = {}) {
    // Если игрок соберет в слотах для одежды 10 вещей с одной стихией (кроме вселенной),
    // то он получит бонус к статам.
    const element = this.getEquippedElement(characterEquipment);
    if (
      Object.keys(characterEquipment).length < 10
      || element === 'Universe'
    ) {
      return {};
    }
    return bonusForCompleteElementsSetTable[element];
  }
}
