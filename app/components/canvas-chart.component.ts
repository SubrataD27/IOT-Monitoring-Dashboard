import { Component } from '@nativescript/core';

@Component({
  selector: 'CanvasChart',
  template: `
    <GridLayout>
      <ContentView>
        <!-- Basic circular gauge implementation -->
        <Label [text]="data + units" 
               class="text-2xl font-bold text-center" />
      </ContentView>
    </GridLayout>
  `
})
export class CanvasChartComponent {
  public data: number = 0;
  public min: number = 0;
  public max: number = 100;
  public units: string = '';
}