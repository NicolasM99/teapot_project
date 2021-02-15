import React, { Component, useContext, useState, useEffect } from "react";
import Bienvenida from "./components/pages/Bienvenida.js";
import Categorias from "./components/pages/Categorias.js";
import MyNavbar2 from "./components/MyNavbar2.js";
import ParticlesScreen from "./components/ParticlesScreen";
import PrimerRegistro from "./components/pages/PrimerRegistro.js";
import Router from "./router/Router.js";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "react-pro-sidebar/dist/css/styles.css";
import {
  BrowserRouter,
  HashRouter,
  Redirect,
  Route,
  Switch,
  withRouter,
} from "react-router-dom";
import Perfil from "./components/pages/Perfil.js";

import withFirebaseAuth from "react-with-firebase-auth";

import {
  firebaseApp,
  auth,
  firestore,
  provider,
} from "./components/functions/Firebase.js";
import { UserProvider } from "./components/functions/UserProvider.js";
// import ComponentTester from "./ComponentTester.js";

const firebaseAppAuth = auth;

const App = ({ user }) => {
  const [publicUserData, setPublicUserData] = useState(null);
  const [data, setData] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const db = firestore;
  if (user) {
    db.collection("users")
      .doc(user.uid)
      .get()
      .then((doc) => {
        if (doc.exists) {
          if (!data) {
            setData(doc.data());
          }
        } else {
          // console.log("No se encontró el documento");
        }
        setLoaded(true);
      })
      .catch((error) => {
        // console.log("Error al obtener el documento: ", error);
      });
  } else {
    if (data) {
      setData(null);
      setLoaded(false);
    }
  }
  return (
    <UserProvider>
      <BrowserRouter>
        <div className="container-fluid">
          <ParticlesScreen
            style={{ position: "absolute" }}
            width="100%"
            height="100%"
          />
          <div className="row">
            <MyNavbar2 setPublicUserData={setPublicUserData} />
            {loaded && !data && user ? (
              <PrimerRegistro show_modal={true} />
            ) : null}
            <div className="col-lg-10 col-md-12 p-0">
              <div
                className="scrollContent"
                data-spy="scroll"
                data-target="#myNavbar"
                data-offset="0"
              >
                <Router
                  publicUserData={publicUserData}
                  setPublicUserData={setPublicUserData}
                />
              </div>
            </div>
          </div>
        </div>
      </BrowserRouter>
    </UserProvider>
  );
};

export default withFirebaseAuth({
  provider,
  firebaseAppAuth,
})(App);
