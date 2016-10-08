import {Component} from "@angular/core";
import {Router, ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";
import {ImageService} from "../image.service";
import {BeverageComponent} from "./beverage.component";
import {Beverage} from "./beverage";
import {BeverageService} from "./beverage.service";
import {AppState} from "../app.service";

declare var $:any;

@Component({
    selector: 'beverageEdit',
    templateUrl: '../layout/beverage-edit.template.html',
    styleUrls: ['../layout/app.style.css', '../layout/beverage-edit.style.css']
})
export class BeverageEditComponent extends BeverageComponent {

    private beverage:Beverage;
    private errors = [];

    private sub:any;

    constructor(private router:Router,
                private route:ActivatedRoute,
                private location:Location,
                beverageService:BeverageService,
                appState:AppState) {
        super("edit", beverageService, appState);
    }

    ngOnInit() {
        super.ngOnInit();
    }
    ngOnDestroy() {
        super.ngOnDestroy();
        this.sub && this.sub.unsubscribe();
    }

    onUserChanged(newUser:string) {
        if (newUser != null) {
            this.sub && this.sub.unsubscribe();
            this.retrieveBeverage();
        }
    }

    retrieveBeverage() {
        this.beverage = null;
        var thisComp = this;
        this.sub = this.route.params.subscribe(params => {
            let key = params['key'];
            thisComp.getBeverageService().retrieve(key,
                function (beverage) {
                    thisComp.beverage = beverage;
                }
            );
        });
    }

    keyDownEnter(event) {
        event.preventDefault();
        this.save();
    }
    save() {
        this.errors = [];
        var validationErrors = [];//new BeverageValidator().validate(this.beverage);
        if (validationErrors.length > 0) {
            for (let error of validationErrors) {
                this.errors.push(error);
            }
            return;
        }
        var thisComp = this;
        this.getBeverageService().save(this.beverage, function(key) {
            thisComp.goToBeverage(thisComp.beverage, null);
        });
    }

    chooseImg() {
        //noinspection TypeScriptUnresolvedFunction
        document.getElementById("imageChooser").click();
    }

    imgChosen(event) {
        var thiz = this;

        var reader = new FileReader();
        reader.onloadend = function (e:ProgressEvent) {
            var hasResult:FileReader = <FileReader>(e.target);
            //noinspection TypeScriptUnresolvedVariable
            thiz.beverage.image = {"imageData": hasResult.result};
        };
        reader.readAsDataURL(event.target.files[0]);
    }

    getRouter():Router {
        return this.router;
    }

    getLocation():Location {
        return this.location;
    }
    getBeverage() {
        return this.beverage;
    }

    getTagMap(tags) {
        for (let tag of tags.split(/ +/)) {
            var tagFixed = tag.replace(/ø/g, "oe").replace(/å/g, "aa").replace(/æ/g, "ae");
            console.log(tagFixed);
        }
    }

}
