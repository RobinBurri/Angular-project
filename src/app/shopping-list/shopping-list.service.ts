import { Injectable } from '@angular/core';
import { Ingredients } from '../shared/ingredient.model';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  ingredients: Ingredients[] = [
    new Ingredients('Apples', 5),
    new Ingredients('Tomatos', 3),
  ];
  constructor() {}

  getIngredients() {
    return this.ingredients.slice();
  }

  addIngredient(ingredient: Ingredients) {
    const existingIngredient = this.ingredients.find(
      (ing) => ing.name === ingredient.name
    );
    if (existingIngredient) {
      existingIngredient.amount += ingredient.amount;
    } else {
      this.ingredients.push(ingredient);
    }
  }
}
