import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { Subject, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  constructor(private http: HttpClient, private recipeService: RecipeService) {}

  errorSubscription = new Subject<string>();

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http
      .put(
        'https://angular-api-88726-default-rtdb.europe-west1.firebasedatabase.app/recipes.json',
        recipes
      )
      .subscribe({
        next: () => {},
        error: (error) => {
          this.errorSubscription.next(error.statusText + ' ' + error.status);
        },
      });
  }

  getStoredRecipes() {
    return this.http
      .get<Recipe[]>(
        'https://angular-api-88726-default-rtdb.europe-west1.firebasedatabase.app/recipes.json'
      )
      .pipe(
        map((recipes) =>
          recipes.map((recipe) => ({
            ...recipe,
            ingredients: recipe.ingredients ? recipe.ingredients : [],
          }))
        ),
        tap((recipes) => {
          this.recipeService.setRecipes(recipes);
        })
      );
  }
}
