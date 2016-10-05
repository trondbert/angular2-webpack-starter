import {Recipe} from "./recipe";
import {FirebaseConverter} from "../firebase.converter";

export class FirebaseRecipeConverter implements FirebaseConverter {

    entityFromStorage(key, recipeFb) {
        var recipe:Recipe = new Recipe();
        recipe.dateCreated = recipeFb.dateCreated;
        recipe.dateModified = recipeFb.dateModified;
        recipe.imageId = recipeFb.imageId;
        recipe.instructions = recipeFb.instructions;
        recipe.key = key;
        recipe.name = recipeFb.name;
        recipe.tags = recipeFb.tags;
        recipe.transients = {
            ingredients1: recipeFb.ingredients.split("~*/|")[0] || "",
            ingredients2: recipeFb.ingredients.split("~*/|")[1] || "" };
        return recipe;
    }

    entityForStorage(recipe) {
        var forStorage = {
            dateCreated: recipe.dateCreated,
            dateModified: recipe.dateModified,
            imageId: recipe.imageId,
            ingredients: recipe.transients.ingredients1 + "~*/|" + recipe.transients.ingredients2,
            instructions: recipe.instructions || "",
            name: recipe.name,
            tags: recipe.tags,
        };
        var tagsMap = this.createTagsMap(forStorage.tags);
        for (let tagsKey of Object.keys(tagsMap)) {
            forStorage[tagsKey] = true;
        }
        return forStorage;
    }

    createTagsMap(tags) {
        var tagsList = this.createTagsList(tags.split(" ").sort(), 0);
        var tagsMap = {};
        for (let tags of tagsList) {
            var tagsNoScandinavian = tags.replace(/ø/g, "oe").replace(/æ/g, "ae").replace(/å/g, "aa");
            tagsMap["tags_" + tagsNoScandinavian] = true;
        }
        if (tagsList)
            return tagsMap;
    }

    createTagsList(tags, index) {
        if (index == tags.length - 1)
            return [ tags[index] ];

        var tagsList = [ tags[index] ];
        var tailTags = this.createTagsList(tags, index + 1);
        for (let tailTag of tailTags) {
            tagsList.push(tags[index] + "&" + tailTag);
            tagsList.push(tailTag);
        }
        return tagsList.sort();
    }
}
