import {Recipe} from "./recipe";
import {GenericComponent} from "../generic.component";
import {OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router"
import {Location} from "@angular/common";
import {RecipeService} from "./recipe.service";

export abstract class RecipesListComponent extends GenericComponent implements OnInit {

    private recipeService: RecipeService;

    recipesMap:{[key:string]:Recipe;} = {};

    constructor(recipeService:RecipeService,
                private route:ActivatedRoute,
                private router:Router,
                private location:Location) {
        super();
        this.recipeService = recipeService;
    }

    ngOnInit() {
        super.ngOnInit();
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
