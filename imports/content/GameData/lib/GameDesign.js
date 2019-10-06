const ConfigLib = {
  categoriesToSlots: {
    Belt: 'Waist',
    Body: 'Torso',
    Boots: 'Feet',
    Bracers: 'Forearms',
    Gloves: 'Hands',
    Helmet: 'Head',
    Leggins: 'Legs',
    Shield: 'Offhand',
    ShoulderPads: 'Shoulders',
    Axe: 'MainHand',
    Knife: 'OffHand',
    Mace: 'MainHand',
    Sword: 'MainHand',
  },
  combatTurnTimeout: 30,
  attackZones: [
    'head',
    'torso',
    'waist',
    'legs',
  ],
  defenseZones: [
    ['legs', 'head'],
    ['head', 'torso'],
    ['torso', 'waist'],
    ['waist', 'legs'],
  ],
};

export default Object.freeze(ConfigLib);
