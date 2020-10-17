import {Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {Ingredient} from "../../models/ingredient.model";
import {ShoppingListService} from "../../services/shopping.list.service";
import {NgForm} from "@angular/forms";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  @ViewChild('f') form: NgForm;
  subscription: Subscription;
  ingredient: Ingredient;
  index: number;
  editMode: boolean = false;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
    this.subscription = this.shoppingListService.editIngredient
      .subscribe((index: number) => {
        this.ingredient = this.shoppingListService.getIngredient(index);
        this.editMode = true;
        this.index = index;
        this.form.setValue({
          nameInput: this.ingredient.name,
          amountInput: this.ingredient.amount
        })
      })
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  submit(formIn: NgForm) {
    const value = formIn.value
    const ingredient = new Ingredient(value.nameInput, +value.amountInput);

    if(this.editMode){
      this.shoppingListService.updateIngredient(this.index, ingredient);
      return;
    }
    this.shoppingListService.addToShoppingList(ingredient);
    this.clear();
  }

  deleteItem() {
    this.shoppingListService.deleteItem(this.index);
    this.clear();
  }

  clear() {
    this.editMode =false;
    this.form.reset();
  }
}
