import { Application } from '@nativescript/core';
import { GaugeComponent } from './components';
import { CanvasChartComponent } from './components';

// Register custom components
Application.registerElement('Gauge', () => GaugeComponent);
Application.registerElement('CanvasChart', () => CanvasChartComponent);

Application.run({ moduleName: 'app-root' });