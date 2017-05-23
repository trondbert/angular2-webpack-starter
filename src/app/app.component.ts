/*
 * Angular 2 decorators and services
 */
import {Component, ViewEncapsulation} from '@angular/core';

import {AppState} from './app.service';
import {Router, ActivatedRoute} from "@angular/router";
import {FirebaseFactory} from "./firebase.factory";

import {LFService, LoggerFactoryOptions, LogGroupRule, LogLevel} from "typescript-logging";

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
    showSearch = false;
    searchFilter = "";
    searchTags;
    static readonly LOGGER_FACTORY = LFService.createLoggerFactory(new LoggerFactoryOptions()
        .addLogGroupRule(new LogGroupRule(new RegExp(".+"), LogLevel.Debug)));

    private logger = App.LOGGER_FACTORY.getLogger("App");

    constructor(public appState:AppState, public router:Router) {
        this.searchTags = appState.searchTags;
    }

    ngOnInit() {
        this.subscribeToAuthChanges();
    }

    ngOnDestroy() {
        this.unsubscribeToAuthChanges();
    }

    subscribeToAuthChanges() {
        var thiz = this;
        FirebaseFactory.onAuth(function (user) {
            thiz.logger.debug("On auth");
            if (user) {
                thiz.logger.debug(user.email + ";" + thiz.appState.userSubject.getValue());
                if (true || user.email != thiz.appState.userSubject.getValue()) {
                    thiz.appState.userSubject.next(user.email);
                    thiz.user = user.email;
                }
            }
            else if (thiz.appState.userSubject.getValue() != null) {
                thiz.appState.userSubject.next(null);
                thiz.user = null;
            }
            thiz.loginError = null;
        });
    }

    unsubscribeToAuthChanges() {
        FirebaseFactory.offAuth();
    }

    logIn(password) {
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

    niceSearchTag(tag) {
        if (tag == "kjoett") return "kjøtt";
        return tag;
    }

    toggleSearch() {
        this.showSearch = !this.showSearch;
    }

    searchFilterChanged() {
        this.appState.searchFilter.next(this.searchFilter);
    }

}

