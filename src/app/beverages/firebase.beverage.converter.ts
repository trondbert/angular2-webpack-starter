import {FirebaseConverter} from "../firebase.converter";
import {Beverage} from "./beverage";
import {App} from "../app.component";

export class FirebaseBeverageConverter implements FirebaseConverter {

    entityFromStorage(key, beverageFb) {
        var beverage:Beverage = new Beverage();
        beverage.key = key;
        beverage.dateCreated = beverageFb.dateCreated;
        beverage.dateModified = beverageFb.dateModified;
        beverage.imageId = beverageFb.imageId || null;
        beverage.name = beverageFb.name;
        beverage.comments = beverageFb.comments;
        return beverage;
    }

    entityForStorage(beverage:Beverage) {
        return {
            dateCreated: beverage.dateCreated,
            dateModified: beverage.dateModified,
            imageId: beverage.imageId,
            name: beverage.name,
            comments: beverage.comments,
        };
    }
}
