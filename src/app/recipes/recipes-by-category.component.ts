import { Component } from '@angular/core';
import {RecipesListComponent} from "./recipes-list.component";
import {Router, ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";
import {RecipeService} from "./recipe.service";

@Component({
    selector: 'recipesByCategory',
    templateUrl: '../layout/recipes.template.html',
    styleUrls: ['../layout/app.style.css', '../layout/recipes.style.css']
})
export class RecipesByCategoryComponent extends RecipesListComponent {

    private sub:any;

    constructor(router:Router,
                route:ActivatedRoute,
                location:Location,
                recipeService:RecipeService) {
        super(recipeService, route, router, location);
    }

    ngOnInit() {
        var thisComp = this;
        this.sub = this.getRoute().params.subscribe(params => {
            thisComp.recipes = [];
            thisComp.getRecipeService().getRecipesByCategory(params['key'], function(recipe) {
                thisComp.recipes.push(recipe);
                thisComp.recipesMap[recipe.key] = recipe;
            });
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}