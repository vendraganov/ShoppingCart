import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Ingredient} from "../../models/ingredient.model";
import {ShoppingListService} from "../../services/shopping.list.service";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
  }

  addItem(nameInput: HTMLInputElement, amountInput: HTMLInputElement) {
    const ingredient = new Ingredient(nameInput.value, +amountInput.value);
    this.shoppingListService.addToShoppingList(ingredient);
  }

  deleteItem() {

  }

  clear() {

  }
}
