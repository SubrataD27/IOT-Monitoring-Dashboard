import { Observable } from '@nativescript/core';
import { BluetoothService } from './services/bluetooth.service';
import { MQTTService } from './services/mqtt.service';
import { SensorDataService, SensorData } from './services/sensor-data.service';

export class MainViewModel extends Observable {
  private bluetoothService: BluetoothService;
  private mqttService: MQTTService;
  private sensorDataService: SensorDataService;

  private _isBluetoothEnabled: boolean = false;
  private _isScanning: boolean = false;
  private _isConnected: boolean = false;
  private _devices: any[] = [];
  private _temperature: number = 0;
  private _humidity: number = 0;
  private _energy: number = 0;

  constructor() {
    super();

    this.bluetoothService = new BluetoothService();
    this.mqttService = new MQTTService();
    this.sensorDataService = new SensorDataService();

    this.initializeServices();
    this.setupDataSubscriptions();
  }

  private async initializeServices() {
    // Check Bluetooth status
    this.isBluetoothEnabled = await this.bluetoothService.isEnabled();
    
    // Connect to MQTT broker
    try {
      await this.mqttService.connect();
      this.subscribeMQTTTopics();
    } catch (error) {
      console.error('MQTT Connection failed:', error);
    }
  }

  private setupDataSubscriptions() {
    // Subscribe to sensor data updates
    this.sensorDataService.getSensorData().subscribe((data: SensorData) => {
      this.temperature = data.temperature;
      this.humidity = data.humidity;
      this.energy = data.energy;
    });

    // Subscribe to Bluetooth connection status
    this.bluetoothService.getConnectionStatus().subscribe((status: boolean) => {
      this.isConnected = status;
    });
  }

  private subscribeMQTTTopics() {
    this.mqttService.subscribe('sensors/temperature', (message) => {
      this.sensorDataService.updateSensorData({ temperature: parseFloat(message) });
    });

    this.mqttService.subscribe('sensors/humidity', (message) => {
      this.sensorDataService.updateSensorData({ humidity: parseFloat(message) });
    });

    this.mqttService.subscribe('sensors/energy', (message) => {
      this.sensorDataService.updateSensorData({ energy: parseFloat(message) });
    });
  }

  public async toggleBluetooth() {
    if (!this.isBluetoothEnabled) {
      await this.bluetoothService.enable();
      this.isBluetoothEnabled = true;
    }
  }

  public async toggleScan() {
    if (this.isScanning) {
      this.isScanning = false;
      return;
    }

    this.isScanning = true;
    this.devices = [];

    this.bluetoothService.scan().subscribe(
      (device) => {
        this.devices.push(device);
      },
      (error) => {
        console.error('Scan error:', error);
        this.isScanning = false;
      },
      () => {
        this.isScanning = false;
      }
    );
  }

  public async onDeviceSelect(args: any) {
    const device = this.devices[args.index];
    try {
      await this.bluetoothService.connect(device.UUID);
      this.isConnected = true;
    } catch (error) {
      console.error('Connection error:', error);
    }
  }

  // Getters and setters
  get isBluetoothEnabled(): boolean {
    return this._isBluetoothEnabled;
  }

  set isBluetoothEnabled(value: boolean) {
    if (this._isBluetoothEnabled !== value) {
      this._isBluetoothEnabled = value;
      this.notifyPropertyChange('isBluetoothEnabled', value);
    }
  }

  get isScanning(): boolean {
    return this._isScanning;
  }

  set isScanning(value: boolean) {
    if (this._isScanning !== value) {
      this._isScanning = value;
      this.notifyPropertyChange('isScanning', value);
    }
  }

  get isConnected(): boolean {
    return this._isConnected;
  }

  set isConnected(value: boolean) {
    if (this._isConnected !== value) {
      this._isConnected = value;
      this.notifyPropertyChange('isConnected', value);
    }
  }

  get devices(): any[] {
    return this._devices;
  }

  set devices(value: any[]) {
    if (this._devices !== value) {
      this._devices = value;
      this.notifyPropertyChange('devices', value);
    }
  }

  get temperature(): number {
    return this._temperature;
  }

  set temperature(value: number) {
    if (this._temperature !== value) {
      this._temperature = value;
      this.notifyPropertyChange('temperature', value);
    }
  }

  get humidity(): number {
    return this._humidity;
  }

  set humidity(value: number) {
    if (this._humidity !== value) {
      this._humidity = value;
      this.notifyPropertyChange('humidity', value);
    }
  }

  get energy(): number {
    return this._energy;
  }

  set energy(value: number) {
    if (this._energy !== value) {
      this._energy = value;
      this.notifyPropertyChange('energy', value);
    }
  }

  get connectionStatus(): string {
    return this.isConnected ? 'Connected' : 'Disconnected';
  }
}