import {GenericComponent} from "../generic.component";
import {Recipe} from "./recipe";
import {RecipeService} from "./recipe.service";
import {AppState} from "../app.service";

export abstract class RecipeComponent extends GenericComponent {

    protected recipe: Recipe;

    constructor(private mode:string,
                private recipeService:RecipeService,
                private appState: AppState) {
        super();
    }

    ngOnInit() {
        super.ngOnInit();
    }
    ngOnDestroy() {
        super.ngOnDestroy();
    }

    getAppState(): AppState {
        return this.appState;
    }

    getRecipeService() {
        return this.recipeService;
    }

    editRecipe() {
        let link = ['/recipes/' + this.recipe.key + '/edit/'];
        this.getRouter().navigate(link);
    }

}
