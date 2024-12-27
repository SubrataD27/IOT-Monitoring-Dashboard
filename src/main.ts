import './style.css';
import { setupDashboard } from './dashboard';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div class="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
    <header class="glass-card sticky top-0 z-50 px-6 py-4 flex justify-between items-center">
      <div class="flex items-center space-x-4">
        <div class="relative w-10 h-10 animate-float">
          <svg class="w-full h-full text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <div class="absolute -top-1 -right-1 w-3 h-3 bg-indigo-500 rounded-full animate-ping"></div>
        </div>
        <h1 class="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
          IoT Control Center
        </h1>
      </div>
      <div class="flex items-center space-x-6">
        <div class="flex items-center space-x-2">
          <span class="status-indicator offline" id="statusDot"></span>
          <span class="text-sm font-medium text-slate-300" id="connectionStatus">Offline</span>
        </div>
        <button id="bluetoothToggle" 
                class="p-3 rounded-full bg-slate-800 hover:bg-slate-700 transition-all duration-300
                       border border-slate-700 hover:border-indigo-500">
          <span class="text-2xl">📡</span>
        </button>
      </div>
    </header>
    
    <main class="container mx-auto px-4 py-8">
      <!-- Device Controls -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <!-- Power Control -->
        <div class="glass-card p-6">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-lg font-semibold text-slate-200">Power Control</h3>
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" id="powerToggle" class="sr-only peer">
              <div class="w-14 h-7 bg-slate-700 peer-focus:outline-none rounded-full peer 
                          peer-checked:after:translate-x-full peer-checked:after:border-white 
                          after:content-[''] after:absolute after:top-[2px] after:left-[2px] 
                          after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all
                          peer-checked:bg-indigo-500"></div>
            </label>
          </div>
        </div>

        <!-- Mode Selection -->
        <div class="glass-card p-6">
          <h3 class="text-lg font-semibold text-slate-200 mb-4">Operation Mode</h3>
          <div class="grid grid-cols-2 gap-3">
            <button class="mode-btn active" data-mode="auto">
              <svg class="w-6 h-6 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                      d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Auto
            </button>
            <button class="mode-btn" data-mode="eco">
              <svg class="w-6 h-6 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                      d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
              Eco
            </button>
          </div>
        </div>

        <!-- Temperature Control -->
        <div class="glass-card p-6">
          <h3 class="text-lg font-semibold text-slate-200 mb-4">Temperature Control</h3>
          <div class="flex items-center justify-between">
            <button class="temp-btn decrease">-</button>
            <span class="text-4xl font-bold text-indigo-400" id="tempValue">22°C</span>
            <button class="temp-btn increase">+</button>
          </div>
          <input type="range" min="16" max="30" value="22" 
                 class="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer
                        accent-indigo-500">
        </div>

        <!-- Fan Speed -->
        <div class="glass-card p-6">
          <h3 class="text-lg font-semibold text-slate-200 mb-4">Fan Speed</h3>
          <div class="space-y-2">
            <button class="fan-speed-btn active" data-speed="auto">Auto</button>
            <button class="fan-speed-btn" data-speed="low">Low</button>
            <button class="fan-speed-btn" data-speed="medium">Medium</button>
            <button class="fan-speed-btn" data-speed="high">High</button>
          </div>
        </div>
      </div>
    </main>
  </div>
`;

setupDashboard();