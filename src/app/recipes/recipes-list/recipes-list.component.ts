import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrl: './recipes-list.component.css',
})
export class RecipesListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe(
      'A Test Recipe',
      'This is a simple test',
      'https://cdn.intra.42.fr/users/fa213c2aa1c849f4630b4d94e48c3b5c/rburri.jpg'
    ),
    new Recipe(
      "An other Recipe",
       "This is another test",
      "https://cdn.intra.42.fr/users/fa213c2aa1c849f4630b4d94e48c3b5c/rburri.jpg"
      
    )
  ];

  constructor() {}

  ngOnInit(): void {}
}

