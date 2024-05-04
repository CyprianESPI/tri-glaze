import { Ingredient } from './ingredient';

export interface Db {
  steps: number;
  ingredients: Ingredient[];
}
