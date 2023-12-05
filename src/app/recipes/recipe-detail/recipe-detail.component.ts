import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ShoppingListService } from '../../shopping-list/shopping-list.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.css',
})
export class RecipeDetailComponent {
  @Input() recipe: Recipe;


  constructor(private shoppingService: ShoppingListService) {}
  addToShopList() {
    for (let ingredient of this.recipe.ingredients) {
      this.shoppingService.addIngredient(ingredient);
    }
  }
}
