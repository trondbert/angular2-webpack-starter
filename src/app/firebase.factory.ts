import * as Firebase from 'firebase';

export class FirebaseFactory {

    static dataService = null;

    static initApp() {
        if (FirebaseFactory.dataService != null) return;

        var config = {
            apiKey: "AIzaSyAZE8LGv8GVDsh5jt9bIz6hmH55RWjxSSE",
            authDomain: "kokogvin-f92bc.firebaseapp.com",
            databaseURL: "https://kokogvin-f92bc.firebaseio.com",
            storageBucket: "kokogvin-f92bc.appspot.com",
            messagingSenderId: "970455136824"
        };
        FirebaseFactory.dataService = Firebase.initializeApp(config);
    }

    public static getFirebaseRef(url) {
        FirebaseFactory.initApp();
        return FirebaseFactory.dataService.database().ref(url);
    }

    static logIn(password, errorCallback) {
        FirebaseFactory.initApp();
        this.dataService.auth().signInWithEmailAndPassword("trondvalen@gmail.com", password)
            .catch(function(error) {
                errorCallback(error);
        });
    }

    static logOut() {
        FirebaseFactory.initApp();
        this.dataService.auth().signOut();
    }

    static onAuth(callback) {
        FirebaseFactory.initApp();
        this.dataService.auth().onAuthStateChanged(function(user) { callback(user) });
    }
}
