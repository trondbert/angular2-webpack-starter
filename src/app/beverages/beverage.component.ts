import {GenericComponent} from "../generic.component";
import {BeverageService} from "./beverage.service";
import {Beverage} from "./beverage";
import {AppState} from "../app.service";


export abstract class BeverageComponent extends GenericComponent {

    constructor(private mode:string,
                private beverageService:BeverageService,
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

    getBeverageService() {
        return this.beverageService;
    }

    abstract getBeverage() : Beverage;

    editBeverage() {
        let link = ['/beverages/' + this.getBeverage().key + '/edit/'];
        this.getRouter().navigate(link);
    }
}
