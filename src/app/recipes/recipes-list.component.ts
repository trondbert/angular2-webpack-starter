import {Component, SimpleChange, SimpleChanges, Input} from '@angular/core';
import {Recipe} from "./recipe";
import {GenericComponent} from "../generic.component";
import {OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router"
import {Location} from "@angular/common";
import {RecipeService} from "./recipe.service";
import {AppState} from "../app.service";

@Component({
    selector: 'recipes',
    templateUrl: '../layout/recipes.template.html',
    styleUrls: ['../layout/app.style.css', '../layout/recipes.style.css']
})
export class RecipesListComponent extends GenericComponent implements OnInit {

    private recipeService: RecipeService;
    protected recipes = [];

    protected recipesMap:{[key:string]:Recipe;} = {};

    constructor(recipeService:RecipeService,
                private route:ActivatedRoute,
                private router:Router,
                private location:Location,
                private appState:AppState) {
        super();
        this.recipeService = recipeService;
    }

    ngOnInit() {
        super.ngOnInit();
    }

    ngOnDestroy() {

    }

    getAppState(): AppState {
        return this.appState;
    }

    onUserChanged(newUser:string) {
        if (newUser != null) {
            console.log("User is " + newUser + ", now I can get recipes");
            this.getRecipes();
        }
    }

    getRecipes() {
        var thiz = this;
        this.recipes = [];
        this.getRecipeService().retrieveAll(function (recipe) {
            console.log("new recipe " + recipe.key);
            thiz.recipes.push(recipe);
            thiz.recipesMap[recipe.key] = recipe;
        });
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
