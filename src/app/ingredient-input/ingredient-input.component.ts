import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Ingredient } from '../models/ingredient';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-ingredient-input',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
  ],
  template: `
    <section class="summary-container">
      <h3>{{ ingredient().name }}</h3>
      <p>{{ ingredient().quantity + ' ' + ingredient().unit }}</p>
    </section>
    <section class="edit-container">
      <mat-form-field subscriptSizing="dynamic">
        <mat-label>Name</mat-label>
        <input matInput type="text" [(ngModel)]="ingredient().name" />
        @if (ingredient().name) {
        <button
          matSuffix
          mat-icon-button
          aria-label="Clear"
          (click)="ingredient().name = ''"
        >
          <mat-icon>close</mat-icon>
        </button>
        }
      </mat-form-field>
      <mat-form-field subscriptSizing="dynamic">
        <mat-label>Quantity</mat-label>
        <input matInput type="number" [(ngModel)]="ingredient().quantity" />
        @if (ingredient().quantity) {
        <button
          matSuffix
          mat-icon-button
          aria-label="Clear"
          (click)="ingredient().quantity = 0"
        >
          <mat-icon>close</mat-icon>
        </button>
        }
      </mat-form-field>
      <mat-form-field subscriptSizing="dynamic">
        <mat-label>Unit</mat-label>
        <input matInput type="text" [(ngModel)]="ingredient().unit" />
        @if (ingredient().unit) {
        <button
          matSuffix
          mat-icon-button
          aria-label="Clear"
          (click)="ingredient().unit = ''"
        >
          <mat-icon>close</mat-icon>
        </button>
        }
      </mat-form-field>
    </section>
  `,
  styleUrl: './ingredient-input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IngredientInputComponent {
  ingredient = input.required<Ingredient>();
}
