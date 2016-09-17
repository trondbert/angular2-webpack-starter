/*
 * Angular 2 decorators and services
 */
import { Component, ViewEncapsulation } from '@angular/core';

import { AppState } from './app.service';
import {Router} from "@angular/router";

import * as Firebase from 'firebase';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './app.style.css'
  ],
  template: `
    <nav>
      <span>
        <a [routerLink]=" ['./'] ">
          Index
        </a>
      </span>
      |
      <span>
        <a [routerLink]=" ['./home'] ">
          Home
        </a>
      </span>
      |
      <span>
        <a [routerLink]=" ['./detail'] ">
          Detail
        </a>
      </span>
      |
      <span>
        <a [routerLink]=" ['./about'] ">
          About
        </a>
      </span>
    </nav>

    <main>
      <router-outlet></router-outlet>
    </main>

    <pre class="app-state">this.appState.state = {{ appState.state | json }}</pre>

    <footer>
      <span>WebPack Angular 2 Starter by <a [href]="url">@AngularClass</a></span>
      <div>
        <a [href]="url">
          <img [src]="angularclassLogo" width="25%">
        </a>
      </div>
    </footer>
  `
})
export class App {
  angularclassLogo = 'assets/img/angularclass-avatar.png';
  name = 'Angular 2 Webpack Starter';
  url = 'https://twitter.com/AngularClass';

  constructor(public appState: AppState, public router:Router) {

  }

  ngOnInit() {
    console.log('Initial App State', this.appState.state);

    /*let link = ['RecipeNew'];
    this.router.navigate(link);*/

    var config = {
      apiKey: "AIzaSyCIO8byvnKVyB7fC-9KPySuSFvrJUdfk6w",
      authDomain: "test-heroes-9b13f.firebaseapp.com",
      databaseURL: "https://test-heroes-9b13f.firebaseio.com",
      storageBucket: "test-heroes-9b13f.appspot.com",
    };
    // var config = {
    //   apiKey: "AIzaSyB7rqRVUb2L84B52gfKniBqGkGOzJf0JtA",
    //   authDomain: "blinding-fire-2931.firebaseapp.com",
    //   databaseURL: "https://blinding-fire-2931.firebaseio.com",
    //   storageBucket: "blinding-fire-2931.appspot.com",
    // };
    window['_firebase'] = Firebase.initializeApp(config);
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
