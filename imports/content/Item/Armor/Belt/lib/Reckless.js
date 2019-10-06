export default {
  id: 'Item/Armor/Belt/Reckless',
  title: 'Пояс Безрассудства',
  weight: 4,
  level: 3,
  category: 'Belt',
  price: {
    'Currency/Dinar': 10,
    'Currency/Ether': 10,
  },
  attributeMods: {
    'Attribute/ArmorPassive/Waist': { min: 1, max: 2 },
    'Attribute/Primary/Dexterity': 1,
    'Attribute/Secondary/Critical': 8,
    'Attribute/Secondary/AntiDodge': 13,
  },
  element: 'Fire',
  description: '',
};
