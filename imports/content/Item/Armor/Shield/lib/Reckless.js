export default {
  id: 'Item/Armor/Shield/Reckless',
  title: 'Щит Безрассудства',
  weight: 4,
  level: 2,
  category: 'Shield',
  price: {
    'Currency/Dinar': 10,
    'Currency/Ether': 10,
  },
  attributeMods: {
    'Attribute/ArmorPassive/Torso': { min: 1, max: 2 },
    'Attribute/ArmorPassive/Waist': { min: 1, max: 2 },
    'Attribute/Primary/Intuition': 2,
    'Attribute/Secondary/AntiCritical': 4,
    'Attribute/Secondary/AntiDodge': 11,
    'Attribute/Health': 3,
  },
  element: 'Fire',
  description: '',
};
