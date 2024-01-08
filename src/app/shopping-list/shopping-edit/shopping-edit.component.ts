import { Component, OnDestroy, OnInit } from '@angular/core';
import { ShoppingListService } from '../shopping-list.service';
import { Ingredients } from '../../shared/ingredient.model';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrl: './shopping-edit.component.css',
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  ingredientForm: FormGroup;
  startedEditingSub!: Subscription;
  editMode = false;

  constructor(
    private shoppingService: ShoppingListService,
    private formBuilder: FormBuilder
  ) {
    this.ingredientForm = this.formBuilder.group({
      ingredientName: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
      ]),
      ingredientAmount: new FormControl(null, [
        Validators.required,
        Validators.min(1),
      ]),
    });
  }

  ngOnInit(): void {
    this.startedEditingSub = this.shoppingService.startedEditing.subscribe(
      (index: number) => {
        this.editMode = true;
        const ingredient = this.shoppingService.getIngredient(index);
        this.ingredientForm.get('ingredientName')!.setValue(ingredient.name);
        this.ingredientForm
          .get('ingredientAmount')!
          .setValue(ingredient.amount);
      }
    );
  }

  ngOnDestroy(): void {
    this.startedEditingSub.unsubscribe();
  }

  onAddItem() {
    if (!this.ingredientForm.valid) {
      return;
    }
    const { ingredientName: ingredientName, ingredientAmount } =
      this.ingredientForm.value;
    const newIngredient = new Ingredients(ingredientName, ingredientAmount);
    this.shoppingService.addIngredient(newIngredient);
    this.onClearItem();
  }

  onDeleteItem() {
    this.shoppingService.removeIngredient(
      this.ingredientForm.value.ingredientName
    );
    this.onClearItem();
  }

  onClearItem() {
    this.ingredientForm.reset();
    this.editMode = false;
  }
}
