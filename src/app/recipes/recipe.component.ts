import {GenericComponent} from "../generic.component";
import {Recipe} from "./recipe";
import {RecipeService} from "./recipe.service";

export abstract class RecipeComponent extends GenericComponent {

    constructor(private mode:string,
                private recipeService:RecipeService) {
        super();
    }

    ngOnInit() {
        super.ngOnInit();
    }

    getRecipeService() {
        return this.recipeService;
    }

    abstract getRecipe() : Recipe;

    editRecipe() {
        let link = ['/recipe/' + this.getRecipe().key + '/edit/'];
        this.getRouter().navigate(link);
    }

    deleteRecipe() {
        if (this.getRecipe()) {
            confirm("Vil du virkelig slette oppskriften?");
            this.recipeService.deleteRecipe(this.getRecipe());
            let link = ['/recipes'];
            this.getRouter().navigate(link);
        }
    }

}
