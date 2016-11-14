import { Component } from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";
import {RecipeService} from "./recipe.service";
import {AppState} from "../app.service";
import {RecipesComponent} from "./recipes.component";

@Component({
    selector: 'recipesByCategory',
    templateUrl: '../layout/recipes.template.html',
    styleUrls: ['../layout/app.style.css', '../layout/recipes.style.css']
})
export class RecipesByCategoryComponent extends RecipesComponent {

    private sub:any;
    private recipes;

    private lastUser:string = null;

    constructor(private router:Router,
                private route:ActivatedRoute,
                private location:Location,
                private recipeService:RecipeService,
                private appState:AppState) {
        super();
    }

    ngOnInit() {
        super.ngOnInit();
    }

    ngOnDestroy() {
        super.ngOnDestroy();
        this.sub && this.sub.unsubscribe();
    }

    onUserChanged(newUser:string) {
        if (newUser != null && this.lastUser == null) {
            this.sub && this.sub.unsubscribe();

            var thisComp = this;
            this.sub = this.getRoute().params.subscribe(params => {
                var tagsParam = params["key"];
                this.categories = tagsParam.replace(/ø/g, "oe").replace(/æ/g, "ae").replace(/å/g, "aa")
                    .split("&");
                this.appState.searchTags.length = 0;
                this.categories.forEach(function(cat) {
                    thisComp.appState.searchTags.push(cat);
                });

                thisComp.recipes = thisComp.recipeService.retrieveByCategory(this.categories.slice(0));
                window["recipes"] = thisComp.recipes;
                this.setLastRecipeList(this.location.path());
            });
        }
        this.lastUser = newUser;
    }

    getAppState()               { return this.appState; }
    getLocation() : Location    { return this.location; }
    getRouter()                 { return this.router; }
    getRoute()                  { return this.route; }
}