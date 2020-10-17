import {EventEmitter, Injectable} from "@angular/core";
import {Ingredient} from "../models/ingredient.model";
import {Subject} from "rxjs";

@Injectable({providedIn: "root"})
export class ShoppingListService{

  ingredientsChanged: Subject<Ingredient[]> = new Subject<Ingredient[]>();
  editIngredient: Subject<number> = new Subject<number>();

  private ingredients: Ingredient[] = [
    new Ingredient('Beef', 1),
    new Ingredient('Potatoes', 5)
  ];

  getIngredients() {
    return this.ingredients.slice();
  }

  getIngredient(index: number): Ingredient {
    return this.ingredients[index];
  }

  updateIngredient(index: number, ingredient: Ingredient ) {
    this.ingredients[index] = ingredient;
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  addToShoppingList(...ingredientsIn: Ingredient[]) {
    this.ingredients.push(...ingredientsIn);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  deleteItem(index: number) {
    this.ingredients.splice(index, 1);
    this.ingredientsChanged.next(this.ingredients.slice());
  }
}
