import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { DataPoint } from '../models/data-point';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-flex-graph',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  template: `
    @for(dataPointRow of dataPointsRows(); track dataPointRow) {
    <section>
      @for(dataPoint of dataPointRow; track dataPoint) {
      <button mat-mini-fab>{{ dataPoint.id }}</button>
      }
    </section>
    }
  `,
  styleUrl: './flex-graph.component.scss',
})
export class FlexGraphComponent {
  dataPointsRows = input.required<[DataPoint[]]>();
}
