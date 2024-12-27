import mqtt from 'mqtt';

export function setupMQTT() {
  const client = mqtt.connect('wss://test.mosquitto.org:8081');
  
  client.on('connect', () => {
    console.log('MQTT Connected');
    client.subscribe(['sensor/temperature', 'sensor/humidity', 'sensor/energy']);
  });

  return {
    on: (topic: string, callback: (value: number) => void) => {
      client.on('message', (receivedTopic, message) => {
        if (receivedTopic === topic) {
          callback(parseFloat(message.toString()));
        }
      });
    }
  };
}