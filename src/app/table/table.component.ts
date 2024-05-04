import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { DataPoint } from '../models/data-point';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  template: `<table
    mat-table
    [dataSource]="dataPoints()"
    class="mat-elevation-z8"
  >
    <!-- 1st Column -->
    <ng-container [matColumnDef]="getDisplayedColumns()[0]">
      <th mat-header-cell *matHeaderCellDef>N°</th>
      <td mat-cell *matCellDef="let element">{{ element.id }}</td>
    </ng-container>

    <ng-container [matColumnDef]="getDisplayedColumns()[1]">
      <th mat-header-cell *matHeaderCellDef>
        {{ getDisplayedColumns()[1] }}
      </th>
      <td mat-cell *matCellDef="let element">
        {{
          (element.ingredients?.at(0).quantity ?? '') +
            ' ' +
            (element.ingredients?.at(0).unit ?? '')
        }}
      </td>
    </ng-container>

    <ng-container [matColumnDef]="getDisplayedColumns()[2]">
      <th mat-header-cell *matHeaderCellDef>
        {{ getDisplayedColumns()[2] }}
      </th>
      <td mat-cell *matCellDef="let element">
        {{
          (element.ingredients?.at(1).quantity ?? '') +
            ' ' +
            (element.ingredients?.at(1).unit ?? '')
        }}
      </td>
    </ng-container>

    <ng-container [matColumnDef]="getDisplayedColumns()[3]">
      <th mat-header-cell *matHeaderCellDef>
        {{ getDisplayedColumns()[3] }}
      </th>
      <td mat-cell *matCellDef="let element">
        {{
          (element.ingredients?.at(2).quantity ?? '') +
            ' ' +
            (element.ingredients?.at(2).unit ?? '')
        }}
      </td>
    </ng-container>

    <!-- Table generation  -->
    <tr
      mat-header-row
      *matHeaderRowDef="getDisplayedColumns(); sticky: true"
    ></tr>
    <tr mat-row *matRowDef="let row; columns: getDisplayedColumns()"></tr>
  </table>`,
  styleUrl: './table.component.scss',
})
export class TableComponent {
  dataPoints = input.required<DataPoint[]>();

  getDisplayedColumns(): string[] {
    if (!this.dataPoints) return ['Id'];

    const res: string[] = ['Id'];
    const ingredients = this.dataPoints().at(0)?.ingredients ?? [];
    ingredients.forEach((ingredient) => {
      res.push(ingredient.name);
    });

    return res;
  }
}
