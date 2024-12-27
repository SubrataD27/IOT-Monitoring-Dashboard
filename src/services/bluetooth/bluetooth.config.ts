export const BLUETOOTH_CONFIG = {
  services: {
    arduino: '19b10000-e8f2-537e-4f6c-d104768a1214', // Arduino service UUID
    environmental: '0000181a-0000-1000-8000-00805f9b34fb', // Environmental sensing
    battery: '180f' // Battery service
  },
  characteristics: {
    temperature: '2a6e',
    humidity: '2a6f',
    energy: '2a7d'
  },
  scanOptions: {
    acceptAllDevices: false,
    filters: [
      { namePrefix: 'Arduino' },
      { namePrefix: 'ESP32' },
      { namePrefix: 'IoT' }
    ],
    optionalServices: ['environmental_sensing', 'battery_service']
  }
};