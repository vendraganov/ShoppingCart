import {Component, Input, OnInit} from "@angular/core";
import {Recipe} from "../../models/recipe.model";
import {ShoppingListService} from "../../services/shopping.list.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {RecipeService} from "../../services/recepi.service";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe.detail.component.html',
  styleUrls: ['./recipe.detail.component.css']
})
export class RecipeDetailComponent implements OnInit{

  recipe: Recipe;
  index: number;

  constructor(private shoppingListService: ShoppingListService,
              private recipeService: RecipeService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.index = +params.id;
      this.recipe = this.recipeService.getRecipe(this.index);
    });
  }

  addToShoppingList() {
      this.shoppingListService.addToShoppingList(...this.recipe.ingredients);
  }

  editRecipe() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }
}
