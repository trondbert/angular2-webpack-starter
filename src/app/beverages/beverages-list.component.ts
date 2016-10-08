import { Component } from '@angular/core';
import {OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router"
import {Location} from "@angular/common";
import {GenericComponent} from "../generic.component";
import {StaticData} from "../static.data";
import {BeverageService} from "./beverage.service";
import {AppState} from "../app.service";

@Component({
    selector: 'beverages',
    templateUrl: '../layout/beverages.template.html',
    styleUrls: ['../layout/app.style.css', '../layout/beverages.style.css']
})
export class BeveragesListComponent extends GenericComponent implements OnInit {

    protected beverages = [];

    constructor(private beverageService: BeverageService,
                private route:ActivatedRoute,
                private router:Router,
                private location:Location,
                private appState: AppState) {
        super();
    }

    ngOnInit() {
        super.ngOnInit();
    }

    getAppState(): AppState {
        return this.appState;
    }

    onUserChanged(newUser:string) {
        if (newUser != null) {
            this.getRecipes();
        }
    }

    getRecipes() {
        var thisComp = this;
        thisComp.beverages = [];
        thisComp.beverageService.retrieveAll(function(beverage) {
            thisComp.beverages.push(beverage);
        });
    }

    getLocation() : Location {
        return this.location;
    }

    getRouter() {
        return this.router;
    }

    getRoute() {
        return this.route;
    }
}
