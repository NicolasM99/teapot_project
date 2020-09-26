import React, { Component } from "react";
import Bienvenida from "./components/pages/Bienvenida.js";
import Categorias from "./components/pages/Categorias.js";
import MyNavbar2 from "./components/MyNavbar2.js";

import "react-pro-sidebar/dist/css/styles.css";
import { HashRouter, Redirect, Route } from "react-router-dom";
import Perfil from "./components/pages/Perfil.js";

import withFirebaseAuth from "react-with-firebase-auth";
import * as firebase from "firebase/app";
import "firebase/firebase-app.js";
import "firebase/firestore";
import "firebase/auth";
import firebaseConfig from "./components/functions/Firebase.js";

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

class App extends Component {
  render() {
    const { user, signOut, signInWithGoogle } = this.props;
    return (
      <HashRouter>
        <div className="container-fluid">
          <div className="row">
            <MyNavbar2
              user={user}
              signOut={signOut}
              signInWithGoogle={signInWithGoogle}
              db={db}
            />
            <div className="col-lg-10 col-md-12 p-0">
              <div
                className="scrollContent"
                data-spy="scroll"
                data-target="#myNavbar"
                data-offset="0"
              >
                <Route exact path="/">
                  <Redirect to="/inicio" />
                </Route>
                <Route exact path="/inicio" component={Bienvenida} />
                <Route exact path="/categorias" component={Categorias} />
                {user ? (
                  <Route
                    exact
                    path="/mi_perfil"
                    component={() => <Perfil user={user} db={db} />}
                  />
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </HashRouter>
    );
  }
  /**<HashRouter>
      <div className="container-fluid">
        <div className="row">
          <Navbar />
          <div className="col-lg-10 col-md-12 p-0">
            <Route exact path="/">
              <Redirect to="/inicio" />
            </Route>
            <Route exact path="/inicio" component={Bienvenida} />
            <Route exact path="/categorias" component={Categorias} />
          </div>
        </div>
      </div>
    </HashRouter> */
}

const firebaseAppAuth = firebaseApp.auth();
const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider(),
};

export default withFirebaseAuth({
  providers,
  firebaseAppAuth,
})(App);
/**/
//export default App;
