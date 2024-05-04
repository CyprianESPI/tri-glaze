import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { IngredientInputComponent } from './ingredient-input/ingredient-input.component';
import { Ingredient } from './models/ingredient';
import { MatToolbarModule } from '@angular/material/toolbar';
import { GraphComponent } from './graph/graph.component';
import { MatTabsModule } from '@angular/material/tabs';
import { TableComponent } from './table/table.component';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LocalStorageService } from './services/local-storage.service';
import { Db } from './models/db';
import { DataPoint } from './models/data-point';
import { FlexGraphComponent } from './flex-graph/flex-graph.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    IngredientInputComponent,
    GraphComponent,
    TableComponent,
    FlexGraphComponent,
    MatToolbarModule,
    MatTabsModule,
    MatFormFieldModule,
    MatSelectModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  data: Db;
  dataPoints: DataPoint[] = [];
  dataPointsRows: [DataPoint[]] = [[]];
  prevData: string = '';
  stepsValues: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  title: string = 'TriGlaze';

  constructor(_localStorageService: LocalStorageService) {
    this.data = _localStorageService.db;
    this.updateDataPoints();
    setInterval(() => {
      if (JSON.stringify(this.data) === this.prevData) return;
      this.updateDataPoints();
    }, 1000 / 42);
  }

  getDataPoints(data: Db): DataPoint[] {
    if (!data) return [];

    const steps = data.steps;
    const ingredients = data.ingredients;
    const res: DataPoint[] = [];

    for (let i = 0; i < steps + 1; i++) {
      for (let j = 0; j < i + 1; j++) {
        const prevId = res?.at(-1)?.id ?? 0;

        const percentageA = (100 * (steps - i)) / steps;
        const ingredientA: Ingredient = {
          ...ingredients[0],
          quantity: Math.floor((percentageA / 100) * ingredients[0].quantity),
        };

        const remainingPercentageAB = 100 - percentageA;
        const percentageB =
          i === 0 ? 0 : (((100 * (i - j)) / i) * remainingPercentageAB) / 100;
        const ingredientB: Ingredient = {
          ...ingredients[1],
          quantity: Math.floor((percentageB / 100) * ingredients[1].quantity),
        };

        const percentageC = 100 - percentageB - percentageA;
        const ingredientC: Ingredient = {
          ...ingredients[2],
          quantity: Math.floor((percentageC / 100) * ingredients[2].quantity),
        };

        const datapoint: DataPoint = {
          id: prevId + 1,
          ingredients: [ingredientA, ingredientB, ingredientC],
        };
        res.push(datapoint);
      }
    }

    return res;
  }

  isBreakIndex(dataPointId: number): boolean {
    return [1, 3, 6, 10, 15, 21, 28, 36, 45, 55].some((e) => e === dataPointId);
  }

  updateDataPoints(): void {
    console.info('updateDataPoints', this.data);
    this.prevData = JSON.stringify(this.data);
    this.dataPoints = this.getDataPoints(this.data);
    const dataPointsRows: [DataPoint[]] = [[]];
    let dataPointRow: DataPoint[] = [];
    this.dataPoints.forEach((element) => {
      dataPointRow.push(element);
      if (this.isBreakIndex(element.id)) {
        dataPointsRows.push(dataPointRow);
        dataPointRow = [];
      }
    });
    this.dataPointsRows = dataPointsRows;
  }
}
