import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import UserHelpers from '/imports/modules/User/lib/helpers';

import CombatRequestManager from './Manager';

Meteor.methods({
  'CombatRequest.send'(recipientUserId) {
    check(recipientUserId, String);

    const sender = UserHelpers.getSanitizedUserById(this.userId);
    if (!sender?.character) {
      throw new Meteor.Error('Персонажа не существует');
    }

    if (this.userId === recipientUserId) {
      throw new Meteor.Error('Проще выпить яду');
    }

    if (CombatRequestManager.isCharacterLocked(sender.character)) {
      throw new Meteor.Error('Вы и так заняты');
    }

    const recipient = UserHelpers.getSanitizedUserById(recipientUserId);
    if (!recipient?.character) {
      throw new Meteor.Error('Вызываемый персонаж не найден');
    }
    if (CombatRequestManager.isCharacterLocked(recipient.character)) {
      throw new Meteor.Error('Вызываемый игрок сейчас занят');
    }

    CombatRequestManager.create(sender, recipient);
  },

  'CombatRequest.accept'() {
    const recipient = UserHelpers.getSanitizedUserById(this.userId);
    if (!recipient?.character) {
      throw new Meteor.Error('Персонажа не существует');
    }
    if (
      !CombatRequestManager.hasOutstandingRequest(recipient.character)
      || !recipient.character.combatRequest.sender
    ) {
      throw new Meteor.Error('Актуальный вызов на поединок не найден');
    }

    const sender = CombatRequestManager.getSenderByRecipient(recipient);
    if (!sender) {
      CombatRequestManager.reject(sender, recipient);
      throw new Meteor.Error('Вызывающий игрок не найден');
    }

    CombatRequestManager.accept(sender, recipient);
  },

  'CombatRequest.reject'() {
    const recipient = UserHelpers.getSanitizedUserById(this.userId);
    if (!recipient?.character) {
      throw new Meteor.Error('Персонажа не существует');
    }
    if (
      !CombatRequestManager.hasOutstandingRequest(recipient.character)
      || !recipient.character.combatRequest.sender
    ) {
      throw new Meteor.Error('Актуальный вызов на поединок не найден');
    }

    const sender = CombatRequestManager.getSenderByRecipient(recipient);
    CombatRequestManager.reject(sender, recipient);
  },
});
