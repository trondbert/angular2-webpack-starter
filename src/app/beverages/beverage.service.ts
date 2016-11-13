import {Beverage} from "./beverage";

export abstract class BeverageService {
    
    abstract remove(beverage:Beverage):void;

    abstract retrieve(key:string, callback):void;

    abstract save(beverage:Beverage, callback):void;

    abstract retrieveAll() : Beverage[];

    abstract disconnect();

    abstract disconnectBeverage(key);
}