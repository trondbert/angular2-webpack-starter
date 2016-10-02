import { Component, OnInit } from '@angular/core';

import {RecipeService} from "./recipe.service";
import {RecipeComponent} from "./recipe.component";
import {Recipe} from "./recipe";
import {Router, ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";
import {StaticData} from "../static.data";
declare var $:any;

@Component({
    selector: 'recipeView',
    templateUrl: '../layout/recipe-view.template.html',
    styleUrls: [ '../layout/app.style.css', '../layout/recipe-view.style.css']
})
export class RecipeViewComponent extends RecipeComponent implements OnInit {

    private recipe:Recipe;

    placeholderImage = StaticData.placeholderImage;
    private sub:any;

    constructor(private router:Router,
                private route:ActivatedRoute,
                private location:Location,
                recipeService:RecipeService) {

        super("view", recipeService);
        //TODO Delete recipe?
    }

    ngOnInit() {
        super.ngOnInit();
        var thisComp = this;
        this.sub = this.route.params.subscribe(params => {
            let key = params['key'];
            thisComp.getRecipeService().getRecipe(key,
                function (recipe) {
                    thisComp.recipe = recipe;
                }
            );
        });
    }
    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    getRouter():Router {
        return this.router;
    }
    getLocation():Location {
        return this.location;
    }
    getRecipe() {
        return this.recipe;
    }

    keyUp(event) {
        if (event.key == "e") {
            event.preventDefault();
            this.editRecipe();
        }
    }
}
