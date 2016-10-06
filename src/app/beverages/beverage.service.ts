import {StorageService} from "../storage.service";
import {Beverage} from "./beverage";

export abstract class BeverageService extends StorageService {
    
    abstract remove(beverage:Beverage):void;

    abstract retrieve(key:string, callback):void;

    abstract save(beverage:Beverage, callback):void;

    abstract retrieveAll(callback);
}