export function updateDeviceInfo(info: any) {
  const elements = {
    deviceId: document.getElementById('deviceId'),
    deviceModel: document.getElementById('deviceModel'),
    deviceFirmware: document.getElementById('deviceFirmware'),
    signalStrength: document.getElementById('signalStrength'),
    batteryLevel: document.getElementById('batteryLevel'),
    lastUpdate: document.getElementById('lastUpdate')
  };

  if (info.deviceId) elements.deviceId!.textContent = info.deviceId;
  if (info.model) elements.deviceModel!.textContent = info.model;
  if (info.firmware) elements.deviceFirmware!.textContent = info.firmware;
  if (info.signalStrength) elements.signalStrength!.textContent = `${info.signalStrength}%`;
  if (info.batteryLevel) elements.batteryLevel!.textContent = `${info.batteryLevel}%`;
  if (info.lastUpdate) elements.lastUpdate!.textContent = new Date(info.lastUpdate).toLocaleTimeString();
}

export function updateSensorReadings(data: any) {
  const elements = {
    tempReading: document.getElementById('tempReading'),
    humidityReading: document.getElementById('humidityReading'),
    powerReading: document.getElementById('powerReading')
  };

  if (data.temperature) elements.tempReading!.textContent = `${data.temperature.toFixed(1)}°C`;
  if (data.humidity) elements.humidityReading!.textContent = `${data.humidity.toFixed(1)}%`;
  if (data.power) elements.powerReading!.textContent = `${data.power.toFixed(0)}W`;
}