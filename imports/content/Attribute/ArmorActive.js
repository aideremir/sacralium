export default {
  id: 'Attribute/ArmorActive',
  title: 'Активная броня',
  calculate(sourceAttributes) {
    return Math.floor(sourceAttributes['Attribute/Primary/Dexterity'] / 5);
  },
};
