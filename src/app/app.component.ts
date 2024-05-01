import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { IngredientInputComponent } from './ingredient-input/ingredient-input.component';
import { Ingredient } from './models/ingredient';
import { MatToolbarModule } from '@angular/material/toolbar';
import { GraphComponent } from './graph/graph.component';
import { MatTabsModule } from '@angular/material/tabs';
import { TableComponent } from './table/table.component';

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
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  ingredients: Ingredient[] = [
    { name: 'Barium carbonate', quantity: 100, unit: 'g' },
    { name: 'Red Iron Oxide', quantity: 50, unit: 'g' },
    { name: 'Zircopax ', quantity: 750, unit: 'mg' },
  ];
  title: string = 'TriGlaze';
}
