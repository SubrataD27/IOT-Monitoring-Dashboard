import { io } from 'socket.io-client';

export function setupWebSocket() {
  const socket = io('wss://demo.websocket.server', {
    reconnectionAttempts: 5,
    timeout: 10000,
  });

  socket.on('connect', () => {
    console.log('WebSocket Connected');
  });

  socket.on('disconnect', () => {
    console.log('WebSocket Disconnected');
  });

  return socket;
}