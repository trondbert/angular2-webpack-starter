import { Routes } from '@angular/router';
import { NoContent } from './no-content';

import { RecipesNewComponent, RecipesEditComponent,RecipesByCategoryComponent,RecipeViewComponent,
         RecipesListComponent} from "./recipes";
import { BeveragesListComponent, BeverageViewComponent, BeverageEditComponent} from "./beverages";
import {BeveragesNewComponent} from "./beverages/beverages-new.component";

export const ROUTES: Routes = [
  { path : '', pathMatch: 'full',       redirectTo: '/recipes/category/middag'},
  { path : 'recipes',                   component : RecipesListComponent},
  { path : 'recipes/new',               component : RecipesNewComponent},
  { path : 'recipes/:key/edit',         component : RecipesEditComponent},
  { path : 'recipes/:key',              component : RecipeViewComponent},
  { path : 'recipes/category/:key',     component : RecipesByCategoryComponent},
  { path : 'beverages',                 component : BeveragesListComponent},
  { path : 'beverages/new',             component : BeveragesNewComponent},
  { path : 'beverages/:key',            component : BeverageViewComponent},
  { path : 'beverages/:key/edit',       component : BeverageEditComponent},
  { path: '**',    component: NoContent }
];
