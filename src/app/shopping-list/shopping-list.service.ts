import { Injectable } from '@angular/core';
import { Ingredients } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  ingredientsChanged = new Subject<Ingredients[]>();
  startedEditing = new Subject<number>();

  private ingredients: Ingredients[] = [
    new Ingredients('Apples', 5),
    new Ingredients('Tomatoes', 3),
  ];

  getIngredients() {
    return this.ingredients.slice();
  }

  getIngredient(index: number) {
    return this.ingredients[index];
  }

  addIngredient(ingredient: Ingredients) {
    const existingIngredientIndex = this.ingredients.findIndex(
      (ing) => ing.name === ingredient.name
    );

    if (existingIngredientIndex !== -1) {
      this.ingredients[existingIngredientIndex].amount += ingredient.amount;
    } else {
      this.ingredients.push(ingredient);
    }
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  removeIngredient(ingredientName: string) {
    const existingIngredientIndex = this.ingredients.findIndex(
      (ing) => ing.name === ingredientName
    );
    if (existingIngredientIndex !== -1) {
      this.ingredients.splice(existingIngredientIndex, 1);
      this.ingredientsChanged.next(this.ingredients.slice());
    }
  }
}
