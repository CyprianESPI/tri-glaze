import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { IngredientInputComponent } from './ingredient-input/ingredient-input.component';
import { Ingredient } from './models/ingredient';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, IngredientInputComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  ingredients: Ingredient[] = [
    { name: 'Barium carbonate', quantity: 100, unit: 'g' },
    { name: 'Barium carbonate', quantity: 100, unit: 'g' },
    { name: 'Barium carbonate', quantity: 100, unit: 'g' },
  ];
}
