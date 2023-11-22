import { Component } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrl: './recipes-list.component.css',
})
export class RecipesListComponent {
  recipes: Recipe[] = [
    new Recipe("A Test Recipe", "This is a simple test", "https://img.freepik.com/free-photo/pizza-pizza-filled-with-tomatoes-salami-olives_140725-1200.jpg?w=2000&t=st=1700655637~exp=1700656237~hmac=87ba60ae9bc2cbd0e94e144399486709d5ec375d59b5de68e42b0aaf1a269243")
  ];

  constructor() {};
 }
