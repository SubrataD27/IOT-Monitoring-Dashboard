export interface SensorData {
  temperature: number;
  humidity: number;
  energy: number;
  timestamp: Date;
}

export interface GaugeConfig {
  type: 'doughnut';
  options: {
    responsive: boolean;
    circumference: number;
    rotation: number;
    plugins: {
      legend: {
        display: boolean;
      };
    };
  };
}