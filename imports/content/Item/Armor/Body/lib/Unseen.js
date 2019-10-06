export default {
  id: 'Item/Armor/Body/Unseen',
  title: 'Панцирь Незримого',
  weight: 3,
  level: 2,
  category: 'Body',
  price: {
    'Currency/Dinar': 10,
    'Currency/Ether': 10,
  },
  attributeMods: {
    'Attribute/ArmorPassive/Torso': { min: 1, max: 2 },
    'Attribute/Primary/Dexterity': 1,
    'Attribute/Secondary/AntiCritical': 6,
    'Attribute/Secondary/Dodge': 15,
  },
  element: 'Air',
  description: '',
};
