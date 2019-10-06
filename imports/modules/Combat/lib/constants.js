export const JOB_TYPE = 'combatTurn';
export const COMBAT_STATE = {
  RUNNING: 'running',
  COMPLETED: 'completed',
  ABORTED: 'aborted',
};

export const LOG_ACTION = {
  SKIP: 'skip',
  DODGE: 'dodge',
  DAMAGE: 'damage',
  BLOCK: 'block',
  CRITICAL: 'critical',
};

export default {
  JOB_TYPE,
  COMBAT_STATE,
  LOG_ACTION,
};
