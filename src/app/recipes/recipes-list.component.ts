import {Component} from '@angular/core';
import {GenericComponent} from "../generic.component";
import {OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router"
import {Location} from "@angular/common";
import {RecipeService} from "./recipe.service";
import {AppState} from "../app.service";
import {App} from "../app.component";
import {RecipesComponent} from "./recipes.component";

@Component({
    selector: 'recipes',
    templateUrl: '../layout/recipes.template.html',
    styleUrls: ['../layout/app.style.css', '../layout/recipes.style.css']
})
export class RecipesListComponent extends RecipesComponent implements OnInit {

    private recipes;

    constructor(private recipeService:      RecipeService,
                private route:              ActivatedRoute,
                private router:             Router,
                private location:           Location,
                private appState:           AppState) {
        super();
        this.logger = App.LOGGER_FACTORY.getLogger("RecipesListComponent");
    }

    ngOnInit() {
        super.ngOnInit();
        this.logger.debug("ngOnInit");
        this.setLastRecipeList(this.location.path());
    }
    ngOnDestroy() {
        super.ngOnDestroy();
    }

    getAppState(): AppState {
        return this.appState;
    }

    onUserChanged(newUser:string) {
        if (newUser != null) {
            this.recipes = this.recipeService.retrieveAll();
        }
    }

    getLocation() : Location { return this.location; }
    getRouter() { return this.router; }
    getRoute() { return this.route; }
}

