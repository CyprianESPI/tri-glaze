import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Ingredient } from '../models/ingredient';

@Component({
  selector: 'app-ingredient-input',
  standalone: true,
  imports: [CommonModule],
  template: `<p>{{ ingredient().name }}</p>
    <p>{{ ingredient().quantity }}</p>
    <p>{{ ingredient().unit }}</p>`,
  styleUrl: './ingredient-input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IngredientInputComponent {
  ingredient = input.required<Ingredient>();
}
