import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";

import {RecipesComponent} from "./recipes.component";
import {AuthGuard} from "../auth/auth.guard";
import {RecipeMessageComponent} from "./recipe-message/recipe-message.component";
import {RecipeEditComponent} from "./recipe-edit/recipe-edit.component";
import {CanDeactivateGuard} from "../services/can-deactivate-guard";
import {RecipeDetailComponent} from "./recipe-detail/recipe.detail.component";
import {RecipeResolver} from "./recipe.resolver";

const routes: Routes = [
  {path: '', component: RecipesComponent, canActivate: [AuthGuard], children: [
      {path: '', component: RecipeMessageComponent },
      {path: 'new', component: RecipeEditComponent, canDeactivate: [CanDeactivateGuard] },
      {path: ':id', component: RecipeDetailComponent, resolve: [RecipeResolver] },
      {path: ':id/edit', component: RecipeEditComponent, resolve: [RecipeResolver], canDeactivate: [CanDeactivateGuard] },
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecipesRoutingModule {
}
