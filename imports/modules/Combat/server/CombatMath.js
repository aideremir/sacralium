import _ from 'lodash';

import AttributesSecondary from '/imports/content/Attribute/Secondary';

export default {
  eventHappened(chance) {
    // TODO использовать нормальную библиотеку рандома
    return Math.random() < chance / 100;
  },

  getRandomIntInclusive({ min = 0, max = 0 } = {}) {
    const minInt = Math.ceil(min);
    const maxInt = Math.floor(max);
    return Math.floor(Math.random() * (maxInt - minInt + 1)) + minInt;
  },

  calculateNormalizer(users) {
    const secondarySums = [];
    users.forEach((user) => {
      const secondary = _.pick(user.calculated, Object.keys(AttributesSecondary));
      secondarySums.push(
        Object.values(secondary).reduce((sum, value) => sum + value, 0),
      );
    });
    return 100 / (Math.min(...secondarySums) || 1);
  },

  dodgeChance(attacker, defender) {
    return (
      this.calculateNormalizer([attacker, defender])
      * (
        defender.calculated['Attribute/Secondary/Dodge']
        - attacker.calculated['Attribute/Secondary/AntiDodge']
      )
    );
  },

  criticalChance(attacker, defender) {
    return (
      this.calculateNormalizer([attacker, defender])
      * (
        attacker.calculated['Attribute/Secondary/Critical']
        - defender.calculated['Attribute/Secondary/AntiCritical']
      )
    );
  },
};
