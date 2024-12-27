import { MQTTClient } from 'nativescript-mqtt';

export class MQTTService {
  private client: MQTTClient;
  private connected = false;

  constructor() {
    this.client = new MQTTClient({
      host: 'broker.hivemq.com',
      port: 1883,
      protocol: 'mqtt'
    });
  }

  public connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.client.connect(() => {
        this.connected = true;
        resolve();
      }, (error) => {
        reject(error);
      });
    });
  }

  public subscribe(topic: string, callback: (message: string) => void): void {
    this.client.subscribe(topic, (message) => {
      callback(message.toString());
    });
  }

  public publish(topic: string, message: string): void {
    if (this.connected) {
      this.client.publish(topic, message);
    }
  }

  public disconnect(): void {
    if (this.connected) {
      this.client.disconnect();
      this.connected = false;
    }
  }
}