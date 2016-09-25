import {RecipeService} from "./recipe.service";
import {Recipe} from "../recipe";
import {GenericComponent} from "../generic.component";
import {OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";

export abstract class RecipesListComponent extends GenericComponent implements OnInit {

    recipesMap:{[key:string]:Recipe;} = {};

    private recipeService:RecipeService;

    constructor(recipeService:RecipeService,
                protected route:ActivatedRoute,
                private router:Router,
                private location:Location,
                protected recipeService:RecipeService) {
        super();
        this.recipeService = recipeService;
    }

    ngOnInit() {
        super.ngOnInit();
    }

    getRecipeService() {
        return this.recipeService;
    }

    getLocation() {
        return this.location;
    }

    getRouter() {
        return this.router;
    }
}
