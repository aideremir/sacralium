export default {
  id: 'Attribute/Secondary/AntiDodge',
  title: 'Антиуворот',
  calculate(sourceAttributes) {
    return sourceAttributes['Attribute/Primary/Dexterity'] * 3;
  },
};
