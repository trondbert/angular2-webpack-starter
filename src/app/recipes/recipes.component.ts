import {GenericComponent} from "../generic.component";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

export abstract class RecipesComponent extends GenericComponent {

    protected categories = [];

    protected searchFilter = "";

    protected subscribeToAppState() {
        super.subscribeToAppState();
        this.getAppState().searchFilter.subscribe(x => {
                if (x != null) {
                    console.log("App state searchFilter changed: " + x);
                    this.searchFilter = x;
                }
            },
            e => console.log('Error related to searchFilter.subscribe: %s', e),
            () => console.log('onCompleted searchFilter.subscribe'));
    }

    protected unsubscribeToAppState() {
        super.unsubscribeToAppState();

        this.getAppState().searchFilter.complete();
        this.getAppState().searchFilter = new BehaviorSubject<string>("");
    }
}
