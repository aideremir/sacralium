export default {
  id: 'Attribute/Secondary/AntiCritical',
  title: 'Антикрит',
  calculate(sourceAttributes) {
    return sourceAttributes['Attribute/Primary/Intuition'] * 3;
  },
};
