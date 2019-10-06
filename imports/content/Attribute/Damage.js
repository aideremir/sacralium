export default {
  id: 'Attribute/Damage',
  title: 'Урон',
  isRange: true,
  calculate(sourceAttributes) {
    const result = {};
    const strength = sourceAttributes['Attribute/Primary/Strength'];
    result.min = Math.floor((strength / 3) + 1);
    result.max = result.min + 3; // result.max = Math.floor((strength / 3) + 4);
    return result;
  },
};
