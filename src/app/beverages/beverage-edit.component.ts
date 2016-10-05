import {Component} from "@angular/core";
import {Router, ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";
import {ImageService} from "../image.service";
import {BeverageComponent} from "./beverage.component";
import {Beverage} from "../recipes/beverage";
import {BeverageService} from "../recipes/beverage.service";

declare var $:any;

@Component({
    selector: 'beverageEdit',
    templateUrl: '../layout/beverage-edit.template.html',
    styleUrls: ['../layout/app.style.css', '../layout/beverage-edit.style.css']
})
export class BeverageEditComponent extends BeverageComponent {

    private beverage:Beverage;
    private errors = [];

    placeholderImage = ImageService.placeholderImage;

    private sub:any;

    constructor(private router:Router,
                private route:ActivatedRoute,
                private location:Location,
                beverageService:BeverageService) {
        super("edit", beverageService);
    }

    ngOnInit() {
        var thisComp = this;
        this.sub = this.route.params.subscribe(params => {
            let key = params['key'];
            this.getBeverageService().retrieve(key,
                function (beverage) {
                    thisComp.beverage = beverage;
                }
            );
        });
    }
    ngOnDestroy() {
        this.sub.unsubscribe();
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
