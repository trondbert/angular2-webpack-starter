import {Component} from '@angular/core';
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

    private recipes = [];

    constructor(private recipeService:RecipeService,
                private route:ActivatedRoute,
                private router:Router,
                private location:Location,
                private appState:AppState) {
        super();
    }

    ngOnInit() {
        super.ngOnInit();
    }
    ngOnDestroy() {
        super.ngOnDestroy();
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
        this.recipeService.retrieveAll(function (recipe) {
            thiz.recipes.push(recipe);
        });
    }

    getLocation() : Location { return this.location; }
    getRouter() { return this.router; }
    getRoute() { return this.route; }
}

