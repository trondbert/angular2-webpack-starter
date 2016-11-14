import {Entity} from "./entity";
export abstract class FirebaseConverter {

    abstract entityFromStorage(key, entityFb);

    abstract entityForStorage(entity:Entity);

}
