import { Meteor } from 'meteor/meteor';

import ManagerLib from '/imports/modules/Money/lib/Manager';

export default class extends ManagerLib {
  static deductPrice({ userId = Meteor.userId(), price }) {
    const currenciesMod = {};
    Object.entries(price).forEach(([currencyId, amount]) => {
      currenciesMod[`character.money.${currencyId}`] = -amount;
    });
    Meteor.users.update(
      { _id: userId },
      { $inc: currenciesMod },
    );
  }

  static incMoney({ userId, money }) {
    const currenciesMod = {};
    Object.entries(money).forEach(([currencyId, amount]) => {
      currenciesMod[`character.money.${currencyId}`] = amount;
    });
    Meteor.users.update(
      { _id: userId },
      { $inc: currenciesMod },
    );
  }
}
