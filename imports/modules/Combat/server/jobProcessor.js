import agenda from '/imports/modules/Core/server/Agenda';
import Log from '/imports/modules/Log';

import { JOB_TYPE } from '../lib/constants';
import CombatHelpers from '../lib/helpers';
import CombatManager from './Manager';

agenda.define(JOB_TYPE, (job) => {
  try {
    const combat = CombatHelpers.getCombatById(job.attrs.data.combatId);
    CombatManager.processTurnCatchable(combat);
  } catch (error) {
    Log.add(error);
    throw error;
  }
});
