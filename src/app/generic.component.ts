import {Router} from "@angular/router";
import {Location} from "@angular/common";
import {Recipe} from "./recipes";
import {Beverage} from "./beverages";
import {StaticData} from "./static.data";
import {AppState} from "./app.service";
import {BehaviorSubject} from "rxjs/Rx";
import {App} from "./app.component";

export abstract class GenericComponent {

    protected placeholderImage = StaticData.placeholderImage;
    protected logger = App.LOGGER_FACTORY.getLogger("GenericComponent");
    private isSubscribed = false;

    ngOnInit() {
        this.getAppState().searchTags.length = 0;
        if (!this.isSubscribed) {
            this.getAppState().userSubject.subscribe(x => {
                    this.onUserChanged(x);
                },
                e => console.log('Error related to user.subscribe: %s', e),
                () => console.log('onCompleted user.subscribe'));
            this.isSubscribed = true;
        }
    }
    ngOnDestroy() {
        if (this.isSubscribed) {
            var currentUser = this.getAppState().userSubject.getValue();
            this.getAppState().userSubject.complete();

            this.getAppState().userSubject = new BehaviorSubject<string>(currentUser);
            this.isSubscribed = false;
        }
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
        let lastVisit = this.getLastRecipeList();
        this.getRouter().navigate(lastVisit ? [lastVisit] : ['/recipes/middag']);
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

    getLastWineList() { return this.getAppState().get("wineList"); }
    setLastWineList(url) {
        this.getAppState().set("wineList", decodeURIComponent(url));
    }
    getLastRecipeList() { return this.getAppState().get("recipeList"); }
    setLastRecipeList(url) {
        this.getAppState().set("recipeList", decodeURIComponent(url));
        this.logger.debug(this.getAppState().get("recipeList"));
    }
}