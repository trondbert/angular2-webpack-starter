/*
 * Angular 2 decorators and services
 */
import { Component, ViewEncapsulation } from '@angular/core';

import { AppState } from './app.service';
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
  template: `
        <div class="siteHeader"><h1>{{name}}</h1>
        <nav>
            <ul><li><a [routerLink]="['/recipes/category/middag']">Middag</a>
                    <ul><li><a [routerLink]="['/recipes/category/middag&fisk']">Fisk</a></li>
                        <li><a [routerLink]="['/recipes/category/middag&kjoett']">Kjøtt</a></li>
                        <li><a [routerLink]="['/recipes/category/middag&vegetar']">Vegetar</a></li>
                    </ul>
                </li>
                <li><a [routerLink]="['/recipes/category/snacks']">Snacks</a></li>
                <li><a [routerLink]="['/recipes/category/TODOvinEntitet']">Vin</a>
                    <ul><li><a [routerLink]="['/recipes/category/TODOvinEntitet']">Ny vin</a></li></ul>
                </li>
                <li class="moreOptions"><a href="#">&#x2295;</a>
                    <ul><li><a [routerLink]=" ['./recipes/new'] ">Ny&nbsp;oppskrift</a></li>
                        <li><a [routerLink]="['/recipes/category/TODOvinEntitet']">Ny vin</a></li>
                        <li class="loggUt"><a (click)="logOut()">Logg ut</a></li>
                    </ul>
                </li>
                <li class ="loggInn">
                    <input #box type="text" size="12" placeholder="Passord her..." 
                        (keyup.enter)="logIn(box.value)" (blur)="logIn(box.value)"/>
                </li>
            </ul>
        </nav>
        </div>
        <router-outlet></router-outlet>
  `
})
export class App {
  name = 'Mat, drikke og kos';

  constructor(public appState: AppState, public router:Router) {

  }

  ngOnInit() {
    console.log('Initial App State', this.appState.state);

  }

  static dateToString(date) {
    if (date == null) return null;

    return "" + (date.getYear() + 1900) +
      ("0" + (date.getMonth() + 1)).slice(-2) +
      ("0" + date.getDate()).slice(-2);
  };

}

/*
 * Please review the https://github.com/AngularClass/angular2-examples/ repo for
 * more angular app examples that you may copy/paste
 * (The examples may not be updated as quickly. Please open an issue on github for us to update it)
 * For help or questions please contact us at @AngularClass on twitter
 * or our chat on Slack at https://AngularClass.com/slack-join
 */
