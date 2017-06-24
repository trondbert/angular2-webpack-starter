import {Component, Input, EventEmitter, SimpleChange, Output} from "@angular/core";

declare var $ : any;

@Component({
    selector: 'imageEdit',
    templateUrl: '../layout/image-edit.template.html',
    styleUrls: ['../layout/app.style.css', '../layout/image-edit.style.css']
})
export class ImageEditComponent {

    @Input()
    imageData: string;

    @Output()
    onImageEdited = new EventEmitter<boolean>();

    $container;
    orig_src = new Image();
    constrain = true;
    event_state = new EventState();
    min_width = 60;
    min_height = 60;
    max_width = 800;
    max_height = 900;
    resize_canvas = document.createElement('canvas');
    image_target;
    container_width;
    resizeInProgress = false;
    moveInProgress = false;

    constructor() {}

    ngOnInit() {

    }

    ngOnChanges(changes: {[propertyName: string]: SimpleChange}) {
        if (changes["imageData"]) {
            this.image_target = $(".resizableImage")[0];
            this.image_target.src = this.imageData;
            console.log("this.image_target: " + this.image_target);
            this.init();
        }
        console.log ("Changed " + Object.keys(changes));
    }

    init() {
        // Create a new image with a copy of the original src
        // When resizing, we will always use this original copy as the base
        this.orig_src.src = this.image_target.src;

        // Get a variable for the container
        this.$container = $(this.image_target).parent('.resize-container');
    }

    saveEventState (e) {
        // Save the initial event details and container state
        this.event_state.container_width = this.$container.width();
        this.event_state.container_height = this.$container.height();
        this.event_state.container_left = this.$container.offset().left;
        this.event_state.container_top = this.$container.offset().top;
        this.event_state.mouse_x = (e.clientX || e.pageX) + $(window).scrollLeft();
        this.event_state.mouse_y = (e.clientY || e.pageY) + $(window).scrollTop();

        this.event_state.evnt = e;
    }

    mouseMoved(e) {
        if (this.isResizing()) {
            this.resizing(e);
        }
        if (this.isMoving()) {
            this.moving(e);
        }
    }

    startResize (e) {
        e.preventDefault();
        e.stopPropagation();
        this.saveEventState(e);
        this.resizeInProgress = true;
    }

    mouseup(e) {
        console.log("Mouseup(e)");
        e.preventDefault();
        if (this.isResizing()) {
            this.resizeInProgress = false;
        }
        if (this.isMoving()) {
            this.moveInProgress = false;
        }
    }

    startMoving (e) {
        console.log("Startmoving(e)");
        e.preventDefault();
        e.stopPropagation();
        this.saveEventState(e);
        this.moveInProgress = true;
    }

    //Med utgangspunkt i http://tympanus.net/codrops/2014/10/30/resizing-cropping-images-canvas/
    resizing (e) {
        console.log("Start of resizing(e)");
        var mouse={x:null, y: null},width,height,left,top,offset = this.$container.offset();
        mouse.x = (e.clientX || e.pageX) + $(window).scrollLeft();
        mouse.y = (e.clientY || e.pageY) + $(window).scrollTop();

        // Position image differently depending on the corner dragged and constraints
        if ( $(this.event_state.evnt.target).hasClass('resize-handle-se') ) {
            width = mouse.x - this.event_state.container_left;
            height = mouse.y  - this.event_state.container_top;
            left = this.event_state.container_left;
            top = this.event_state.container_top;
        } else if ($(this.event_state.evnt.target).hasClass('resize-handle-sw') ) {
            width = this.event_state.container_width - (mouse.x - this.event_state.container_left);
            height = mouse.y  - this.event_state.container_top;
            left = mouse.x;
            top = this.event_state.container_top;
        } else if ($(this.event_state.evnt.target).hasClass('resize-handle-nw') ) {
            width = this.event_state.container_width - (mouse.x - this.event_state.container_left);
            height = this.event_state.container_height - (mouse.y - this.event_state.container_top);
            left = mouse.x;
            top = mouse.y;
            if (this.constrain || e.shiftKey) {
                top = mouse.y - ((width / this.orig_src.width * this.orig_src.height) - height);
            }
        } else if ($(this.event_state.evnt.target).hasClass('resize-handle-ne') ) {
            width = mouse.x - this.event_state.container_left;
            height = this.event_state.container_height - (mouse.y - this.event_state.container_top);
            left = this.event_state.container_left;
            top = mouse.y;
            if (this.constrain || e.shiftKey) {
                top = mouse.y - ((width / this.orig_src.width * this.orig_src.height) - height);
            }
        }   

        // Optionally maintain aspect ratio
        if (this.constrain || e.shiftKey) {
            height = width / this.orig_src.width * this.orig_src.height;
        }

        if (width > this.min_width && height > this.min_height && width < this.max_width && height < this.max_height) {
            // To improve performance you might limit how often resizeImage() is called
            this.resizeImage(width, height);
            // Without this Firefox will not re-calculate the the image dimensions until drag end
            this.$container.offset({'left': left, 'top': top});
        }
    }

    resizeImage (width, height) {
        console.log("resizeImage");
        this.resize_canvas.width = width;
        this.resize_canvas.height = height;
        this.resize_canvas.getContext('2d').drawImage(this.orig_src, 0, 0, width, height);
        $(this.image_target).attr('src', this.resize_canvas.toDataURL("image/jpg"));
    }

    moving (e){
        var  mouse={ x: null, y:null};
        e.preventDefault();
        e.stopPropagation();
        mouse.x = (e.clientX || e.pageX) + $(window).scrollLeft();
        mouse.y = (e.clientY || e.pageY) + $(window).scrollTop();
        this.$container.offset({
            'left': mouse.x - ( this.event_state.mouse_x - this.event_state.container_left ),
            'top': mouse.y - ( this.event_state.mouse_y - this.event_state.container_top )
        });
    }

    crop () {
        var crop_canvas,
            left = $('.overlay').offset().left - this.$container.offset().left,
            top =  $('.overlay').offset().top - this.$container.offset().top,
            width = $('.overlay').width(),
            height = $('.overlay').height();

        crop_canvas = document.createElement('canvas');
        crop_canvas.width = width;
        crop_canvas.height = height;

        crop_canvas.getContext('2d').drawImage(this.image_target, left, top, width, height, 0, 0, width, height);
        this.onImageEdited.emit(crop_canvas.toDataURL("image/jpg"));
    }

    cancel () {
        console.log("Cancel");
        this.onImageEdited.emit(null);
    }

    isResizing() {
        return this.resizeInProgress;
    }

    isMoving() {
        return this.moveInProgress;

    }
}

class EventState {
    container_width;
    container_height;
    container_left;
    container_top;
    mouse_x;
    mouse_y;
    touches = [];
    evnt;
}