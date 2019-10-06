import _ from 'lodash';

import ServerDate from '/imports/modules/Core/lib/date';
import LogPhrases from '/imports/content/GameData/lib/LogPhrases.json';

import CombatCollection from './collection';

export default class {
  constructor(combat, users) {
    const line = { time: ServerDate.Date() };

    users.forEach((user) => {
      line[user._id] = combat.userActions?.[user._id] || {};
    });

    this.line = line;
    this.combatId = combat._id;
  }

  addUserResult(attackerId, defenderId, type, value) {
    const text = _.sample(LogPhrases[type])
      .replace('%id_attacker%', `%${attackerId}%`)
      .replace('%id_defender%', `%${defenderId}%`);

    const result = { type, text };

    if (value) {
      result.value = value;
    }

    this.line[attackerId].result = result;
  }

  save() {
    CombatCollection.update(
      { _id: this.combatId },
      {
        $push: {
          log: this.line,
        },
      },
    );
  }
}
