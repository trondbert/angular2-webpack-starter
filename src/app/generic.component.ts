import {Router} from "@angular/router";
import {Location} from "@angular/common";
import {Recipe} from "./recipes/recipe";
import {Beverage} from "./recipes/beverage";

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

    goToBeverages() {
        let link = ['/beverages'];
        this.getRouter().navigate(link);
    }

    goToBeverage(beverage:Beverage, event) {
        let link = ['/beverages/' + beverage.key];
        this.getRouter().navigate(link);

        event && event.preventDefault();
    }

    goToRecipes() {
        let link = ['/recipes'];
        this.getRouter().navigate(link);
    }

    goToRecipe(recipe:Recipe, event) {
        let link = ['/recipes/' + recipe.key];
        this.getRouter().navigate(link);

        event && event.preventDefault();
    }

    withLineBreaks(val:string) {
        if (!val) return "";

        return val.replace(/\n/g, '<br/>');
    }
}