import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredients } from '../shared/ingredient.model';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  recipes: Recipe[] = [
    new Recipe(
      'A Test Recipe',
      'This is a simple test',
      'https://cdn.intra.42.fr/users/fa213c2aa1c849f4630b4d94e48c3b5c/rburri.jpg',
      [new Ingredients('Potato', 3), new Ingredients('Tomatos', 2)]
    ),
    new Recipe(
      'An other Recipe',
      'This is another test',
      'https://cdn.intra.42.fr/users/fa213c2aa1c849f4630b4d94e48c3b5c/rburri.jpg',
      [new Ingredients('Coco', 3), new Ingredients('Sweet Potato', 2)]
    ),
  ];

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipesById(id: number) {
    return this.recipes[id];
  }
}
