import { BehaviorSubject } from 'rxjs';

interface DeviceStatus {
  connected: boolean;
  deviceId: string;
  model: string;
  firmware: string;
  signalStrength: number;
  batteryLevel: number;
  lastUpdate: Date;
}

interface SensorData {
  temperature: number;
  humidity: number;
  power: number;
}

export class DeviceMonitor {
  private deviceStatus = new BehaviorSubject<DeviceStatus>({
    connected: false,
    deviceId: '',
    model: '',
    firmware: '',
    signalStrength: 0,
    batteryLevel: 0,
    lastUpdate: new Date()
  });

  private sensorData = new BehaviorSubject<SensorData>({
    temperature: 0,
    humidity: 0,
    power: 0
  });

  constructor() {
    // Simulate real-time updates
    setInterval(() => this.updateSensorData(), 2000);
  }

  private updateSensorData() {
    if (this.deviceStatus.getValue().connected) {
      this.sensorData.next({
        temperature: 20 + Math.random() * 5,
        humidity: 40 + Math.random() * 20,
        power: 100 + Math.random() * 50
      });
    }
  }

  public updateDeviceStatus(status: Partial<DeviceStatus>) {
    this.deviceStatus.next({
      ...this.deviceStatus.getValue(),
      ...status,
      lastUpdate: new Date()
    });
  }

  public getDeviceStatus() {
    return this.deviceStatus.asObservable();
  }

  public getSensorData() {
    return this.sensorData.asObservable();
  }
}