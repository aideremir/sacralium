import Primary from './Primary';
import Secondary from './Secondary';

import Health from './Health';
import Damage from './Damage';
import ArmorActive from './ArmorActive';
import ArmorPassive from './ArmorPassive';
import Level from './Level';
import Weight from './Weight';

export default Object.freeze({
  ...Primary,
  ...Secondary,
  ...ArmorPassive,
  'Attribute/Health': Health,
  'Attribute/Damage': Damage,
  'Attribute/ArmorActive': ArmorActive,
  'Attribute/Level': Level,
  'Attribute/Weight': Weight,
});
