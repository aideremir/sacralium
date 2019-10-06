import _ from 'lodash';

import Attributes from '/imports/content/Attribute';

const emptyRange = { min: 0, max: 0 };

function sumAttributeValues(a, b) {
  if (a instanceof Object || b instanceof Object) {
    return [a, b].reduce((result, value) => {
      // eslint-disable-next-line no-param-reassign
      result.min += value?.min || 0;
      // eslint-disable-next-line no-param-reassign
      result.max += value?.max || 0;
      return result;
    }, { ...emptyRange });
  }
  return (a || 0) + (b || 0);
}

function sumAttributeGroups(...groups) {
  const result = {};
  _.forEach(groups, (values) => {
    _.forEach(values, (value, attributeId) => {
      result[attributeId] = sumAttributeValues(result[attributeId], value);
    });
  });
  return result;
}

function fillEmptyAttributes(attributes) {
  return _.mapValues(Attributes, attributeType => (
    attributes[attributeType.id] || (attributeType.isRange ? emptyRange : 0)
  ));
}

function calculateDerivedAttributes(sourceAttributes = {}) {
  return _.mapValues(Attributes, (attributeType) => {
    if (attributeType.calculate instanceof Function) {
      return attributeType.calculate(sourceAttributes);
    }
    return attributeType.isRange ? emptyRange : 0;
  });
}

export default {
  sumAttributeValues,
  sumAttributeGroups,
  fillEmptyAttributes,
  calculateDerivedAttributes,
};
