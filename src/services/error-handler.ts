export class ErrorHandler {
  private static logError(error: Error, context: string) {
    console.error(`[${new Date().toISOString()}] ${context}:`, error);
    // In production, send to error tracking service
  }

  static handleConnectionError(error: Error) {
    this.logError(error, 'Connection');
    return {
      type: 'connection_error',
      message: 'Failed to connect to device. Please try again.',
      retry: true
    };
  }

  static handleDataError(error: Error) {
    this.logError(error, 'Data');
    return {
      type: 'data_error',
      message: 'Error receiving sensor data.',
      retry: false
    };
  }
}