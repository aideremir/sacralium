export default {
  id: 'Item/Weapon/Sword/Reckless',
  title: 'Меч Безрассудства',
  weight: 4,
  level: 2,
  category: 'Sword',
  price: {
    'Currency/Dinar': 10,
    'Currency/Ether': 10,
  },
  attributeMods: {
    'Attribute/Damage': { min: 5, max: 9 },
    'Attribute/Primary/Intuition': 1,
    'Attribute/Secondary/Critical': 20,
    'Attribute/Secondary/AntiCritical': 25,
  },
  element: 'Fire',
  description: '',
};
