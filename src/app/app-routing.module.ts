import { NgModule } from '@angular/core';
import {Routes, RouterModule, PreloadAllModules} from '@angular/router';
import {NotFoundComponent} from "./not-found/not-found.component";

const routes: Routes = [
  {path: '', redirectTo: '/recipes', pathMatch: 'full'},
  //{path: 'recipes', loadChildren: './recipes/recipes.module#RecipesModule'},
  // alternative syntax for loading the child by using import not a string. Better if we rename the file. No errors
  {path: 'recipes', loadChildren: () => import('./recipes/recipes.module').then(module => module.RecipesModule)},
  //{path: 'shopping-list', loadChildren: './shopping-list/shopping-list.module#ShoppingListModule'},
  {path: 'shopping-list', loadChildren: () => import('./shopping-list/shopping-list.module').then(module => module.ShoppingListModule)},
  {path: 'auth', loadChildren: () => import('./auth/auth.module').then(module=> module.AuthModule)},
  {path: '**', component: NotFoundComponent }
];

@NgModule({
  // preloading is additional to lazy loading. the module bundles are preload but smaller size.
  // this way we have everything out of the box
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
