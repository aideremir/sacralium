export default {
  id: 'Item/Armor/Helmet/Unseen',
  title: 'Шлем Незримого',
  weight: 5,
  level: 4,
  category: 'Helmet',
  price: {
    'Currency/Dinar': 10,
    'Currency/Ether': 10,
  },
  attributeMods: {
    'Attribute/ArmorPassive/Head': { min: 2, max: 5 },
    'Attribute/Primary/Strength': 3,
    'Attribute/Secondary/AntiCritical': 9,
    'Attribute/Secondary/Dodge': 21,
    'Attribute/Secondary/AntiDodge': 6,
    'Attribute/Health': 7,
  },
  element: 'Air',
  description: '',
};
