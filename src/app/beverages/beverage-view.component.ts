import { Component, OnInit } from '@angular/core';

import {Router, ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";
import {StaticData} from "../static.data";
import {BeverageComponent} from "./beverage.component";
import {Beverage} from "./beverage";
import {BeverageService} from "./beverage.service";
import {AppState} from "../app.service";
declare var $:any;

@Component({
    selector: 'beverageView',
    templateUrl: '../layout/beverage-view.template.html',
    styleUrls: [ '../layout/app.style.css', '../layout/beverage-view.style.css']
})
export class BeverageViewComponent extends BeverageComponent implements OnInit {

    private beverage:Beverage;
    private sub:any;

    constructor(private router:Router,
                private route:ActivatedRoute,
                private location:Location,
                beverageService:BeverageService,
                appState:AppState) {
        super("view", beverageService, appState);
    }

    ngOnInit() {
        super.ngOnInit();
    }
    ngOnDestroy() {
        super.ngOnDestroy();
        this.sub && this.sub.unsubscribe();
    }

    onUserChanged(newUser:string) {
        if (newUser != null) {
            this.sub && this.sub.unsubscribe();
            this.retrieveBeverage();
        }
    }

    retrieveBeverage() {
        this.beverage = null;
        var thisComp = this;
        this.sub = this.route.params.subscribe(params => {
            let key = params['key'];
            thisComp.getBeverageService().retrieve(key,
                function (beverage) {
                    thisComp.beverage = beverage;
                }
            );
        });
    }

    getRouter():Router {
        return this.router;
    }
    getLocation():Location {
        return this.location;
    }
    getBeverage() {
        return this.beverage;
    }

    keyUp(event) {
        if (event.key == "e") {
            event.preventDefault();
            this.editBeverage();
        }
    }
}
