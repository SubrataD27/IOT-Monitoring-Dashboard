import mqtt, { MqttClient } from 'mqtt';
import { BehaviorSubject } from 'rxjs';
import { MQTT_CONFIG } from './mqtt.config';

interface SensorData {
  value: number;
  timestamp: number;
  deviceId: string;
}

export class MQTTService {
  private client: MqttClient;
  private temperature = new BehaviorSubject<SensorData | null>(null);
  private humidity = new BehaviorSubject<SensorData | null>(null);
  private energy = new BehaviorSubject<SensorData | null>(null);

  constructor() {
    const { broker, port, protocol, options } = MQTT_CONFIG;
    const url = `${protocol}://${broker}:${port}/mqtt`;
    this.client = mqtt.connect(url, options);

    this.setupEventHandlers();
    this.subscribeToTopics();
  }

  private setupEventHandlers() {
    this.client.on('connect', () => {
      console.log('MQTT Connected');
      this.client.publish(MQTT_CONFIG.topics.status, JSON.stringify({ status: 'online' }));
    });

    this.client.on('message', (topic, message) => {
      const data = JSON.parse(message.toString());
      
      switch (topic) {
        case MQTT_CONFIG.topics.temperature:
          this.temperature.next(data);
          break;
        case MQTT_CONFIG.topics.humidity:
          this.humidity.next(data);
          break;
        case MQTT_CONFIG.topics.energy:
          this.energy.next(data);
          break;
      }
    });

    this.client.on('error', (error) => {
      console.error('MQTT Error:', error);
    });
  }

  private subscribeToTopics() {
    const { topics } = MQTT_CONFIG;
    Object.values(topics).forEach(topic => {
      this.client.subscribe(topic, (err) => {
        if (err) {
          console.error(`Error subscribing to ${topic}:`, err);
        }
      });
    });
  }

  // Send control commands to Arduino
  sendCommand(command: string, value: any) {
    this.client.publish(MQTT_CONFIG.topics.control, JSON.stringify({
      command,
      value,
      timestamp: Date.now()
    }));
  }

  // Getters for sensor data
  getTemperature() {
    return this.temperature.asObservable();
  }

  getHumidity() {
    return this.humidity.asObservable();
  }

  getEnergy() {
    return this.energy.asObservable();
  }

  disconnect() {
    if (this.client.connected) {
      this.client.publish(MQTT_CONFIG.topics.status, JSON.stringify({ status: 'offline' }));
      this.client.end();
    }
  }
}