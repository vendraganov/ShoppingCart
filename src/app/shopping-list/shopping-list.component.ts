import {Component, OnDestroy, OnInit} from '@angular/core';
import {Ingredient} from "../models/ingredient.model";
import {ShoppingListService} from "../services/shopping.list.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredientsSubs: Subscription;
  ingredients: Ingredient[];

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngredients();
    this.ingredientsSubs = this.shoppingListService.ingredientsChanged.subscribe( (newIngredients: Ingredient[]) => {
      this.ingredients = newIngredients;
    } )
  }

  ngOnDestroy(): void {
    this.ingredientsSubs.unsubscribe();
  }

  onEditItem(index: number) {
     this.shoppingListService.editIngredient.next(index);
  }
}
