import { Meteor } from 'meteor/meteor';
import _ from 'lodash';

import ManagerLib from '/imports/modules/Character/lib/Manager';
import MoneyManager from '/imports/modules/Money/server/Manager';
import UserHelpers from '/imports/modules/User/lib/helpers';
import GameDesign from '/imports/content/GameData/server/GameDesign';

export default class extends ManagerLib {
  static incExperience({ user, deltaExperience }) {
    // не позволяем списывать опыт, только в плюс
    if (!deltaExperience || deltaExperience <= 0) return 0;
    const { reward } = this.experienceToLevelData({
      currentExperience: user.character.experience,
      deltaExperience,
    });
    const $inc = { 'character.experience': deltaExperience };
    if (reward) {
      reward.userId = user._id;
      MoneyManager.incMoney(reward);
    }
    return Meteor.users.update(
      { _id: user._id },
      {
        $inc,
      },
    );
  }

  static increaseAttributes({ user, incAttributes }) {
    const distributedAttributes = this.getDistributedAttributes(user);

    Object.entries(incAttributes).forEach(([key, value]) => {
      distributedAttributes[key] = (distributedAttributes[key] || 0) + value;
    });

    Meteor.users.update(
      { _id: user._id },
      {
        $set: {
          'character.distributedAttributes': distributedAttributes,
        },
      },
    );
    this.updatePower(user._id);
  }

  static getPower(user) {
    const calculated = this.getAttributesDetailed(user).total;
    return _.reduce(GameDesign.powerWeights, (power, weight, attributeId) => {
      let attributeValue = calculated[attributeId];
      if (attributeValue instanceof Object) {
        attributeValue = attributeValue.max;
      }
      return power + (weight * attributeValue);
    }, 0);
  }

  static updatePower(_id) {
    const user = UserHelpers.getSanitizedUserById(_id);
    Meteor.users.update(
      { _id },
      { $set: { 'character.power': this.getPower(user) } },
    );
  }
}
