// Device information component
export function createDeviceInfo() {
  return `
    <div class="glass-card p-6 mb-6">
      <h3 class="text-lg font-semibold text-slate-200 mb-4">Device Information</h3>
      <div class="grid grid-cols-2 gap-4 text-sm">
        <div class="space-y-2">
          <p class="text-slate-400">Device ID: <span id="deviceId" class="text-slate-200">Not Connected</span></p>
          <p class="text-slate-400">Model: <span id="deviceModel" class="text-slate-200">--</span></p>
          <p class="text-slate-400">Firmware: <span id="deviceFirmware" class="text-slate-200">--</span></p>
        </div>
        <div class="space-y-2">
          <p class="text-slate-400">Signal Strength: <span id="signalStrength" class="text-slate-200">--</span></p>
          <p class="text-slate-400">Battery: <span id="batteryLevel" class="text-slate-200">--</span></p>
          <p class="text-slate-400">Last Updated: <span id="lastUpdate" class="text-slate-200">--</span></p>
        </div>
      </div>
    </div>
  `;
}