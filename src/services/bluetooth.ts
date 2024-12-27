export function setupBluetooth() {
  const updateStatus = (status: string, isError = false) => {
    const statusEl = document.getElementById('connectionStatus')!;
    statusEl.textContent = status;
    statusEl.className = isError ? 'text-red-600' : 'text-green-600';
  };

  const updateBluetoothIcon = (connected: boolean) => {
    document.getElementById('bluetoothToggle')!.textContent = connected ? '🔵' : '⚪';
  };

  const connectBluetooth = async () => {
    try {
      if (!navigator.bluetooth) {
        updateStatus('Bluetooth not supported', true);
        return;
      }

      updateStatus('Connecting...');
      
      const device = await navigator.bluetooth.requestDevice({
        filters: [
          { services: ['environmental_sensing'] },
          { services: ['battery_service'] }
        ],
        optionalServices: ['device_information']
      });

      const server = await device.gatt?.connect();
      if (server) {
        updateStatus('Connected');
        updateBluetoothIcon(true);
      }
    } catch (error) {
      if ((error as Error).name === 'NotFoundError') {
        updateStatus('No device selected', true);
      } else {
        updateStatus('Connection failed', true);
        console.error('Bluetooth error:', error);
      }
      updateBluetoothIcon(false);
    }
  };

  const scanDevices = async () => {
    const deviceList = document.getElementById('deviceList')!;
    const scanButton = document.getElementById('scanButton')!;
    
    deviceList.classList.remove('hidden');
    scanButton.textContent = 'Scanning...';
    scanButton.classList.add('bg-gray-500');
    scanButton.classList.remove('bg-blue-500');
    
    try {
      await connectBluetooth();
    } finally {
      scanButton.textContent = 'Scan for Devices';
      scanButton.classList.remove('bg-gray-500');
      scanButton.classList.add('bg-blue-500');
    }
  };

  return { connectBluetooth, scanDevices };
}