import { Component } from '@angular/core';
import {OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router"
import {Location} from "@angular/common";
import {GenericComponent} from "../generic.component";
import {BeverageService} from "../recipes/beverage.service";
import {StaticData} from "../static.data";

@Component({
    selector: 'beverages',
    templateUrl: '../layout/beverages.template.html',
    styleUrls: ['../layout/app.style.css', '../layout/beverages.style.css']
})
export class BeveragesListComponent extends GenericComponent implements OnInit {

    protected beverages = [];
    protected placeholderImage;

    constructor(private beverageService: BeverageService,
                private route:ActivatedRoute,
                private router:Router,
                private location:Location) {
        super();
    }

    ngOnInit() {
        super.ngOnInit();
        var thisComp = this;
        thisComp.beverages = [];
        thisComp.beverageService.retrieveAll(function(beverage) {
            thisComp.beverages.push(beverage);
        });
        
        this.placeholderImage = StaticData.placeholderImage;
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
