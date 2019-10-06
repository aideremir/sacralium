export default {
  id: 'Item/Armor/Body/Reckless',
  title: 'Броня Безрассудства',
  weight: 3,
  level: 2,
  category: 'Body',
  price: {
    'Currency/Dinar': 10,
    'Currency/Ether': 10,
  },
  attributeMods: {
    'Attribute/ArmorPassive/Torso': { min: 1, max: 2 },
    'Attribute/Secondary/Critical': 11,
    'Attribute/Secondary/AntiDodge': 6,
  },
  element: 'Fire',
  description: '',
};
