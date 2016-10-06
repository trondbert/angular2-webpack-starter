import {Injectable} from "@angular/core";
import {ImageService} from "../image.service";
import {StaticData} from "../static.data";
import {Beverage} from "./beverage";
import {BeverageService} from "./beverage.service";

@Injectable()
export class BeverageMockService extends BeverageService {

    beverage1 = new Beverage();

    constructor(private imageService:ImageService) {
        super();
        this.beverage1.key = "-abc1";
        this.beverage1.name = "Gewurtztraminer";
        this.beverage1.image = {"imageData": StaticData.kyllinggryteImg};
        this.beverage1.comments = "God";
    }

    remove(beverage:Beverage):void {
    }

    retrieve(key:string, callback):void {
        if (key == "-abc1") {
            callback.call(this, this.beverage1);
        }
    }

    save(beverage:Beverage, callback):void {
    }

    retrieveByCategory(category:string, callback) {
        callback.call(this, this.beverage1);
    }

    retrieveAll(callback) {
        callback.call(this, this.beverage1);
    }
}
