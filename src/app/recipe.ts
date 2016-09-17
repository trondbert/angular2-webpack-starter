import {App} from "./app.component";
export class Recipe {
  key:string;
  id:number;
  name:string;
  tags:string;
  transients;
  image;
  imageId;
  dateCreated;
  dateModified;
  instructions;

  constructor() {
    this.name = null;
    this.transients = {ingredients1: "", ingredients2: ""};
    this.dateCreated = App.dateToString(new Date());
    this.dateModified = App.dateToString(new Date());
    this.imageId = null;
    this.instructions = null;
    this.tags = null;
    this.id = null;
  }
}
