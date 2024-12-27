import { DataValidator } from './data-validator';
import { DataPersistence } from './data-persistence';
import { ErrorHandler } from './error-handler';

export class DataProcessor {
  static processTemperature(rawValue: number): number {
    try {
      if (!DataValidator.validateTemperature(rawValue)) {
        throw new Error('Invalid temperature reading');
      }
      return DataValidator.sanitizeReading(rawValue, -50, 100);
    } catch (error) {
      ErrorHandler.handleDataError(error as Error);
      return 0;
    }
  }

  static processHumidity(rawValue: number): number {
    try {
      if (!DataValidator.validateHumidity(rawValue)) {
        throw new Error('Invalid humidity reading');
      }
      return DataValidator.sanitizeReading(rawValue, 0, 100);
    } catch (error) {
      ErrorHandler.handleDataError(error as Error);
      return 0;
    }
  }

  static processPower(rawValue: number): number {
    try {
      if (!DataValidator.validatePower(rawValue)) {
        throw new Error('Invalid power reading');
      }
      return DataValidator.sanitizeReading(rawValue, 0, 5000);
    } catch (error) {
      ErrorHandler.handleDataError(error as Error);
      return 0;
    }
  }

  static saveProcessedData(data: any) {
    const processedData = {
      temperature: this.processTemperature(data.temperature),
      humidity: this.processHumidity(data.humidity),
      power: this.processPower(data.power),
      timestamp: new Date()
    };
    
    DataPersistence.saveSensorData(processedData);
    return processedData;
  }
}