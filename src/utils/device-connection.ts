import { BehaviorSubject } from 'rxjs';

interface ConnectionState {
  status: 'connected' | 'disconnected' | 'connecting';
  deviceName?: string;
  error?: string;
}

export class DeviceConnection {
  private connectionState = new BehaviorSubject<ConnectionState>({
    status: 'disconnected'
  });

  constructor() {
    this.setupConnectionHandlers();
  }

  private setupConnectionHandlers() {
    const connectBtn = document.getElementById('connectBtn');
    const indicator = document.querySelector('.connection-indicator');
    const statusText = document.getElementById('statusText');
    const deviceName = document.getElementById('deviceName');

    this.connectionState.subscribe(state => {
      if (indicator && statusText && deviceName && connectBtn) {
        indicator.className = `connection-indicator ${state.status}`;
        statusText.textContent = state.status.charAt(0).toUpperCase() + state.status.slice(1);
        deviceName.textContent = state.deviceName || 'No device connected';
        connectBtn.textContent = state.status === 'connected' ? 'Disconnect' : 'Connect';
      }
    });
  }

  async connect() {
    try {
      this.connectionState.next({ status: 'connecting' });
      
      // Simulate connection delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      this.connectionState.next({
        status: 'connected',
        deviceName: 'Arduino IoT Device'
      });
      
      return true;
    } catch (error) {
      this.connectionState.next({
        status: 'disconnected',
        error: 'Connection failed'
      });
      return false;
    }
  }

  disconnect() {
    this.connectionState.next({ status: 'disconnected' });
  }

  getConnectionState() {
    return this.connectionState.asObservable();
  }
}