import { Component } from '@nativescript/core';

@Component({
  selector: 'Gauge',
  template: `
    <GridLayout rows="auto, *" class="gauge-container">
      <Label row="0" [text]="title" class="gauge-title" />
      <CanvasChart row="1" 
        [data]="value" 
        [min]="minValue" 
        [max]="maxValue"
        [units]="units" />
    </GridLayout>
  `
})
export class GaugeComponent {
  public title: string = '';
  public value: number = 0;
  public minValue: number = 0;
  public maxValue: number = 100;
  public units: string = '';
}