export default {
  id: 'Item/Armor/Shield/Solid',
  title: 'Щит Тверди',
  weight: 5,
  level: 2,
  category: 'Shield',
  price: {
    'Currency/Dinar': 10,
    'Currency/Ether': 10,
  },
  attributeMods: {
    'Attribute/ArmorPassive/Torso': { min: 1, max: 4 },
    'Attribute/ArmorPassive/Waist': { min: 1, max: 4 },
    'Attribute/Secondary/AntiCritical': 8,
    'Attribute/Secondary/AntiDodge': 6,
    'Attribute/Health': 6,
  },
  element: 'Earth',
  description: '',
};
