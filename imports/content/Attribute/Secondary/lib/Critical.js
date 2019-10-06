export default {
  id: 'Attribute/Secondary/Critical',
  title: 'Крит',
  calculate(sourceAttributes) {
    return sourceAttributes['Attribute/Primary/Intuition'] * 5;
  },
};
