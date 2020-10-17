import {Component, OnDestroy, OnInit} from "@angular/core";
import {Recipe} from "../../models/recipe.model";
import {RecipeService} from "../../services/recepi.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe.list.component.html',
  styleUrls: ['./recipe.list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy{

  recipes: Recipe[];
  recipeSub: Subscription;

  constructor(private recipeService: RecipeService, private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(){
    this.recipes = this.recipeService.getRecipes();
    this.recipeSub = this.recipeService.recipeChanged.subscribe(
      (recipes: Recipe[]) => {
        this.recipes = recipes;
      }
    );
  }
  ngOnDestroy(): void {
    this.recipeSub.unsubscribe();
  }

  newRecipe() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }
}
