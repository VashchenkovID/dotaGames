export enum LocalStorageKeysEnum {
  TOKEN = 'token',
  ID = 'id',
}

export const enum RequestStatusEnum {
  IDLE = 'idle',
  PENDING = 'pending',
  FULFILLED = 'fulfilled',
  REJECTED = 'rejected',
}

export enum HeaderIdEnum {
  DIRECTORIES = 'directories',
  SCENARIOS = 'scenarios',
}

export enum TypePropertyEnum {
  EDIT,
  VIEW,
  CREATE,
}

export const enum ProjectTypeEnum {
  GRR = 'GRR', //'Геологоразведочный',
  DOB = 'DOB', // 'Добычной'
}

export const enum InputDataDetailsEnum {
  GENERAL = 'GENERAL',
  DETAILED = 'DETAILED',
}

export const enum CruiseEventTypeEnum {
  TRANSITION = 'TRANSITION',
  PRR_IN_PORT = 'PRR_IN_PORT',
  PRR_NEAR_PLATFORM = 'PRR_NEAR_PLATFORM',
  PRR_NEAR_PLATFORM_LARN = 'PRR_NEAR_PLATFORM_LARN',
  PLATFORM_TRANSPORTING = 'PLATFORM_TRANSPORTING',
  TOIR = 'TOIR',
  ASD = 'ASD',
  SWIM_STOREHAUSE = 'SWIM_STOREHAUSE',
  SWIM_STOREHAUSE_LARN = 'SWIM_STOREHAUSE_LARN',
  LARN_VIGIL = 'LARN_VIGIL',
  OIL_WINDOWS = 'OIL_WINDOWS',
}

export const enum TimeScaleEnum {
  YEAR = 'year',
  HALF_YEAR = 'half-year',
  QUARTER = 'quarter',
  MONTH = 'month',
  WEEK = 'week',
}
