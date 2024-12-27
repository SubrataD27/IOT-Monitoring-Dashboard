import { BehaviorSubject } from 'rxjs';

interface SensorData {
  temperature: number;
  humidity: number;
  power: number;
  timestamp: Date;
}

export class SensorMonitor {
  private sensorData = new BehaviorSubject<SensorData>({
    temperature: 22,
    humidity: 45,
    power: 120,
    timestamp: new Date()
  });

  private updateInterval: number | null = null;

  startMonitoring() {
    this.updateInterval = window.setInterval(() => {
      const currentData = this.sensorData.getValue();
      
      this.sensorData.next({
        temperature: currentData.temperature + (Math.random() - 0.5),
        humidity: Math.max(0, Math.min(100, currentData.humidity + (Math.random() - 0.5) * 2)),
        power: Math.max(0, currentData.power + (Math.random() - 0.5) * 10),
        timestamp: new Date()
      });
    }, 2000);
  }

  stopMonitoring() {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
      this.updateInterval = null;
    }
  }

  getSensorData() {
    return this.sensorData.asObservable();
  }
}