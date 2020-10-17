import {Recipe} from "../models/recipe.model";
import { Injectable } from "@angular/core";
import {Subject} from "rxjs";

@Injectable({providedIn: "root"})
export class RecipeService{
  recipeChanged: Subject<Recipe[]> = new Subject<Recipe[]>();

  private recipes: Recipe[] =[];
   // private recipes: Recipe[] = [
   //   new Recipe('Burger','This is a beef burger', 'Very good',
   //  'https://cdn.pixabay.com/photo/2018/11/30/08/36/burger-3847278_1280.jpg',
   //     [new Ingredient('Beef', 1), new Ingredient('Salad', 1), new Ingredient('Bun', 1)]),
   //   new Recipe('Chicken Wings','Chicken wings with buffalo sauce served with celery, and blue cheese sauce', 'Amazing',
   //     'https://www.lankwaifong.com/uploads/images/Article/LKF-Wings-Hard.jpg',
   //     [new Ingredient('Chicken Wings', 10), new Ingredient('Celery', 1), new Ingredient('Blue Cheese', 1), new Ingredient('Buffalo sauce', 1)]),
   //   new Recipe('French Fries','Crispy french fries with herbs served with house made ketchup', 'Excellent ',
   //     'https://chefjamika.com/wp-content/uploads/maple-sweet-potato-fries-2000x1333.jpg',
   //     [new Ingredient('Potatoes', 3), new Ingredient('Herbs mix', 1), new Ingredient('Ketchup', 1)])
   // ];

   getRecipes(){
     // slice with no arguments returns a copy of the array
     return this.recipes.slice();
   }

  getRecipe(index: number): Recipe {
    return this.recipes[index];
  }

  addRecipe(recipe: Recipe) {
     this.recipes.push(recipe);
    this.updateRecipeArray();
  }

  addRecipes(recipes: Recipe[]) {
     this.recipes = recipes;
     this.updateRecipeArray();
  }

  updateRecipe(recipe: Recipe, index: number) {
    this.recipes[index] = recipe;
    this.updateRecipeArray();
  }

  deleteRecipe(index: number){
     this.recipes.splice(index,1);
     this.updateRecipeArray();
   }

   private updateRecipeArray(){
     this.recipeChanged.next(this.recipes.slice());
   }
}
