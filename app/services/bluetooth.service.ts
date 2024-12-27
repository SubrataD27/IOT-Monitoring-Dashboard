import { Observable, BehaviorSubject } from 'rxjs';
import { Bluetooth } from '@nativescript/bluetooth';

export class BluetoothService {
  private bluetooth: Bluetooth;
  private connectionStatus = new BehaviorSubject<boolean>(false);

  constructor() {
    this.bluetooth = new Bluetooth();
  }

  public isEnabled(): Promise<boolean> {
    return this.bluetooth.isBluetoothEnabled();
  }

  public enable(): Promise<void> {
    return this.bluetooth.enable();
  }

  public scan(): Observable<any> {
    return new Observable(observer => {
      this.bluetooth.startScanning({
        serviceUUIDs: [],
        seconds: 4,
        onDiscovered: (peripheral) => observer.next(peripheral)
      });
    });
  }

  public connect(UUID: string): Promise<any> {
    return this.bluetooth.connect({
      UUID,
      onDisconnected: () => this.connectionStatus.next(false)
    });
  }

  public disconnect(UUID: string): Promise<any> {
    return this.bluetooth.disconnect({ UUID });
  }

  public getConnectionStatus(): Observable<boolean> {
    return this.connectionStatus.asObservable();
  }
}