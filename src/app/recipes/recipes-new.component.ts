import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Location} from "@angular/common";

import {Recipe} from "./recipe";
import {RecipeService} from "./recipe.service";
import {RecipeValidator} from "./recipe.validator";
import {GenericComponent} from "../generic.component";
import {AppState} from "../app.service";

@Component({
    selector: 'recipes/new',
    templateUrl: '../layout/recipe-edit.template.html',
    styleUrls: ['../layout/app.style.css', '../layout/recipe-edit.style.css']
})
export class RecipesNewComponent extends GenericComponent implements OnInit {

    private recipe:Recipe;
    private errors = [];

    constructor(private router:Router,
                private recipeService:RecipeService,
                private appState:AppState) {
        super();
    }

    getAppState(): AppState {
        return this.appState;
    }

    ngOnInit() {
        super.ngOnInit();
        this.recipe = new Recipe();
    }
    ngOnDestroy() {
        super.ngOnDestroy();
    }

    getRouter():Router {
        return this.router;
    }

    getLocation():Location {
        return null;
    }

    save() {
        var thiz = this;
        this.errors = new RecipeValidator().validate(this.recipe);
        if (this.errors.length > 0) {
            return;
        }
        var callback = function (recipeKey) {
            let link = ['recipes/' + recipeKey];
            thiz.router.navigate(link);
        };
        this.recipeService.save(this.recipe, callback);
    }

    backToRecipes() {
        let link = ['Recipes'];
        this.router.navigate(link);
    }

    chooseImg() {
        document.getElementById("imageChooser").click()
    }

    imgChosen(event) {
        var thiz = this;

        var reader = new FileReader();
        reader.onloadend = function (e:ProgressEvent) {
            var hasResult:FileReader = <FileReader>(e.target);
            //noinspection TypeScriptUnresolvedVariable
            thiz.recipe.image = {"imageData": hasResult.result};
        };
        reader.readAsDataURL(event.target.files[0]);
    }
}
