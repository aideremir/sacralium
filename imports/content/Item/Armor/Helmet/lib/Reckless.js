export default {
  id: 'Item/Armor/Helmet/Reckless',
  title: 'Шлем Безрассудства',
  weight: 5,
  level: 4,
  category: 'Helmet',
  price: {
    'Currency/Dinar': 10,
    'Currency/Ether': 10,
  },
  attributeMods: {
    'Attribute/ArmorPassive/Head': { min: 2, max: 4 },
    'Attribute/Primary/Strength': 3,
    'Attribute/Secondary/Critical': 12,
    'Attribute/Secondary/AntiCritical': 4,
    'Attribute/Secondary/AntiDodge': 11,
    'Attribute/Health': 6,
  },
  element: 'Fire',
  description: '',
};
