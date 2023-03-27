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
  GENERAL = 'general',
  MATCHES = 'matches',
  CHARACTERS = 'characters',
  TEAMS = 'teams',
  LEAGUES = 'leagues',
  PLAYERS = 'players',
}

export enum PrimaryAttrs {
  AGI = 'agi',
  INT = 'int',
  STR = 'str',
}

export enum TypeAttack {
  Melee = 'Melee',
  Ranged = 'Ranged',
}
export enum TypeAttackRUS {
  Melee = 'Ближний бой',
  Ranged = 'Дальний бой',
}

export enum HeroRoles {
  Carry = 'Carry',
  Nuker = 'Nuker',
  Pusher = 'Pusher',
  Initiator = 'Initiator',
  Durable = 'Durable',
  Disabler = 'Disabler',
  Support = 'Support',
  Escape = 'Escape',
  Jungler = 'Jungler',
}

export enum HeroRolesRus {
  Carry = 'Кэрри',
  Nuker = 'Нюкер',
  Pusher = 'Пушер',
  Initiator = 'Инициатор',
  Durable = 'Танк',
  Disabler = 'Дизэйблер',
  Support = 'Поддержка',
  Escape = 'Эскейпер',
  Jungler = 'Лесник',
}
