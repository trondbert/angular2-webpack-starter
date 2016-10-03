import {App} from "../app.component";

export class Recipe {
  key:string = "";
  name:string = "";
  tags:string = "";
  instructions = "";
  image = null;
  imageId = "";
  dateCreated = App.dateToString(new Date());
  dateModified = App.dateToString(new Date());

  transients = {ingredients1: "", ingredients2: ""};
}
