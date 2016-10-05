import {Entity} from "./entity";
export abstract class FirebaseConverter {

    abstract entityFromStorage(key, recipeFb);

    abstract entityForStorage(entity:Entity);

}
