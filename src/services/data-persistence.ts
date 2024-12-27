import { APP_CONFIG } from '../config/app.config';

export class DataPersistence {
  private static readonly STORAGE_KEYS = {
    SENSOR_HISTORY: 'sensor_history',
    DEVICE_SETTINGS: 'device_settings',
    CONNECTION_INFO: 'connection_info'
  };

  static saveSensorData(data: any) {
    const history = this.getSensorHistory();
    history.push({ ...data, timestamp: new Date() });
    
    // Keep only recent data points
    if (history.length > APP_CONFIG.maxHistoryPoints) {
      history.shift();
    }
    
    localStorage.setItem(
      this.STORAGE_KEYS.SENSOR_HISTORY, 
      JSON.stringify(history)
    );
  }

  static getSensorHistory() {
    const history = localStorage.getItem(this.STORAGE_KEYS.SENSOR_HISTORY);
    return history ? JSON.parse(history) : [];
  }

  static saveDeviceSettings(settings: any) {
    localStorage.setItem(
      this.STORAGE_KEYS.DEVICE_SETTINGS, 
      JSON.stringify(settings)
    );
  }

  static getDeviceSettings() {
    const settings = localStorage.getItem(this.STORAGE_KEYS.DEVICE_SETTINGS);
    return settings ? JSON.parse(settings) : null;
  }
}