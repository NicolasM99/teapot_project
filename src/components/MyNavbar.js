import React, { Component, useState } from "react";
/*
//import { Link } from "react-router-dom";
import {
  Navbar,
  Nav,
  NavItem,
  NavDropdown,
  DropwdownButton,
  MenuItem,
  CollapsibleNav,
} from "react-bootstrap";
import logo from "../img/logo_multifolio2Recurso 3.png";
import withFirebaseAuth from "react-with-firebase-auth";
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "../Firebase.js";
import NombreFoto from "./NombreFoto";
import "./styles/navbar.css";
import "./styles/scroll.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBriefcase,
  faHome,
  faInfoCircle,
  faListAlt,
  faSearch,
  faSignInAlt,
  faSignOutAlt,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import Bienvenida from "./pages/Bienvenida.js";
import Categorias from "./pages/Categorias.js";

const firebaseApp = firebase.initializeApp(firebaseConfig);

class MyNavbar extends Component {
  render() {
    const { user, signOut, signInWithGoogle } = this.props;
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-2 col-md-12 p-0">
            <nav
              className="shadow-lg navbar fixed-bottom navbar-dark navbar-expand-lg navbar-custom py-3 px-0 "
              id="myNavbar"
            >
              <div className="brandContainer text-center p-0">
                <a className="navbar-brand m-0" href="#inicio">
                  <div className="text-center">
                    <img
                      className="multifolioLogo col-lg-8 mb-2"
                      src={logo}
                      alt="logo_multifolio"
                      style={{ display: "inline-block" }}
                    />
                  </div>
                  <h1 className="brandTitle">MULTIFOLIO</h1>
                </a>
              </div>
              <button
                className="navbar-toggler mr-3"
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>

              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              >
                <ul className="navbar-nav flex-column mx-auto">
                  {user ? (
                    <div className="dropdown">
                      <button
                        className="btn btn-secondary d-flex dropdown-toggle align-items-center p-1 text-center"
                        data-toggle="dropdown"
                        type="button"
                        style={{ lineHeight: "45px" }}
                      >
                        <NombreFoto
                          nombre={user.displayName}
                          photo={user.photoURL}
                        />
                      </button>
                      <div
                        className="dropdown-menu  position-absolute"
                        style={{ fontSize: "1.2em" }}
                      >
                        <a className="dropdown-item" href="#mi_perfil">
                          <FontAwesomeIcon icon={faUser} /> Mi perfil
                        </a>
                        <a className="dropdown-item" href="#mis_proyectos">
                          <FontAwesomeIcon icon={faBriefcase} /> Mis proyectos
                        </a>
                        <a href="#inicio">
                          <div
                            className="dropdown-item"
                            onClick={signOut}
                            style={{ cursor: "pointer" }}
                          >
                            <FontAwesomeIcon icon={faSignOutAlt} /> Cerrar
                            sesión
                          </div>
                        </a>
                      </div>
                    </div>
                  ) : (
                    <div></div>
                  )}

                  <li className="text-center">
                    {user ? (
                      <div></div>
                    ) : (
                      <button
                        type="button"
                        className="btn btn-success btn-lg my-2 mb-1"
                        onClick={signInWithGoogle}
                      >
                        <FontAwesomeIcon icon={faSignInAlt} /> Iniciar sesión
                      </button>
                    )}
                  </li>
                  <li className="nav-item mt-2 ml-4">
                    <a className="nav-link" href="#inicio">
                      <h4>
                        <FontAwesomeIcon icon={faHome} /> Inicio
                      </h4>
                    </a>
                  </li>
                  <li className="nav-item ml-4">
                    <a className="nav-link" href="#categorias">
                      <h4>
                        <FontAwesomeIcon icon={faListAlt} /> Categorias
                      </h4>
                    </a>
                  </li>
                  <li className="nav-item ml-4">
                    <a className="nav-link" href="#buscar">
                      <h4>
                        <FontAwesomeIcon icon={faSearch} /> Buscar
                      </h4>
                    </a>
                  </li>
                  <li className="nav-item ml-4">
                    <a className="nav-link" href="#acerca_de">
                      <h4>
                        <FontAwesomeIcon icon={faInfoCircle} /> Acerca de...
                      </h4>
                    </a>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
          <div className="col-lg-10 col-md-12">
            <div
              className="scrollContent"
              data-spy="scroll"
              data-target="#myNavbar"
              data-offset="0"
            >
              <div id="inicio">
                <Bienvenida />
              </div>
              <div id="categorias">
                <Categorias />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const firebaseAppAuth = firebaseApp.auth();
const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider(),
};

export default withFirebaseAuth({
  providers,
  firebaseAppAuth,
})(MyNavbar);
*/
