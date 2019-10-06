export default {
  id: 'Item/Armor/Shield/Hors',
  title: 'Щит Хорса',
  weight: 5,
  level: 0,
  category: 'Shield',
  price: {
    'Currency/Dinar': 12,
    'Currency/Ether': 10,
  },
  attributeMods: {
    'Attribute/ArmorPassive/Torso': { min: 1, max: 2 },
    'Attribute/ArmorPassive/Waist': { min: 1, max: 2 },
    'Attribute/Primary/Dexterity': 1,
    'Attribute/Primary/Intuition': 1,
    'Attribute/Health': 3,
  },
  element: 'Universe',
  description: 'Символ Хорса — круг священный. Любит огнеликий смекалистых да ловких, потому дарит всякому чутье да сноровку. Подыми на руку круглый хорсов щит, и подсобит он тебе в любых хитроумных затеях.',
};
