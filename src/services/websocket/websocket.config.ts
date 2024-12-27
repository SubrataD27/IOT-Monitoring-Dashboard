export const WEBSOCKET_CONFIG = {
  url: 'wss://your-arduino-websocket-server.com',
  reconnectInterval: 5000,
  maxRetries: 5,
  events: {
    sensorData: 'sensor_data',
    deviceStatus: 'device_status',
    control: 'control_command',
    error: 'error'
  }
};