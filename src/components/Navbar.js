import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from "../img/logo_multifolio2Recurso 3.png";
import withFirebaseAuth from "react-with-firebase-auth";
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "../Firebase.js";
import NombreFoto from "./NombreFoto";
import "./estilos/navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBriefcase,
  faHome,
  faInfo,
  faInfoCircle,
  faListAlt,
  faSearch,
  faSignInAlt,
  faSignOutAlt,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

const firebaseApp = firebase.initializeApp(firebaseConfig);

class Navbar extends Component {
  render() {
    const { user, signOut, signInWithGoogle } = this.props;
    return (
      <div className="col-lg-2 col-md-12 p-0">
        <nav
          className="shadow-lg navbar navbar-dark navbar-expand-lg navbar-custom py-3 px-0 "
          role="navigation"
        >
          <button
            className="navbar-toggler ml-3"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav flex-column mx-auto">
              <li className="nav-item">
                <div
                  className="brandContainer text-center p-0"
                  style={{
                    borderBottom: "1px solid rgba(255,255,255,0.3)",
                    marginBottom: "15px",
                  }}
                >
                  <Link className="navbar-brand m-0" to="/inicio">
                    <div className="text-center mt-5">
                      <img
                        className="multifolioLogo col-lg-8 mb-2"
                        src={logo}
                        alt="logo_multifolio"
                        style={{ display: "inline-block" }}
                      />
                    </div>
                    <h1
                      style={{
                        textAlign: "center",
                        fontFamily: "Raleway",
                        fontWeight: "bold",
                        fontSize: "0.9em",
                      }}
                    >
                      MULTIFOLIO
                    </h1>
                  </Link>
                </div>
              </li>

              {user ? (
                <div className="dropdown mx-auto">
                  <button
                    className="btn btn-secondary d-flex  dropdown-toggle align-items-center p-1 text-center"
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
                    <Link className="dropdown-item" to="/mi_perfil">
                      <FontAwesomeIcon icon={faUser} /> Mi perfil
                    </Link>
                    <Link className="dropdown-item" to="/mis_proyectos">
                      <FontAwesomeIcon icon={faBriefcase} /> Mis proyectos
                    </Link>
                    <Link to="/inicio">
                      <div
                        className="dropdown-item"
                        onClick={signOut}
                        style={{ cursor: "pointer" }}
                      >
                        <FontAwesomeIcon icon={faSignOutAlt} /> Cerrar sesión
                      </div>
                    </Link>
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
                <Link className="nav-link" to="/inicio">
                  <h4>
                    <FontAwesomeIcon icon={faHome} /> Inicio
                  </h4>
                </Link>
              </li>
              <li className="nav-item ml-4">
                <Link className="nav-link" to="/categorias">
                  <h4>
                    <FontAwesomeIcon icon={faListAlt} /> Categorias
                  </h4>
                </Link>
              </li>
              <li className="nav-item ml-4">
                <Link className="nav-link" to="/buscar">
                  <h4>
                    <FontAwesomeIcon icon={faSearch} /> Buscar
                  </h4>
                </Link>
              </li>
              <li className="nav-item ml-4">
                <Link className="nav-link" to="/acerca_de">
                  <h4>
                    <FontAwesomeIcon icon={faInfoCircle} /> Acerca de...
                  </h4>
                </Link>
              </li>
            </ul>
          </div>
        </nav>
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
})(Navbar);
