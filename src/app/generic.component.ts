import {Router} from "@angular/router";
import {Location} from "@angular/common";
import {Recipe} from "./recipes";
import {Beverage} from "./beverages";
import {StaticData} from "./static.data";
import {AppState} from "./app.service";

export abstract class GenericComponent {

    protected placeholderImage = StaticData.placeholderImage;

    ngOnInit() {
        this.getAppState().userSubject.subscribe(x => this.onUserChanged(x),
            e =>  console.log('Error related to user.subscribe: %s', e),
            () => console.log('onCompleted user.subscribe'));
    }

    abstract getRouter() : Router;
    abstract getLocation(): Location;
    abstract getAppState(): AppState;

    protected onUserChanged(newUser:string) {}

    deleteRecipe() {
        throw "Not implemented";
    }

    goBack() {
        this.getLocation().back(); //TODO virker ikke
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