
import {Component} from "@angular/core";
import {AppState} from "./app.service";

declare var $:any;

@Component({
    selector: 'home',
    template: `<article>
                    <div *ngIf="appState.showSearch">
                      <a href="/#/recipes/category/middag">Søk i middag</a>
                    </div>
                    <a href="/#/recipes/category/middag">
                        <img class="frontpageImage" src="assets/img/frontpage_kitchen.jpg"/>
                    </a>
               </article>`,
    styleUrls: ['layout/app.style.css']
})
export class HomeComponent {

    private sub:any;
    private deleteInProcess = false;
    private imageEditorVisible = false;

constructor(private appState: AppState) {}
}
