export const APP_CONFIG = {
  version: '1.0.0',
  company: 'IoT Solutions Inc.',
  refreshRate: 1000, // Data refresh rate in ms
  retryAttempts: 3,
  connectionTimeout: 5000,
  maxHistoryPoints: 100, // Maximum data points to store
};

export const DEVICE_CONFIG = {
  supportedModels: ['Arduino Uno', 'Arduino Mega', 'ESP32', 'ESP8266'],
  protocols: ['BLE', 'MQTT', 'WebSocket'],
  dataEndpoints: {
    temperature: '/sensor/temperature',
    humidity: '/sensor/humidity',
    power: '/sensor/power',
    status: '/device/status'
  }
};