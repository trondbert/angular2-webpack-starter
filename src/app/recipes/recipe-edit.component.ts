import {Component} from "@angular/core";
import {Router, ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";
import {ImageService} from "../image.service";
import {Recipe} from "./recipe";
import {RecipeComponent} from "./recipe.component";
import {RecipeService} from "./recipe.service";
import {RecipeValidator} from "./recipe.validator";
import {AppState} from "../app.service";

declare var $:any;

@Component({
    selector: 'recipeEdit',
    templateUrl: '../layout/recipe-edit.template.html',
    styleUrls: ['../layout/app.style.css', '../layout/recipe-edit.style.css']
})
export class RecipesEditComponent extends RecipeComponent {

    protected recipe:Recipe;
    private errors = [];

    private sub:any;

    constructor(private router:Router,
                private route:ActivatedRoute,
                private location:Location,
                recipeService:RecipeService,
                appState:AppState) {
        super("edit", recipeService, appState);
    }

    ngOnInit() {
        super.ngOnInit();
    }

    ngOnDestroy() {
        this.sub && this.sub.unsubscribe();
    }

    onUserChanged(newUser:string) {
        if (newUser != null) {
            this.sub && this.sub.unsubscribe();
            this.retrieveRecipe();
        }
    }

    retrieveRecipe() {
        this.recipe = null;
        var thisComp = this;
        this.sub = this.route.params.subscribe(params => {
            let key = params['key'];
            this.getRecipeService().retrieve(key,
                function (recipe) {
                    thisComp.recipe = recipe;
                }
            );
        });
    }

    keyDownEnter(event) {
        event.preventDefault();
        this.save();
    }
    save() {
        this.errors = [];
        var validationErrors = new RecipeValidator().validate(this.recipe);
        if (validationErrors.length > 0) {
            for (let error of validationErrors) {
                this.errors.push(error);
            }
            return;
        }
        var thisComp = this;
        this.getRecipeService().save(this.recipe, function(key) {
            thisComp.goToRecipe(thisComp.recipe, null);
        });
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

    getTagMap(tags) {
        for (let tag of tags.split(/ +/)) {
            var tagFixed = tag.replace(/ø/g, "oe").replace(/å/g, "aa").replace(/æ/g, "ae");
            console.log(tagFixed);
        }
    }
}
