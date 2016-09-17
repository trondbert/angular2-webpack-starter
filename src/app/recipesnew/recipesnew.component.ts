import {Component, OnInit} from '@angular/core';

import {Router} from "@angular/router";
import {Recipe} from "../recipe";
declare var $:any;

@Component({
  selector: 'recipeNew',
  templateUrl: './recipe-edit.component.html',
  styleUrls: []
})
export class Recipesnew implements OnInit {

  private recipe:Recipe;

  constructor(private router:Router) {

  }

  ngOnInit() {
    this.recipe = new Recipe();
  }

  save() {
    var thiz = this;
    var callback = function(recipeKey) {
      let link = ['RecipeEdit', {key: recipeKey}];
      thiz.router.navigate(link);
    };
    //this.recipeService.saveRecipe(this.recipe, callback);
  }

  backToRecipes() {
    let link=['Recipes'];
    this.router.navigate(link);
  }

  chooseImg() {
    //noinspection TypeScriptUnresolvedFunction
    $("#imageChooser").trigger("click");
  }

  imgChosen(event) {
    var thiz = this;

    var reader = new FileReader();
    reader.onloadend = function (e:ProgressEvent) {
      var hasResult:FileReader = <FileReader>(e.target);
      //noinspection TypeScriptUnresolvedVariable
      thiz.recipe.image = {"imageData": hasResult.result};
    };
    reader.readAsDataURL(event.target.files[0]);
  }
}
