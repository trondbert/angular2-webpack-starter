import { Routes } from '@angular/router';
import { NoContent } from './no-content';

import {RecipesNewComponent} from "./recipes";
import {RecipesEditComponent} from "./recipes/recipe-edit.component";
import {RecipesByCategoryComponent} from "./recipes/recipes-by-category.component";
import {RecipeViewComponent} from "./recipes/recipe-view.component";
import {RecipesListComponent} from "./recipes/recipes-list.component";
import {BeveragesListComponent} from "./beverages/beverages-list.component";
import {BeverageViewComponent} from "./beverages/beverage-view.component";
import {BeverageEditComponent} from "./beverages/beverage-edit.component";

export const ROUTES: Routes = [
  { path : '', pathMatch: 'full',       redirectTo: '/recipes/category/middag'},
  { path : 'recipes',                   component : RecipesListComponent},
  { path : 'recipes/new',               component : RecipesNewComponent},
  { path : 'recipes/:key/edit',         component : RecipesEditComponent},
  { path : 'recipes/:key',              component : RecipeViewComponent},
  { path : 'recipes/category/:key',     component : RecipesByCategoryComponent},
  { path : 'beverages',                 component : BeveragesListComponent},
  { path : 'beverages/:key',            component : BeverageViewComponent},
  { path : 'beverages/:key/edit',       component : BeverageEditComponent},
  { path: '**',    component: NoContent }
];
