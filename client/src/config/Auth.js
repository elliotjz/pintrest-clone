import firebase from "firebase";
import authConfig from "./authConfig";

function sendUserToServer(result, callback) {
  console.log("function: sendUserToServer");
  const id = result.user.uid;
  const name = result.user.displayName;
  const img = result.user.photoURL;
  let requestData = `id=${id}&name=${name}&img=${img}`;

  const xhr = new XMLHttpRequest();
  xhr.open("post", "/api/create-user");
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.responseType = "json";
  xhr.addEventListener("load", () => {
    if (xhr.status === 200) {
      console.log("success... response 200!");
      localStorage.setItem("token", result.credential.accessToken);
      localStorage.setItem("id", result.user.uid);
      callback({
        user: result.user
      });
    }
  });
  xhr.send(requestData);
}

firebase.initializeApp(authConfig);

const googleProvider = new firebase.auth.GoogleAuthProvider();

class Auth {
  static googleLogin(callback) {
    firebase
      .auth()
      .signInWithPopup(googleProvider)
      .then(result => {
        sendUserToServer(result, callback);
      })
      .catch(error => {
        callback({
          errorMessage: error.code
        });
      });
  }

  static logout(callback) {
    firebase
      .auth()
      .signOut()
      .then(function() {
        localStorage.removeItem("token");
        localStorage.removeItem("id");
        callback();
      })
      .catch(function(error) {
        callback();
      });
  }

  static getUser(callback) {
    firebase.auth().onAuthStateChanged(user => {
      callback(user);
    });
  }
}

export default Auth;
