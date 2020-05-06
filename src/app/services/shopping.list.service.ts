import {EventEmitter, Injectable} from "@angular/core";
import {Ingredient} from "../models/ingredient.model";
import {Subject} from "rxjs";

@Injectable()
export class ShoppingListService{

  ingredientsChanged: Subject<Ingredient[]> = new Subject<Ingredient[]>();

  private ingredients: Ingredient[] = [
    new Ingredient('Beef', 1),
    new Ingredient('Potatoes', 5)
  ];

  getIngredients() {
    return this.ingredients.slice();
  }

  addToShoppingList(...ingredientsIn: Ingredient[]) {
    this.ingredients.push(...ingredientsIn);
    this.ingredientsChanged.next(this.ingredients.slice())
  }

  deleteItem(ingredientInput: Ingredient) {
    this.ingredients.filter(ingredient => ingredient !== ingredientInput);
  }
}
