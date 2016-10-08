/*
 * Angular 2 decorators and services
 */
import {Component, ViewEncapsulation} from '@angular/core';

import {AppState} from './app.service';
import {Router} from "@angular/router";
import {FirebaseFactory} from "./firebase.factory";

/*
 * App Component
 * Top Level Component
 */
@Component({
    selector: 'app',
    encapsulation: ViewEncapsulation.None,
    styleUrls: [
        './layout/app.style.css', './layout/app.style.css'
    ],
    templateUrl: './layout/app.template.html'
})
export class App {
    name = 'Mat, drikke og kos';
    user = null;

    constructor(public appState:AppState, public router:Router) {

    }

    ngOnInit() {
        console.log('Initial App State', this.appState.state);

        var thisComp = this;
        FirebaseFactory.onAuth(function (user) {
            if (user) {
                if (user.email != thisComp.appState.userSubject.getValue()) {
                    thisComp.appState.userSubject.next(user.email);
                    thisComp.user = user.email;
                }
            }
            else if (thisComp.appState.userSubject.getValue() != null) {
                thisComp.appState.userSubject.next(null);
                thisComp.user = null;
            }
        });
    }

    logIn(password) {
        FirebaseFactory.logIn(password);
    }
    logOut() {
        FirebaseFactory.logOut();
    }


    static dateToString(date) {
        if (date == null) return null;

        return "" + (date.getYear() + 1900) +
            ("0" + (date.getMonth() + 1)).slice(-2) +
            ("0" + date.getDate()).slice(-2);
    };

}

