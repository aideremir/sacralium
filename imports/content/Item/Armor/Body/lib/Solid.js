export default {
  id: 'Item/Armor/Body/Solid',
  title: 'Броня Тверди',
  weight: 4,
  level: 2,
  category: 'Body',
  price: {
    'Currency/Dinar': 10,
    'Currency/Ether': 10,
  },
  attributeMods: {
    'Attribute/ArmorPassive/Torso': { min: 2, max: 3 },
    'Attribute/Secondary/Critical': 4,
    'Attribute/Secondary/AntiCritical': 15,
    'Attribute/Health': 3,
  },
  element: 'Earth',
  description: '',
};
