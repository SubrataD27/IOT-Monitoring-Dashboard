import { BluetoothService } from '../services/bluetooth/bluetooth.service';
import { MQTTService } from '../services/mqtt/mqtt.service';
import { WebSocketService } from '../services/websocket/websocket.service';

export class DeviceController {
  constructor(
    private bluetoothService: BluetoothService,
    private mqttService: MQTTService,
    private wsService: WebSocketService
  ) {}

  // Connect to device via Bluetooth
  async connectBluetooth(): Promise<void> {
    try {
      await this.bluetoothService.startScanning();
      const devices = await this.bluetoothService.getDevices();
      
      // Connect to the first available device
      devices.subscribe(deviceList => {
        if (deviceList.length > 0) {
          this.bluetoothService.connect(deviceList[0].id);
        }
      });
    } catch (error) {
      console.error('Failed to connect via Bluetooth:', error);
      throw error;
    }
  }

  // Control device functions
  async controlDevice(action: string, value: any): Promise<void> {
    // Send command through all available channels for redundancy
    try {
      // Via MQTT
      this.mqttService.sendCommand(action, value);
      
      // Via WebSocket
      this.wsService.sendCommand(action, { value });
      
    } catch (error) {
      console.error('Failed to send command:', error);
      throw error;
    }
  }

  // Common control actions
  async togglePower(deviceId: string, state: boolean): Promise<void> {
    await this.controlDevice('power', { deviceId, state });
  }

  async setTemperature(deviceId: string, temp: number): Promise<void> {
    await this.controlDevice('temperature', { deviceId, value: temp });
  }

  async setMode(deviceId: string, mode: string): Promise<void> {
    await this.controlDevice('mode', { deviceId, value: mode });
  }
}