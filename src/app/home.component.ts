
import {Component} from "@angular/core";

declare var $:any;

@Component({
    selector: 'home',
    template: `<article>
                    <a href="/#/recipes/category/middag">
                        <img class="frontpageImage" src="/assets/img/frontpage_kitchen.jpg"/>
                    </a>
               </article>`,
    styleUrls: ['layout/app.style.css']
})
export class HomeComponent {

    private sub:any;
    private deleteInProcess = false;
    private imageEditorVisible = false;

    constructor() {
    }
}