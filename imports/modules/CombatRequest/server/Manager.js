import { Meteor } from 'meteor/meteor';
import _ from 'lodash';

import CombatManager from '/imports/modules/Combat/server/Manager';
import GameDesign from '/imports/content/GameData/server/GameDesign';

import ManagerLib from '../lib/Manager';

export default class extends ManagerLib {
  static create(sender, recipient) {
    const timeout = new Date();
    timeout.setSeconds(
      timeout.getSeconds()
      + GameDesign.combatRequestTimeout,
    );
    const publicFields = [
      '_id',
      'character.name',
      'character.gender',
      'character.experience',
      'character.distributedAttributes',
      'character.equipment',
    ];
    const senderFiltered = _.pick(sender, publicFields);
    const recipientFiltered = _.pick(recipient, publicFields);
    // Исключаем гонку на стороне принимающего игрока
    const updated = Meteor.users.update(
      {
        _id: recipient._id,
        'character.combatRequest': recipient.character.combatRequest,
      },
      {
        $set: {
          'character.combatRequest': {
            sender: senderFiltered,
            timeout,
          },
        },
      },
    );
    if (updated) {
      // Если кто-то ещё успеет сделать вызов к вызывающему игроку,
      // бой по текущему вызову просто не состоится
      Meteor.users.update(
        { _id: sender._id },
        {
          $set: {
            'character.combatRequest': {
              recipient: recipientFiltered,
              rejected: false,
              timeout,
            },
          },
        },
      );
    }
  }

  static accept(sender, recipient) {
    Meteor.users.update(
      { _id: { $in: [sender._id, recipient._id] } },
      { $unset: { 'character.combatRequest': null } },
      { multi: true },
    );
    CombatManager.create([sender, recipient]);
  }

  static reject(sender, recipient) {
    // TODO Возможно, стоит сделать setTimeout для обнуленеия запроса у второго пользователя
    // и чистить старые запросы при старте сервера на случай преждевременного отключения
    Meteor.users.update(
      {
        _id: recipient._id,
        'character.combatRequest': recipient.combatRequest,
      },
      { $unset: { 'character.combatRequest': null } },
    );
    if (sender) {
      Meteor.users.update(
        {
          _id: sender._id,
          'character.combatRequest': sender.combatRequest,
        },
        { $set: { 'character.combatRequest.rejected': true } },
      );
    }
  }

  static getSenderByRecipient(recipient) {
    return Meteor.users.findOne(
      {
        _id: recipient.character.combatRequest.sender._id,
        'character.combatRequest.recipient._id': recipient._id,
      },
      { fields: { character: true } },
    );
  }
}
