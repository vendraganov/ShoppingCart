import {Injectable} from "@angular/core";
import {Recipe} from "../models/recipe.model";
import {HttpClient, HttpParams} from "@angular/common/http";
import {RecipeService} from "./recepi.service";
import {exhaustMap, map, take, tap} from "rxjs/operators";
import {AuthService} from "../auth/auth.service";

@Injectable({providedIn: "root"})
export class FirebaseService{

  private url: string = 'https://shopping-cart-e2f70.firebaseio.com/recipes.json';

  constructor(private http: HttpClient, private recipeService: RecipeService, private authService: AuthService) {
  }

  // put request in firebase override all the data with the new one
  saveRecipes(){
    const recipes = this.recipeService.getRecipes();
    this.http.put(this.url, recipes).subscribe(response=>{
      console.log(response);
    })
  }

  getRecipes(){
    return this.http.get<Recipe[]>(this.url, )
      .pipe(map(recipes=>{
        return recipes.map(recipe=>{
          // checking if recipe has ingredients and if does not we are assigning empty array
          // ... makes a copy of the object and we can assigns new values
          return {...recipe, ingredients: recipe.ingredients? recipe.ingredients : []}
          })
         }),
        tap(recipes=>{
        console.log(recipes);
        this.recipeService.addRecipes(recipes);
      }));
  }
}
