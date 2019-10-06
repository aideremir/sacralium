export default {
  id: 'Item/Armor/Leggins/Balance',
  title: 'Поножи Равновесия',
  weight: 3,
  level: 0,
  category: 'Leggins',
  price: {
    'Currency/Dinar': 10,
    'Currency/Ether': 15,
  },
  attributeMods: {
    'Attribute/ArmorPassive/Legs': { min: 1, max: 2 },
    'Attribute/Secondary/Critical': 6,
    'Attribute/Secondary/AntiDodge': 4,
    'Attribute/Health': 6,
  },
  element: 'Universe',
  description: '',
};
