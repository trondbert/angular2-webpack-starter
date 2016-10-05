import {Entity} from "./entity";

export abstract class StorageService {

    abstract save(entity:Entity, callback):void;

    abstract remove(entity:Entity):void;

    abstract retrieve(key:string, callback):void;

    abstract retrieveAll(callback);
}