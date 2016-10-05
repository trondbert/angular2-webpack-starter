import { Component } from '@angular/core';
import {Recipe} from "./recipe";
import {GenericComponent} from "../generic.component";
import {OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router"
import {Location} from "@angular/common";
import {RecipeService} from "./recipe.service";
import {StaticData} from "../static.data";

@Component({
    selector: 'recipes',
    templateUrl: '../layout/recipes.template.html',
    styleUrls: ['../layout/app.style.css', '../layout/recipes.style.css']
})
export class RecipesListComponent extends GenericComponent implements OnInit {

    private recipeService: RecipeService;
    protected recipes = [];

    protected recipesMap:{[key:string]:Recipe;} = {};
    protected placeholderImage;

    constructor(recipeService:RecipeService,
                private route:ActivatedRoute,
                private router:Router,
                private location:Location) {
        super();
        this.recipeService = recipeService;
    }

    ngOnInit() {
        super.ngOnInit();
        var thisComp = this;
        thisComp.recipes = [];
        thisComp.getRecipeService().retrieveAll(function(recipe) {
            console.log("DEBUG Callback RecByCat " + recipe);
            thisComp.recipes.push(recipe);
            thisComp.recipesMap[recipe.key] = recipe;
        });
        
        window['recipes'] = thisComp.recipes;
        this.placeholderImage = StaticData.placeholderImage;
    }

    getRecipeService() {
        return this.recipeService;
    }

    getLocation() : Location {
        return this.location;
    }

    getRouter() {
        return this.router;
    }

    getRoute() {
        return this.route;
    }
}
