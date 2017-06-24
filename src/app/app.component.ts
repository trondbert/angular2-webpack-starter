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
        App.unsubscribeToAuthChanges();
    }

    subscribeToAuthChanges() {
        const self = this;
        FirebaseFactory.onAuth(function (user) {
            self.logger.debug("On auth");
            if (user) {
                self.logger.debug(user.email + ";" + self.appState.userSubject.getValue());
                if (true || user.email != self.appState.userSubject.getValue()) {
                    self.appState.userSubject.next(user.email);
                    self.user = user.email;
                }
            }
            else if (self.appState.userSubject.getValue() != null) {
                self.appState.userSubject.next(null);
                self.user = null;
            }
            self.loginError = null;
        });
    }

    static unsubscribeToAuthChanges() {
        FirebaseFactory.offAuth();
    }

    logIn(password) {
        if (password) {
            const thisComp = this;
            FirebaseFactory.logIn(password, function(error) {
                thisComp.onLoginFailed(error);
            });
        }
    }
    static logOut() {
        FirebaseFactory.logOut();
    }
    onLoginFailed(error) {
        const errorCode = error.code;
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

    static niceSearchTag(tag) {
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

