export default {
  id: 'Item/Armor/Belt/Unseen',
  title: 'Пояс Незримого',
  weight: 4,
  level: 3,
  category: 'Belt',
  price: {
    'Currency/Dinar': 10,
    'Currency/Ether': 10,
  },
  attributeMods: {
    'Attribute/ArmorPassive/Waist': { min: 1, max: 2 },
    'Attribute/Primary/Intuition': 1,
    'Attribute/Secondary/Dodge': 8,
    'Attribute/Secondary/AntiDodge': 7,
  },
  element: 'Air',
  description: '',
};
