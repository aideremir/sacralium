export default {
  id: 'Item/Armor/Shield/Unseen',
  title: 'Щит Незримого',
  weight: 4,
  level: 2,
  category: 'Shield',
  price: {
    'Currency/Dinar': 10,
    'Currency/Ether': 10,
  },
  attributeMods: {
    'Attribute/ArmorPassive/Torso': { min: 1, max: 3 },
    'Attribute/ArmorPassive/Waist': { min: 1, max: 3 },
    'Attribute/Primary/Strength': 3,
    'Attribute/Secondary/AntiCritical': 6,
    'Attribute/Secondary/AntiDodge': 9,
    'Attribute/Health': 3,
  },
  element: 'Air',
  description: '',
};
