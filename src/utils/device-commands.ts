export const DeviceCommands = {
  POWER: 'power',
  TEMPERATURE: 'temperature',
  MODE: 'mode',
  FAN_SPEED: 'fan_speed',
  TIMER: 'timer',
  LED: 'led',
  RESET: 'reset'
} as const;

export const DeviceModes = {
  AUTO: 'auto',
  MANUAL: 'manual',
  ECO: 'eco',
  BOOST: 'boost'
} as const;