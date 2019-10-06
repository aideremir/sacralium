export default {
  id: 'Item/Weapon/Axe/Reckless',
  title: 'Топор безрассудства',
  weight: 5,
  level: 2,
  category: 'Axe',
  price: {
    'Currency/Dinar': 10,
    'Currency/Ether': 10,
  },
  attributeMods: {
    'Attribute/Damage': { min: 6, max: 9 },
    'Attribute/Primary/Dexterity': 1,
    'Attribute/Secondary/Critical': 15,
    'Attribute/Secondary/AntiCritical': 3,
    'Attribute/Secondary/AntiDodge': 10,
  },
  element: 'Fire',
  description: '',
};
