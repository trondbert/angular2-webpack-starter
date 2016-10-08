import {Beverage} from "./beverage";

export class BeverageValidator {

    public validate(beverage:Beverage):string[] {
        var errors:string[] = new Array<string>();
        if (beverage.name.trim() == "") {
            errors.push("Navn må være angitt.")
        }
        return errors;
    }
}
