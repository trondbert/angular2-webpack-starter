import { Component } from '@angular/core';
import {OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router"
import {Location} from "@angular/common";
import {GenericComponent} from "../generic.component";
import {BeverageService} from "./beverage.service";
import {AppState} from "../app.service";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Component({
    selector: 'beverages',
    templateUrl: '../layout/beverages.template.html',
    styleUrls: ['../layout/app.style.css', '../layout/beverages.style.css']
})
export class BeveragesListComponent extends GenericComponent implements OnInit {

    protected beverages = [];

    protected searchFilter = "";

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
    ngOnDestroy() {
        super.ngOnDestroy();
    }

    getAppState(): AppState {
        return this.appState;
    }

    onUserChanged(newUser:string) {
        if (newUser != null) {
            this.beverages = this.beverageService.retrieveAll();
        }
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

    protected subscribeToAppState() {
        super.subscribeToAppState();
        this.getAppState().searchFilter.subscribe(x => {
                if (x != null) {
                    this.searchFilter = x;
                }
            },
            e => console.log('Error related to searchFilter.subscribe: %s', e),
            () => console.log('onCompleted searchFilter.subscribe'));
    }

    protected unsubscribeToAppState() {
        super.unsubscribeToAppState();

        this.getAppState().searchFilter.complete();
        this.getAppState().searchFilter = new BehaviorSubject<string>("");
    }
}
