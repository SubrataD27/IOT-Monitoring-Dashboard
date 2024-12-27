import { Observable, BehaviorSubject } from 'rxjs';

export interface SensorData {
  temperature: number;
  humidity: number;
  energy: number;
  timestamp: Date;
}

export class SensorDataService {
  private sensorData = new BehaviorSubject<SensorData>({
    temperature: 0,
    humidity: 0,
    energy: 0,
    timestamp: new Date()
  });

  public updateSensorData(data: Partial<SensorData>): void {
    const currentData = this.sensorData.getValue();
    this.sensorData.next({
      ...currentData,
      ...data,
      timestamp: new Date()
    });
  }

  public getSensorData(): Observable<SensorData> {
    return this.sensorData.asObservable();
  }
}