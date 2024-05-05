import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { DataPoint } from '../models/data-point';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-flex-graph',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatTooltipModule],
  template: `
    @for(dataPointRow of dataPointsRows(); track dataPointRow) {
    <section>
      @for(dataPoint of dataPointRow; track dataPoint) {
      <button
        mat-mini-fab
        [matTooltip]="getToolTip(dataPoint)"
        matTooltipClass="custom-tooltip"
        matTooltipPosition="above"
      >
        {{ dataPoint.id }}
      </button>
      }
    </section>
    }
  `,
  styleUrl: './flex-graph.component.scss',
})
export class FlexGraphComponent {
  dataPointsRows = input.required<[DataPoint[]]>();

  getToolTip(dataPoint: DataPoint): string {
    const ingredientsTexts: string[] = dataPoint.ingredients.map(
      (e) => `${e.quantity}${e.unit} ${e.name}`
    );
    return `Recipy N°${dataPoint.id}:\n` + ingredientsTexts.join('\n');
  }
}
