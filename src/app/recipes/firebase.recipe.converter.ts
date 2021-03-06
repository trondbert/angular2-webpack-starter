import {Recipe} from "./recipe";
import {FirebaseConverter} from "../firebase.converter";
import {App} from "../app.component";

export class FirebaseRecipeConverter implements FirebaseConverter {

    entityFromStorage(key, recipeFb) {
        var recipe:Recipe = new Recipe();
        recipe.key = key;
        recipe.dateCreated = recipeFb.dateCreated;
        recipe.dateModified = recipeFb.dateModified;
        recipe.imageId = recipeFb.imageId || null;
        recipe.instructions = recipeFb.instructions;
        recipe.name = recipeFb.name;
        recipe.tags = this.niceTagList(recipeFb.tags).join(" ");
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

    niceTagList(tagList) {
        var result = [];
        for (let tag of tagList) {
            if (tag == "kjoett")
                result.push("kjøtt");
            else
                result.push(tag);
        }
        return result;
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
