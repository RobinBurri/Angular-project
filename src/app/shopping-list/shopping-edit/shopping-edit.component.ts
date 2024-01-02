import { Component } from '@angular/core';
import { ShoppingListService } from '../shopping-list.service';
import { Ingredients } from '../../shared/ingredient.model';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrl: './shopping-edit.component.css',
})
export class ShoppingEditComponent {
  ingerdientForm: FormGroup;

  constructor(
    private shoppingService: ShoppingListService,
    private formBuilder: FormBuilder
  ) {
    this.ingerdientForm = this.formBuilder.group({
      ingerdientName: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
      ]),
      ingredientAmount: new FormControl(null, [
        Validators.required,
        Validators.min(1),
      ]),
    });
  }

  onAddItem() {
    if (!this.ingerdientForm.valid) {
      return;
    }
    const { ingerdientName, ingredientAmount } = this.ingerdientForm.value;
    const newIngredient = new Ingredients(ingerdientName, ingredientAmount);
    this.shoppingService.addIngredient(newIngredient);
  }
  onDeleteItem() {}
  onClearItem() {
    this.ingerdientForm.get('ingerdientName').setValue('');
    this.ingerdientForm.get('ingredientAmount').setValue('');
  }
}
