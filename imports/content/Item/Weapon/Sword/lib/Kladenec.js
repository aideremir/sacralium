export default {
  id: 'Item/Weapon/Sword/Kladenec',
  title: 'Меч-кладенец',
  weight: 7,
  level: 0,
  category: 'Sword',
  price: {
    'Currency/Dinar': 50,
    'Currency/Ether': 50,
  },
  attributeMods: {
    'Attribute/Damage': { min: 2, max: 5 },
    'Attribute/Primary/Intuition': 1,
    'Attribute/Secondary/Critical': 5,
    'Attribute/Secondary/AntiDodge': 10,
  },
  element: 'Universe',
  description: '',
};
