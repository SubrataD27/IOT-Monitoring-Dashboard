export class DataValidator {
  static validateTemperature(value: number): boolean {
    return value >= -50 && value <= 100;
  }

  static validateHumidity(value: number): boolean {
    return value >= 0 && value <= 100;
  }

  static validatePower(value: number): boolean {
    return value >= 0 && value <= 5000;
  }

  static sanitizeReading(value: number, min: number, max: number): number {
    return Math.max(min, Math.min(max, value));
  }
}