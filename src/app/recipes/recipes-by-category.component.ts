import { Component } from '@angular/core';
import {RecipesListComponent} from "./recipes-list.component";
import {Router, ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";
import {RecipeService} from "./recipe.service";
import {AppState} from "../app.service";
import {GenericComponent} from "../generic.component";

@Component({
    selector: 'recipesByCategory',
    templateUrl: '../layout/recipes.template.html',
    styleUrls: ['../layout/app.style.css', '../layout/recipes.style.css']
})
export class RecipesByCategoryComponent extends GenericComponent {

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
                thisComp.recipes = thisComp.recipeService.retrieveByCategory(params['key']);
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