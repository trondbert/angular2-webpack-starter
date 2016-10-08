import {Component, OnInit} from '@angular/core';

import {Router} from "@angular/router";
import {BeverageValidator} from "./beverage.validator";
import {BeverageService} from "./beverage.service";
import {Beverage} from "./beverage";
import {GenericComponent} from "../generic.component";
import {Location} from "@angular/common";
import {AppState} from "../app.service";

@Component({
    selector: 'beverages/new',
    templateUrl: '../layout/beverage-edit.template.html',
    styleUrls: ['../layout/app.style.css', '../layout/beverage-edit.style.css']
})
export class BeveragesNewComponent extends GenericComponent implements OnInit {

    private beverage:Beverage;
    private errors = [];

    constructor(private router:Router,
                private beverageService:BeverageService,
                private appState: AppState) {
        super();
    }

    ngOnInit() {
        this.beverage = new Beverage();
    }

    getAppState(): AppState {
        return this.appState;
    }

    getRouter():Router {
        return this.router;
    }

    getLocation():Location {
        return null;
    }

    save() {
        var thiz = this;
        this.errors = new BeverageValidator().validate(this.beverage);
        if (this.errors.length > 0) {
            return;
        }
        var callback = function(recipeKey) {
            let link = ['beverages/' + recipeKey];
            thiz.router.navigate(link);
        };
        this.beverageService.save(this.beverage, callback);
    }

    backToRecipes() {
        let link=['Recipes'];
        this.router.navigate(link);
    }

    chooseImg() {
        document.getElementById("imageChooser").click()
    }

    imgChosen(event) {
        var thiz = this;

        var reader = new FileReader();
        reader.onloadend = function (e:ProgressEvent) {
            var hasResult:FileReader = <FileReader>(e.target);
            //noinspection TypeScriptUnresolvedVariable
            thiz.beverage.image = {"imageData": hasResult.result};
        };
        reader.readAsDataURL(event.target.files[0]);
    }
}
