import { Routes } from '@angular/router';
import { HomeComponent } from './home';
import { About } from './about';
import { NoContent } from './no-content';

import {RecipesNewComponent} from "./recipes";
import {RecipesEditComponent} from "./recipes/recipe-edit.component";
import {RecipesByCategoryComponent} from "./recipes/recipes-by-category.component";

export const ROUTES: Routes = [
  { path: '',      component: HomeComponent },
  { path: 'home',  component: HomeComponent },
  { path: 'about', component: About },
  {
    path: 'detail', loadChildren: () => System.import('./+detail')
  },
  { path : 'recipes/new',               component : RecipesNewComponent},
  { path : 'recipes/:key/edit',              component : RecipesEditComponent},
  { path : 'recipes/category/:key',     component : RecipesByCategoryComponent},
  { path: '**',    component: NoContent }
];
