import * as Firebase from 'firebase';

export class FirebaseFactory {

    static dataService = null;

    static initApp() {
        if (FirebaseFactory.dataService != null) return;

        var config = {
            apiKey: "AIzaSyCIO8byvnKVyB7fC-9KPySuSFvrJUdfk6w",
            authDomain: "test-heroes-9b13f.firebaseapp.com",
            databaseURL: "https://test-heroes-9b13f.firebaseio.com",
            storageBucket: "test-heroes-9b13f.appspot.com",
        };
        // var config = {
        //   apiKey: "AIzaSyB7rqRVUb2L84B52gfKniBqGkGOzJf0JtA",
        //   authDomain: "blinding-fire-2931.firebaseapp.com",
        //   databaseURL: "https://blinding-fire-2931.firebaseio.com",
        //   storageBucket: "blinding-fire-2931.appspot.com",
        // };
        FirebaseFactory.dataService = Firebase.initializeApp(config);

        FirebaseFactory.logIn("password"); //TODO les dette fra bruker
    }

    public static getFirebaseRef(url) {
        FirebaseFactory.initApp();
        return FirebaseFactory.dataService.database().ref(url);
    }

    static logIn(password) {
        FirebaseFactory.initApp();
        this.dataService.auth().signInWithEmailAndPassword("trondvalen@gmail.com", password).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(error);
        });
    }

    static logOut() {
        FirebaseFactory.initApp();
        this.dataService.auth().signOut().then(function() {
            console.log("Logged out");
        }, function(error) {
            console.log(error);
        });
    }

    static onAuth(callback) {
        FirebaseFactory.initApp();
        this.dataService.auth().onAuthStateChanged(function(user) {
            callback(user);
        });
    }
}
