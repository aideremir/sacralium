import { Meteor } from 'meteor/meteor';

export default class {
  static has({ user = Meteor.user(), currencyId, amount }) {
    return user.character.money[currencyId] >= amount;
  }

  static canBuy({ user = Meteor.user(), price }) {
    let result = true;
    Object.entries(price).some((currencyPair) => {
      const [currencyId, amount] = currencyPair;
      if (!this.has({ user, currencyId, amount })) {
        result = false;
        return true; // break
      }
      return false;
    });
    return result;
  }
}
