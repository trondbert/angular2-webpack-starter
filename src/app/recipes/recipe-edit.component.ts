import {Component} from "@angular/core";
import {Router, ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";
import {ImageService} from "../image.service";
import {Recipe} from "./recipe";
import {RecipeComponent} from "./recipe.component";
import {RecipeService} from "./recipe.service";

declare var $:any;

@Component({
    selector: 'recipeEdit',
    templateUrl: '../layout/recipe-edit.template.html',
    styleUrls: ['../layout/app.style.css', '../layout/recipe-edit.style.css']
})
export class RecipesEditComponent extends RecipeComponent {

    private recipe:Recipe;
    private errors = [];

    placeholderImage = ImageService.placeholderImage;

    private sub:any;

    constructor(private router:Router,
                private route:ActivatedRoute,
                private location:Location,
                recipeService:RecipeService) {
        super("edit", recipeService);
    }

    ngOnInit() {
        var thisComp = this;
        this.sub = this.route.params.subscribe(params => {
            let key = params['key'];
            this.getRecipeService().getRecipe(key,
                function (recipe) {
                    thisComp.recipe = recipe;
                }
            );
        });
    }
    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    keyDownEnter(event) {
        event.preventDefault();
        this.save();
    }
    save() {
        this.errors = [];
        var validationErrors = this.validate(this.recipe);
        if (validationErrors.length > 0) {
            for (var error in validationErrors) {
                this.errors.push(error);
            }
            return;
        }
        var thisComp = this;
        this.getRecipeService().saveRecipe(this.recipe, function(key) {
            thisComp.goToRecipe(thisComp.recipe, null);
        });
    }

    private validate(recipe:Recipe):string[] {
        var errors:string[] = new Array<string>();
        var tagList = recipe.tags.split(" ");
        if (tagList.indexOf("middag") == -1 && tagList.indexOf("snacks") == -1) {
            errors.push("Du må skrive 'middag' eller 'snacks' i 'Kategorier'");
        }
        return errors;
    }

    chooseImg() {
        //noinspection TypeScriptUnresolvedFunction
        document.getElementById("imageChooser").click();
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

    getRouter():Router {
        return this.router;
    }

    getLocation():Location {
        return this.location;
    }
    getRecipe() {
        return this.recipe;
    }

    getTagMap(tags) {
        for (let tag of tags.split(/ +/)) {
            var tagFixed = tag.replace(/ø/g, "oe").replace(/å/g, "aa").replace(/æ/g, "ae");
            console.log(tagFixed);
        }
    }

}
