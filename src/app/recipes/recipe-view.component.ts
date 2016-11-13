import { Component, OnInit } from '@angular/core';

import {RecipeService} from "./recipe.service";
import {RecipeComponent} from "./recipe.component";
import {Recipe} from "./recipe";
import {Router, ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";
import {StaticData} from "../static.data";
import {AppState} from "../app.service";
import {App} from "../app.component";
declare var $:any;

@Component({
    selector: 'recipeView',
    templateUrl: '../layout/recipe-view.template.html',
    styleUrls: [ '../layout/app.style.css', '../layout/recipe-view.style.css']
})
export class RecipeViewComponent extends RecipeComponent implements OnInit {

    private sub:any;
    private deleteInProcess = false;

    constructor(private router:Router,
                private route:ActivatedRoute,
                private location:Location,
                recipeService:RecipeService,
                appState:AppState) {

        super("view", recipeService, appState);
        this.logger = App.LOGGER_FACTORY.getLogger("RecipeViewComponent");
    }

    ngOnInit() {
        super.ngOnInit();
    }
    ngOnDestroy() {
        super.ngOnDestroy();
        this.sub && this.sub.unsubscribe();
        this.getRecipeService().disconnectRecipe(this.route.snapshot.params["key"]);
    }

    onUserChanged(newUser:string) {
        if (newUser != null) {
            this.sub && this.sub.unsubscribe();
            this.retrieveRecipe();
        }
    }

    retrieveRecipe() {
        this.recipe = null;
        var thisComp = this;
        this.sub = this.route.params.subscribe(params => {
            let key = params['key'];
            thisComp.getRecipeService().retrieve(key,
                function (recipe) {
                    thisComp.recipe = recipe;
                }
            );
        });
    }

    getRouter():Router {
        return this.router;
    }
    getLocation():Location {
        return this.location;
    }

    keyUp(event) {
        if (event.key == "e") {
            event.preventDefault();
            this.editRecipe();
        }
    }

    deleteRecipe() {
        this.deleteInProcess = true;
    }

    confirmDeleteRecipe() {
        this.getRecipeService().remove(this.recipe);
        this.deleteInProcess = false;
        this.goToRecipes();
    }
}
