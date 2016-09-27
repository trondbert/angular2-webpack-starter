import {Router} from "@angular/router";
import {Location} from "@angular/common";
import {Recipe} from "./recipes/recipe";

export abstract class GenericComponent {
    
    ngOnInit() {
    }

    abstract getRouter() : Router;
    abstract getLocation(): Location;

    deleteRecipe() {
        throw "Not implemented";
    }

    goBack() {
        this.getLocation().back();
    }

    goToRecipes() {
        let link = ['/recipes'];
        this.getRouter().navigate(link);
    }

    goToRecipe(recipe:Recipe, event) {
        let link = ['/recipe/' + recipe.key];
        this.getRouter().navigate(link);

        event && event.preventDefault();
    }

    static withLineBreaks(val:string) {
        if (!val) return "";

        return val.replace(/\n/g, '<br/>');
    }
}