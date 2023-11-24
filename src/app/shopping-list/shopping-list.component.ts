import {  Component, OnInit } from '@angular/core';
import { ingredients } from '../shared/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.css',
})
export class ShoppingListComponent implements OnInit { 
  ingredients: ingredients[] = [
    new ingredients('Apples', 5),
    new ingredients('Tomatos', 3)
  ];

  constructor() {}

  ngOnInit() {}
 }
