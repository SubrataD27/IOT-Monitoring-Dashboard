export function createDeviceControls() {
  return `
    <div class="glass-card p-6 rounded-xl mb-6">
      <div class="flex items-center justify-between mb-6">
        <h3 class="text-lg font-semibold text-slate-200">Device Controls</h3>
        <div class="flex items-center space-x-2">
          <span class="text-xs text-slate-400">Auto Mode</span>
          <label class="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" id="autoMode" class="sr-only peer">
            <div class="w-11 h-6 bg-slate-700 rounded-full peer peer-checked:after:translate-x-full 
                        peer-checked:bg-indigo-500 after:content-[''] after:absolute after:top-0.5 
                        after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 
                        after:transition-all"></div>
          </label>
        </div>
      </div>
      
      <div class="space-y-6">
        <!-- Temperature Control -->
        <div class="relative">
          <label class="text-sm text-slate-400">Temperature</label>
          <div class="mt-2 flex items-center">
            <input type="range" min="16" max="30" value="22" step="0.5"
                   class="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer
                          accent-indigo-500" id="tempControl">
            <span class="ml-4 min-w-[4rem] text-right text-lg font-medium text-slate-200" 
                  id="tempValue">22°C</span>
          </div>
        </div>

        <!-- Fan Speed -->
        <div>
          <label class="text-sm text-slate-400">Fan Speed</label>
          <div class="mt-2 grid grid-cols-4 gap-2">
            <button class="control-btn active" data-speed="auto">Auto</button>
            <button class="control-btn" data-speed="low">Low</button>
            <button class="control-btn" data-speed="med">Med</button>
            <button class="control-btn" data-speed="high">High</button>
          </div>
        </div>

        <!-- Mode Selection -->
        <div>
          <label class="text-sm text-slate-400">Operation Mode</label>
          <div class="mt-2 grid grid-cols-3 gap-2">
            <button class="control-btn active" data-mode="normal">
              <span class="block text-xs">Normal</span>
            </button>
            <button class="control-btn" data-mode="eco">
              <span class="block text-xs">Eco</span>
            </button>
            <button class="control-btn" data-mode="boost">
              <span class="block text-xs">Boost</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
}