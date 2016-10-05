import { Component, OnInit } from '@angular/core';

import {Router, ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";
import {StaticData} from "../static.data";
import {BeverageComponent} from "./beverage.component";
import {Beverage} from "../recipes/beverage";
import {BeverageService} from "../recipes/beverage.service";
declare var $:any;

@Component({
    selector: 'beverageView',
    templateUrl: '../layout/beverage-view.template.html',
    styleUrls: [ '../layout/app.style.css', '../layout/beverage-view.style.css']
})
export class BeverageViewComponent extends BeverageComponent implements OnInit {

    private beverage:Beverage;

    placeholderImage = StaticData.placeholderImage;
    private sub:any;

    constructor(private router:Router,
                private route:ActivatedRoute,
                private location:Location,
                beverageService:BeverageService) {

        super("view", beverageService);
        //TODO Delete?
    }

    ngOnInit() {
        super.ngOnInit();
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
    ngOnDestroy() {
        this.sub.unsubscribe();
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
