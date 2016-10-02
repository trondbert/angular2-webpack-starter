import {Injectable} from "@angular/core";
import {ImageService} from "../image.service";
import {RecipeService} from "./recipe.service";
import {Recipe} from "./recipe";
import {StaticData} from "../static.data";

@Injectable()
export class RecipeMockService extends RecipeService {

    recipe1 = new Recipe();

    constructor(private imageService:ImageService) {
        super();
        this.recipe1.key = "-abc1";
        this.recipe1.name = "Bali kyllinggryte";
        this.recipe1.image = {"imageData": StaticData.kyllinggryteImg};
        this.recipe1.tags = "kjøtt middag";
        this.recipe1.instructions = "Gjør en ting, så den neste";
        this.recipe1.transients.ingredients1 = "Foo\nBar";
        this.recipe1.transients.ingredients2 = "One line\nAnother line";
    }

    deleteRecipe(recipe:Recipe):void {
    }

    getRecipe(key:string, callback):void {
        if (key == "-abc1") {
            callback.call(this, this.recipe1);
        }
    }

    saveRecipe(recipe:Recipe, callback):void {
    }

    getRecipesByCategory(category:string, callback) {
        callback.call(this, this.recipe1);
    }

    getAllRecipes(callback) {
        callback.call(this, this.recipe1);
    }
}
