import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Db } from '../models/db';
import { Ingredient } from '../models/ingredient';

interface DataPoint {
  id: number;
  ingredients: Ingredient[];
}

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  template: `<table
    mat-table
    [dataSource]="getDataPoints()"
    class="mat-elevation-z8"
  >
    <!-- 1st Column -->
    <ng-container [matColumnDef]="getDisplayedColumns()[0]">
      <th mat-header-cell *matHeaderCellDef>N°</th>
      <td mat-cell *matCellDef="let element">{{ element.id }}</td>
    </ng-container>

    <ng-container [matColumnDef]="getDisplayedColumns()[1]">
      <th mat-header-cell *matHeaderCellDef>
        {{ data().ingredients[0].name }}
      </th>
      <td mat-cell *matCellDef="let element">
        {{ element.quantity + ' ' + element.unit }}
      </td>
    </ng-container>

    <ng-container [matColumnDef]="getDisplayedColumns()[2]">
      <th mat-header-cell *matHeaderCellDef>
        {{ data().ingredients[1].name }}
      </th>
      <td mat-cell *matCellDef="let element">
        {{ element.quantity + ' ' + element.unit }}
      </td>
    </ng-container>

    <ng-container [matColumnDef]="getDisplayedColumns()[3]">
      <th mat-header-cell *matHeaderCellDef>
        {{ data().ingredients[2].name }}
      </th>
      <td mat-cell *matCellDef="let element">
        {{ element.quantity + ' ' + element.unit }}
      </td>
    </ng-container>

    <!-- Table generation  -->
    <tr mat-header-row *matHeaderRowDef="getDisplayedColumns()"></tr>
    <tr mat-row *matRowDef="let row; columns: getDisplayedColumns()"></tr>
  </table>`,
  styleUrl: './table.component.scss',
})
export class TableComponent {
  data = input.required<Db>();
  displayedColumns: string[] = ['1', '2'];

  getDisplayedColumns(): string[] {
    if (!this.data) return ['Id'];

    const res: string[] = ['Id'];
    const ingredients = this.data().ingredients;
    ingredients.forEach((ingredient) => {
      res.push(ingredient.name);
    });

    return res;
  }

  getDataPoints(): DataPoint[] {
    if (!this.data) return [];

    const steps = this.data().steps;
    const ingredients = this.data().ingredients;
    const res: DataPoint[] = [];

    for (let i = 0; i < steps + 1; i++) {
      for (let j = 0; j < i + 1; j++) {
        const prevId = res?.at(-1)?.id ?? 0;
        const datapoint: DataPoint = {
          id: prevId + 1,
          ingredients: ingredients,
        };
        res.push(datapoint);
      }
    }

    return res;
  }
}
