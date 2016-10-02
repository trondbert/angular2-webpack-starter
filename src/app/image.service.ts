import { Component, Injectable, OnInit } from '@angular/core';
import {FirebaseFactory} from "./firebase.factory";

import {StaticData} from "./static.data";

@Injectable()
export class ImageService {

    getFirebaseRef(url) {
        return FirebaseFactory.getFirebaseRef(url);
    }

    getImage(imageKey, callback) {
        if (!imageKey || imageKey.trim() == "") {
            callback.call(this, null);
            return;
        }
        console.log("imagekey: " + imageKey);
        var imageRef = this.getFirebaseRef('images/' + imageKey);
        imageRef.once("value", function (data) {
            var imageFb = data.val();
            if (imageFb) {
                callback.call(this, {key: data.key, imageData: imageFb.imageData});
            }
        });
    }

    saveImage(image, imageKey, callback) {
        if (imageKey) {
            var imagesRef = this.getFirebaseRef("images/");
            //noinspection TypeScriptUnresolvedFunction
            imagesRef.child(imageKey).set(image);
            callback.call(this, imageKey);
        }
        else {
            var imagesRef = this.getFirebaseRef("images/");
            var ref = imagesRef.push(image);
            callback.call(this, ref.key);
        }
    }

    static placeholderImage = StaticData.placeholderImage;
}
