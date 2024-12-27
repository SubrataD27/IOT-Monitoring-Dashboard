export function createConnectionStatus() {
  return `
    <div class="fixed bottom-4 left-4 right-4 glass-card p-4 rounded-2xl transform transition-all duration-300 z-50"
         id="connectionStatus">
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-3">
          <div class="connection-indicator"></div>
          <div>
            <p class="text-sm font-medium text-slate-200" id="statusText">Disconnected</p>
            <p class="text-xs text-slate-400" id="deviceName">No device connected</p>
          </div>
        </div>
        <button id="connectBtn" 
                class="px-4 py-2 bg-indigo-500 text-white rounded-lg text-sm font-medium
                       hover:bg-indigo-600 transition-colors duration-300">
          Connect
        </button>
      </div>
    </div>
  `;
}