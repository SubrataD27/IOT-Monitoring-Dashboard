import { BehaviorSubject } from 'rxjs';
import { APP_CONFIG } from '../config/app.config';
import { ErrorHandler } from './error-handler';
import { DataPersistence } from './data-persistence';

export class ConnectionManager {
  private connectionStatus = new BehaviorSubject<boolean>(false);
  private retryCount = 0;
  private reconnectTimer: number | null = null;

  async connect() {
    try {
      this.retryCount = 0;
      await this.establishConnection();
      this.connectionStatus.next(true);
      this.saveConnectionInfo();
    } catch (error) {
      await this.handleConnectionFailure(error as Error);
    }
  }

  private async establishConnection() {
    // Implement actual device connection logic here
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  private async handleConnectionFailure(error: Error) {
    const errorInfo = ErrorHandler.handleConnectionError(error);
    
    if (errorInfo.retry && this.retryCount < APP_CONFIG.retryAttempts) {
      this.retryCount++;
      this.scheduleReconnect();
    } else {
      this.connectionStatus.next(false);
      throw error;
    }
  }

  private scheduleReconnect() {
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
    }
    
    this.reconnectTimer = window.setTimeout(
      () => this.connect(), 
      APP_CONFIG.connectionTimeout
    );
  }

  private saveConnectionInfo() {
    DataPersistence.saveDeviceSettings({
      lastConnected: new Date(),
      connectionType: 'BLE',
      deviceId: 'unique-device-id'
    });
  }

  getConnectionStatus() {
    return this.connectionStatus.asObservable();
  }
}