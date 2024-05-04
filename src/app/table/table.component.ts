import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Ingredient } from '../models/ingredient';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  template: `<table
    mat-table
    [dataSource]="ingredients"
    class="mat-elevation-z8"
  >
    <!-- 1st Column -->
    <ng-container matColumnDef="1">
      <th mat-header-cell *matHeaderCellDef>Name</th>
      <td mat-cell *matCellDef="let element">{{ element.name }}</td>
    </ng-container>

    <ng-container matColumnDef="2">
      <th mat-header-cell *matHeaderCellDef>Quantity</th>
      <td mat-cell *matCellDef="let element">
        {{ element.quantity + ' ' + element.unit }}
      </td>
    </ng-container>

    <!-- Table generation  -->
    <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
    <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
  </table>`,
  styleUrl: './table.component.scss',
})
export class TableComponent implements OnInit {
  ngOnInit(): void {
    console.log(this.ingredients);
  }
  @Input()
  ingredients: Ingredient[] = [];
  displayedColumns: string[] = ['1', '2'];
}
