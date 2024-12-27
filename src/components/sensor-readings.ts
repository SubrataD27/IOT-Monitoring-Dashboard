// Real-time sensor readings component
export function createSensorReadings() {
  return `
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div class="glass-card p-6">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold text-slate-200">Temperature</h3>
          <div class="w-10 h-10 bg-indigo-500/10 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
          </div>
        </div>
        <div class="text-center">
          <span id="tempReading" class="text-4xl font-bold text-indigo-400">--°C</span>
          <div class="mt-2 text-sm text-slate-400">Last hour range: <span id="tempRange">--</span></div>
        </div>
      </div>

      <div class="glass-card p-6">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold text-slate-200">Humidity</h3>
          <div class="w-10 h-10 bg-emerald-500/10 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
        </div>
        <div class="text-center">
          <span id="humidityReading" class="text-4xl font-bold text-emerald-400">--%</span>
          <div class="mt-2 text-sm text-slate-400">Last hour range: <span id="humidityRange">--</span></div>
        </div>
      </div>

      <div class="glass-card p-6">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold text-slate-200">Power Usage</h3>
          <div class="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
        </div>
        <div class="text-center">
          <span id="powerReading" class="text-4xl font-bold text-purple-400">--W</span>
          <div class="mt-2 text-sm text-slate-400">Daily usage: <span id="powerUsage">--</span></div>
        </div>
      </div>
    </div>
  `;
}