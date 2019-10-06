export default {
  id: 'Attribute/Secondary/Dodge',
  title: 'Уворот',
  calculate(sourceAttributes) {
    return sourceAttributes['Attribute/Primary/Dexterity'] * 5;
  },
};
