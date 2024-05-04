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

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    IngredientInputComponent,
    GraphComponent,
    TableComponent,
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
  title: string = 'TriGlaze';
  stepsValues: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  constructor(_localStorageService: LocalStorageService) {
    this.data = _localStorageService.db;
  }
}
