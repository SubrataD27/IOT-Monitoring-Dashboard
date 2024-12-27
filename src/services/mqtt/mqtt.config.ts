export const MQTT_CONFIG = {
  broker: 'broker.hivemq.com',
  port: 8884, // Secure WebSocket port
  protocol: 'wss',
  topics: {
    temperature: 'arduino/sensors/temperature',
    humidity: 'arduino/sensors/humidity',
    energy: 'arduino/sensors/energy',
    status: 'arduino/status',
    control: 'arduino/control'
  },
  options: {
    keepalive: 60,
    clientId: `iot_dashboard_${Math.random().toString(16).substr(2, 8)}`,
    clean: true,
    reconnectPeriod: 5000,
    connectTimeout: 30 * 1000
  }
};