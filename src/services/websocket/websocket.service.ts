import { io, Socket } from 'socket.io-client';
import { BehaviorSubject } from 'rxjs';
import { WEBSOCKET_CONFIG } from './websocket.config';

interface DeviceStatus {
  deviceId: string;
  status: 'online' | 'offline';
  lastSeen: number;
}

export class WebSocketService {
  private socket: Socket;
  private deviceStatus = new BehaviorSubject<DeviceStatus[]>([]);
  private retryCount = 0;

  constructor() {
    this.socket = io(WEBSOCKET_CONFIG.url, {
      reconnection: true,
      reconnectionDelay: WEBSOCKET_CONFIG.reconnectInterval,
      reconnectionAttempts: WEBSOCKET_CONFIG.maxRetries
    });

    this.setupEventHandlers();
  }

  private setupEventHandlers() {
    const { events } = WEBSOCKET_CONFIG;

    this.socket.on('connect', () => {
      console.log('WebSocket Connected');
      this.retryCount = 0;
    });

    this.socket.on(events.sensorData, (data) => {
      // Handle real-time sensor data
      this.processSensorData(data);
    });

    this.socket.on(events.deviceStatus, (status) => {
      const currentDevices = this.deviceStatus.getValue();
      const updatedDevices = currentDevices.map(device => 
        device.deviceId === status.deviceId ? { ...device, ...status } : device
      );
      this.deviceStatus.next(updatedDevices);
    });

    this.socket.on('disconnect', () => {
      console.log('WebSocket Disconnected');
    });

    this.socket.on('error', (error) => {
      console.error('WebSocket Error:', error);
      if (this.retryCount < WEBSOCKET_CONFIG.maxRetries) {
        this.retryCount++;
        setTimeout(() => this.socket.connect(), WEBSOCKET_CONFIG.reconnectInterval);
      }
    });
  }

  private processSensorData(data: any) {
    // Process and emit sensor data updates
    // This will be used by the dashboard to update the UI
  }

  // Send control commands to Arduino
  sendCommand(command: string, params: any) {
    this.socket.emit(WEBSOCKET_CONFIG.events.control, {
      command,
      params,
      timestamp: Date.now()
    });
  }

  getDeviceStatus() {
    return this.deviceStatus.asObservable();
  }

  disconnect() {
    this.socket.disconnect();
  }
}