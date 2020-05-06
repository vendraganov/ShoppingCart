import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RecipesComponent} from "./recipes/recipes.component";
import {ShoppingListComponent} from "./shopping-list/shopping-list.component";
import {NotFoundComponent} from "./not-found/not-found.component";
import {ShoppingEditComponent} from "./shopping-list/shopping-edit/shopping-edit.component";
import {RecipeMessageComponent} from "./recipes/recipe-message/recipe-message.component";
import {RecipeDetailComponent} from "./recipes/recipe-detail/recipe.detail.component";
import {RecipeEditComponent} from "./recipes/recipe-edit/recipe-edit.component";


const routes: Routes = [
  {path: '', redirectTo: '/recipes', pathMatch: 'full'},
  {path: 'recipes', component: RecipesComponent, children: [
      {path: '', component: RecipeMessageComponent },
      {path: 'new', component: RecipeEditComponent },
      {path: ':id', component: RecipeDetailComponent },
      {path: ':id/edit', component: RecipeEditComponent },
    ]},
  {path: 'shopping-list', component: ShoppingListComponent, children: [
      {path: ':id', component: ShoppingEditComponent }
    ]},
  {path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
