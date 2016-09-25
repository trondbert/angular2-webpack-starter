import {Component, OnInit} from '@angular/core';

import {Router} from "@angular/router";
import {Recipe} from "../recipe";
import {RecipeService} from "./recipe.service";
declare var $:any;

@Component({
  selector: 'recipes/new',
  templateUrl: '../layout/recipe-edit.template.html',
  styleUrls: ['../layout/app.style.css', '../layout/recipe-edit.style.css']
})
export class RecipesNewComponent implements OnInit {

  private recipe:Recipe;

  constructor(private router:Router,
              private recipeService:RecipeService ) {

  }

  ngOnInit() {
    this.recipe = new Recipe();
  }

  save() {
    var thiz = this;
    var callback = function(recipeKey) {
      let link = ['recipes/edit', {key: recipeKey}];
      thiz.router.navigate(link);
    };
    this.recipeService.saveRecipe(this.recipe, callback);
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
