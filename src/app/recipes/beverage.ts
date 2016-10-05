import {App} from "../app.component";
import {Entity} from "../entity";

export class Beverage extends Entity {
  key:string = "";
  name:string = "";
  comments:string = "";
  image = null;
  imageId = "";
  dateCreated = App.dateToString(new Date());
  dateModified = App.dateToString(new Date());
}
