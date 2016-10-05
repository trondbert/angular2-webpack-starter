import {Recipe} from "./recipe";
import {FirebaseConverter} from "../firebase.converter";
import {Beverage} from "./beverage";

export class FirebaseBeverageConverter implements FirebaseConverter {

    entityFromStorage(key, beverageFb) {
        var beverage:Beverage = new Beverage();
        beverage.key = key;
        beverage.dateCreated = beverageFb.dateCreated;
        beverage.dateModified = beverageFb.dateModified;
        beverage.imageId = beverageFb.imageId;
        beverage.name = beverageFb.name;
        beverage.comments = beverageFb.comments;
        return beverage;
    }

    entityForStorage(beverage) {
        var forStorage = {
            dateCreated: beverage.dateCreated,
            dateModified: beverage.dateModified,
            imageId: beverage.imageId,
            name: beverage.name,
            comments: beverage.comments,
            tags: beverage.tags,
        };
        return forStorage;
    }
}
