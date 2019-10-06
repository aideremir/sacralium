import { Meteor } from 'meteor/meteor';
import _ from 'lodash';

import ItemTypes from '/imports/content/Item';
import GameDesign from '/imports/content/GameData/server/GameDesign';
import UserHelpers from '/imports/modules/User/lib/helpers';
import CharacterManager from '/imports/modules/Character/server/Manager';

import ManagerLib from '../lib/Manager';
import InventoryCollection from './collection';

export default class extends ManagerLib {
  static createItem(userId, typeId) {
    return InventoryCollection.insert({ userId, typeId });
  }

  static removeItem(item, user = null) {
    const owner = user || UserHelpers.getSanitizedUserById(this.userId);
    const itemType = ItemTypes[item.typeId];
    const slot = GameDesign.categoriesToSlots[itemType.category];
    const equippedItem = owner.character.equipment[slot];
    if (equippedItem?._id === item._id) {
      this.unequipItem(owner._id, slot);
    }
    return InventoryCollection.remove({ _id: item._id });
  }

  static getOwnedItem(userId, _id) {
    return InventoryCollection.findOne({
      _id,
      userId,
    });
  }

  static equipItem(userId, item) {
    const { category } = ItemTypes[item.typeId];
    const slot = GameDesign.categoriesToSlots[category];
    const cachedItem = _.pick(item, '_id', 'typeId');
    Meteor.users.update(
      { _id: userId },
      { $set: { [`character.equipment.${slot}`]: cachedItem } },
    );
    CharacterManager.updatePower(userId);
  }

  static unequipItem(userId, slot) {
    Meteor.users.update(
      { _id: userId },
      { $unset: { [`character.equipment.${slot}`]: null } },
    );
    CharacterManager.updatePower(userId);
  }
}
