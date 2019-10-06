import collection from '../lib/collection';
import { COMBAT_STATE } from '../lib/constants';

collection._ensureIndex(
  {
    participants: 1,
  },
);

collection._ensureIndex(
  {
    participants: 1,
    state: 1,
  },
  {
    unique: true,
    partialFilterExpression: { state: COMBAT_STATE.RUNNING },
  },
);

export default collection;
