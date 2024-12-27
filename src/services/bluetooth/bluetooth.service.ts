import { BehaviorSubject, Observable } from 'rxjs';
import { BLUETOOTH_CONFIG } from './bluetooth.config';

interface BluetoothDevice {
  id: string;
  name: string;
  rssi: number;
  services: string[];
}

export class BluetoothService {
  private devices = new BehaviorSubject<BluetoothDevice[]>([]);
  private connectionStatus = new BehaviorSubject<boolean>(false);
  private currentDevice: BluetoothDevice | null = null;

  async connect(deviceId: string): Promise<void> {
    try {
      const device = await navigator.bluetooth.requestDevice(BLUETOOTH_CONFIG.scanOptions);
      const server = await device.gatt?.connect();
      
      if (server) {
        // Get the Arduino service
        const service = await server.getPrimaryService(BLUETOOTH_CONFIG.services.arduino);
        
        // Get characteristics for sensor data
        const tempCharacteristic = await service.getCharacteristic(BLUETOOTH_CONFIG.characteristics.temperature);
        const humidityCharacteristic = await service.getCharacteristic(BLUETOOTH_CONFIG.characteristics.humidity);
        const energyCharacteristic = await service.getCharacteristic(BLUETOOTH_CONFIG.characteristics.energy);

        // Enable notifications for real-time updates
        await tempCharacteristic.startNotifications();
        await humidityCharacteristic.startNotifications();
        await energyCharacteristic.startNotifications();

        // Set up listeners
        tempCharacteristic.addEventListener('characteristicvaluechanged', this.handleTemperatureChange);
        humidityCharacteristic.addEventListener('characteristicvaluechanged', this.handleHumidityChange);
        energyCharacteristic.addEventListener('characteristicvaluechanged', this.handleEnergyChange);

        this.connectionStatus.next(true);
      }
    } catch (error) {
      console.error('Bluetooth connection error:', error);
      this.connectionStatus.next(false);
      throw error;
    }
  }

  async startScanning(): Promise<void> {
    try {
      const device = await navigator.bluetooth.requestDevice(BLUETOOTH_CONFIG.scanOptions);
      if (device) {
        const newDevice: BluetoothDevice = {
          id: device.id,
          name: device.name || 'Unknown Device',
          rssi: -1, // RSSI not available in Web Bluetooth API
          services: []
        };
        
        const currentDevices = this.devices.getValue();
        this.devices.next([...currentDevices, newDevice]);
      }
    } catch (error) {
      console.error('Scanning error:', error);
      throw error;
    }
  }

  private handleTemperatureChange(event: Event) {
    const value = (event.target as BluetoothRemoteGATTCharacteristic).value;
    if (value) {
      const temperature = value.getFloat32(0, true);
      // Emit temperature update
    }
  }

  private handleHumidityChange(event: Event) {
    const value = (event.target as BluetoothRemoteGATTCharacteristic).value;
    if (value) {
      const humidity = value.getFloat32(0, true);
      // Emit humidity update
    }
  }

  private handleEnergyChange(event: Event) {
    const value = (event.target as BluetoothRemoteGATTCharacteristic).value;
    if (value) {
      const energy = value.getFloat32(0, true);
      // Emit energy update
    }
  }

  getDevices(): Observable<BluetoothDevice[]> {
    return this.devices.asObservable();
  }

  getConnectionStatus(): Observable<boolean> {
    return this.connectionStatus.asObservable();
  }
}