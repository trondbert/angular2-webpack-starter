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
    loginError = null;

    static authCallbackSetup = false;

    constructor(public appState:AppState, public router:Router) {

    }

    ngOnInit() {
        console.log('Initial App State', this.appState.state);
    }

    setupAuth() {
        var thisComp = this;
        FirebaseFactory.onAuth(function (user) {
            thisComp.loginError = null;
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
            thisComp.loginError = null;
        });
        App.authCallbackSetup = true;
    }

    logIn(password) {
        if (!App.authCallbackSetup)
            this.setupAuth();

        if (password) {
            var thisComp = this;
            FirebaseFactory.logIn(password, function(error) {
                thisComp.onLoginFailed(error);
            });
        }
    }
    logOut() {
        FirebaseFactory.logOut();
    }
    onLoginFailed(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode === 'auth/wrong-password') {
            this.loginError = "Feil passord";
        } else {
            this.loginError = "Innlogging feilet";
        }
    }


    static dateToString(date) {
        if (date == null) return null;

        return "" + (date.getYear() + 1900) +
            ("0" + (date.getMonth() + 1)).slice(-2) +
            ("0" + date.getDate()).slice(-2);
    };

}

