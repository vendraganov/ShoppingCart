import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Recipe} from "../models/recipe.model";
import {Observable} from "rxjs";
import {FirebaseService} from "../services/firebase.service";
import {RecipeService} from "../services/recepi.service";

@Injectable({providedIn: "root"})
export class RecipeResolver implements Resolve<Recipe[]>{

  constructor(private firebaseService: FirebaseService, private recipeService: RecipeService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Recipe[]> | Promise<Recipe[]> | Recipe[] {
    const recipes = this.recipeService.getRecipes();
    if(recipes.length === 0) {
      return this.firebaseService.getRecipes();
    }
    return recipes;
  }

}
