import { Component } from '@angular/core';

@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'home'
  selector: 'home',  // <home></home>
  providers: [],
  // Our list of styles in our component. We may add more to compose many styles together
  styleUrls: [ '../layout/home.style.css' ],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  templateUrl: '../layout/home.template.html'
})
export class HomeComponent {
  // Set our default values
  localState = { value: '' };
  // TypeScript public modifiers
  constructor() {

  }

  ngOnInit() {
    console.log('hello `HomeComponent` component');
  }
}
