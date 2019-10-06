import CombatCollection from './collection';

function getCombatById(_id) {
  if (!_id) {
    return null;
  }
  return CombatCollection.findOne({ _id });
}

export default {
  getCombatById,
};
