import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import CharacterManager from '/imports/modules/Character/lib/Manager';
import MoneyManager from '/imports/modules/Money/server/Manager';
import InventoryManager from '/imports/modules/Inventory/server/Manager';
import CombatRequestManager from '/imports/modules/CombatRequest/server/Manager';
import UserHelpers from '/imports/modules/User/lib/helpers';
import ItemTypes from '/imports/content/Item';
import GameDesign from '/imports/content/GameData/server/GameDesign';

Meteor.methods({
  'Inventory.buyItem'(typeId) {
    check(typeId, String);

    const user = UserHelpers.getSanitizedUserById(this.userId);
    if (!user?.character) {
      throw new Meteor.Error('Персонажа не существует');
    }

    const itemType = ItemTypes[typeId];
    if (!itemType) {
      throw new Meteor.Error('Нет такого типа вещей');
    }

    const calculated = CharacterManager.getAttributesDetailed(user).total;
    if (calculated['Attribute/Level'] < itemType.level) {
      throw new Meteor.Error('Недостаточно высокий уровень персонажа');
    }

    if (!MoneyManager.canBuy({ user, price: itemType.price })) {
      throw new Meteor.Error('Недостаточно денег');
    }

    const currentWeight = InventoryManager.getWeightCurrent(user._id);
    if (currentWeight + itemType.weight > calculated['Attribute/Weight']) {
      throw new Meteor.Error('Недостаточно грузоподъёмности');
    }

    if (InventoryManager.createItem(user._id, typeId)) {
      MoneyManager.deductPrice({ userId: user._id, price: itemType.price });
    }
  },

  'Inventory.scrapItem'(itemId) {
    check(itemId, String);

    const user = UserHelpers.getSanitizedUserById(this.userId);
    if (!user?.character) {
      throw new Meteor.Error('Персонажа не существует');
    }

    const item = InventoryManager.getOwnedItem(this.userId, itemId);
    if (!item) {
      throw new Meteor.Error('Предмет не найден');
    }

    InventoryManager.removeItem(item, user);
  },

  'Inventory.equipItem'(itemId) {
    check(itemId, String);

    const character = UserHelpers.getCharacterById(this.userId);
    if (!character) {
      throw new Meteor.Error('Персонажа не существует');
    }
    if (CombatRequestManager.isCharacterLocked(character)) {
      throw new Meteor.Error('Вы слишком заняты для переодеваний');
    }

    const item = InventoryManager.getOwnedItem(this.userId, itemId);
    if (!item) {
      throw new Meteor.Error('Предмет не найден');
    }

    const { category } = ItemTypes[item.typeId];
    const slot = GameDesign.categoriesToSlots[category];

    const equippedElement = InventoryManager.getEquippedElement(character.equipment, [slot]);
    const { element } = ItemTypes[item.typeId];

    if (
      equippedElement !== 'Universe'
      && element !== 'Universe'
      && equippedElement !== element
    ) {
      throw new Meteor.Error('Стихия предмета не соответствует уже надетым');
    }

    InventoryManager.equipItem(this.userId, item);
  },

  'Inventory.unequipItem'(slot) {
    check(slot, String);

    const character = UserHelpers.getCharacterById(this.userId);
    if (!character) {
      throw new Meteor.Error('Персонажа не существует');
    }
    if (CombatRequestManager.isCharacterLocked(character)) {
      throw new Meteor.Error('Вы слишком заняты для переодеваний');
    }

    const slots = Object.values(GameDesign.categoriesToSlots);
    if (slots.indexOf(slot) < 0) {
      throw new Meteor.Error('Нет такого слота');
    }

    InventoryManager.unequipItem(this.userId, slot);
  },
});
