import {Recipe} from "./recipe";

export class RecipeValidator {

    public validate(recipe:Recipe):string[] {
        var errors:string[] = new Array<string>();
        if (recipe.name.trim() == "") {
            errors.push("Navn må være angitt.")
        }
        var tagList = recipe.tags.split(" ");
        if (tagList.indexOf("middag") == -1 && tagList.indexOf("snacks") == -1) {
            errors.push("Du må skrive 'middag' eller 'snacks' i 'Kategorier'.");
        }
        return errors;
    }
}
