import {App} from "../app.component";
import {Entity} from "../entity";

export class Recipe extends Entity {
  key:string = "";
  name:string = "";
  tags:string = "";
  instructions = "";
  image = null;
  imageId = "";
  dateCreated = App.dateToString(new Date());
  dateModified = App.dateToString(new Date());

  transients = {ingredients1: "", ingredients2: ""};

  imageData = function() {
    return this.image && this.image.imageData;
  }
}
