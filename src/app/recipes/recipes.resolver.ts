import { inject } from '@angular/core';
import type { ResolveFn } from '@angular/router';
import { DataStorageService } from '../shared/data-storage.service';
import { RecipeService } from './recipe.service';
import { Recipe } from './recipe.model';
import { Observable } from 'rxjs';

export const recipesResolver: ResolveFn<Recipe[] | Observable<Recipe[]>> = (
  route,
  state
) => {
  const dataStorageService = inject(DataStorageService);
  const recipeService = inject(RecipeService);
  const recipes = recipeService.getRecipes();
  if (recipes.length === 0) {
    return dataStorageService.getStoredRecipes();
  } else {
    return recipes;
  }
};
