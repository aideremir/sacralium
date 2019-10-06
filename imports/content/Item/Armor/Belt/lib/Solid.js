export default {
  id: 'Item/Armor/Belt/Solid',
  title: 'Пояс Тверди',
  weight: 5,
  level: 3,
  category: 'Belt',
  price: {
    'Currency/Dinar': 10,
    'Currency/Ether': 10,
  },
  attributeMods: {
    'Attribute/ArmorPassive/Waist': { min: 2, max: 3 },
    'Attribute/Secondary/Critical': 3,
    'Attribute/Secondary/AntiCritical': 12,
    'Attribute/Health': 3,
  },
  element: 'Earth',
  description: '',
};
