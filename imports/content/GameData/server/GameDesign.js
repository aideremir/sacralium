import ConfigLib from '../lib/GameDesign';

const ConfigServer = {
  combatRequestTimeout: 60,
  combatTurnSkipsLimit: 11,
  powerWeights: {
    'Attribute/Health': 4,
    'Attribute/Damage': 5,
    'Attribute/Secondary/Critical': 1,
    'Attribute/Secondary/AntiCritical': 2,
    'Attribute/Secondary/Dodge': 1,
    'Attribute/Secondary/AntiDodge': 2,
    'Attribute/ArmorPassive/Head': 5,
    'Attribute/ArmorPassive/Torso': 5,
    'Attribute/ArmorPassive/Waist': 5,
    'Attribute/ArmorPassive/Legs': 5,
  },
  zoneToArmorAttribute: {
    head: 'Attribute/ArmorPassive/Head',
    torso: 'Attribute/ArmorPassive/Torso',
    waist: 'Attribute/ArmorPassive/Waist',
    legs: 'Attribute/ArmorPassive/Legs',
  },
};

const ConfigFull = { ...ConfigLib, ...ConfigServer };

export default Object.freeze(ConfigFull);
