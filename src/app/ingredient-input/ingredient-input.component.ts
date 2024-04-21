import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-ingredient-input',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `<p>ingredient-input works!</p>`,
  styleUrl: './ingredient-input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IngredientInputComponent { }
