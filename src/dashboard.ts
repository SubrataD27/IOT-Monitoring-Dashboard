import { DeviceConnection } from './utils/device-connection';
import { SensorMonitor } from './utils/sensor-monitor';
import { createConnectionStatus } from './components/connection-status';
import { createDeviceControls } from './components/device-controls';

export function setupDashboard() {
  const deviceConnection = new DeviceConnection();
  const sensorMonitor = new SensorMonitor();

  // Add connection status and device controls to the UI
  document.body.insertAdjacentHTML('beforeend', createConnectionStatus());
  document.querySelector('main')?.insertAdjacentHTML('beforeend', createDeviceControls());

  // Handle connection button clicks
  document.getElementById('connectBtn')?.addEventListener('click', async () => {
    const isConnected = await deviceConnection.connect();
    if (isConnected) {
      sensorMonitor.startMonitoring();
    } else {
      sensorMonitor.stopMonitoring();
    }
  });

  // Handle device controls
  const tempControl = document.getElementById('tempControl') as HTMLInputElement;
  const tempValue = document.getElementById('tempValue');

  if (tempControl && tempValue) {
    tempControl.addEventListener('input', () => {
      tempValue.textContent = `${tempControl.value}°C`;
      tempValue.classList.add('animate-value-change');
      setTimeout(() => tempValue.classList.remove('animate-value-change'), 300);
    });
  }

  // Handle mode buttons
  document.querySelectorAll('[data-mode]').forEach(button => {
    button.addEventListener('click', (e) => {
      const target = e.currentTarget as HTMLButtonElement;
      document.querySelectorAll('[data-mode]').forEach(btn => 
        btn.classList.remove('active')
      );
      target.classList.add('active');
    });
  });

  // Handle fan speed buttons
  document.querySelectorAll('[data-speed]').forEach(button => {
    button.addEventListener('click', (e) => {
      const target = e.currentTarget as HTMLButtonElement;
      document.querySelectorAll('[data-speed]').forEach(btn => 
        btn.classList.remove('active')
      );
      target.classList.add('active');
    });
  });
}