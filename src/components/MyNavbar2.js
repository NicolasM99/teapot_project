import React, { Component, useState } from "react";
import { Navbar, Nav } from "react-bootstrap";
import logo from "../img/logo_multifolio2Recurso 3.png";
import withFirebaseAuth from "react-with-firebase-auth";
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "../Firebase.js";
import NombreFoto from "./NombreFoto";
import "./styles/navbar2.css";
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
import PrimerRegistro from "./pages/PrimerRegistro.js";

const firebaseApp = firebase.initializeApp(firebaseConfig);

class MyNavbar2 extends Component {
  constructor(props) {
    super(props);
    this.state = { deps: [], addModalShow: false };
  }
  render() {
    const addModalClose = () => {
      this.setState({ addModalShow: false });
    };
    const { user, signOut, signInWithGoogle } = this.props;
    return (
      <>
        <Navbar
          collapseOnSelect={true}
          expand="lg"
          fixed="bottom"
          className="my-navbar p-0 col-lg-2 shadow-lg"
        >
          <div className="brandContainer text-center p-0">
            <Navbar.Brand className="mx-0" href="#inicio">
              <div className="text-center">
                <img
                  className="multifolioLogo col-lg-8 mb-2"
                  src={logo}
                  alt="logo_multifolio"
                  style={{ display: "inline-block" }}
                />
              </div>
              <h1 className="brandTitle">MULTIFOLIO</h1>
            </Navbar.Brand>
          </div>
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            className="mr-3"
            style={{ borderColor: "#fff" }}
          />

          <Navbar.Collapse id="my-navbar col-6">
            <Nav className="flex-column ">
              {user ? (
                <div className="dropdown align-self-center mb-2">
                  <button
                    className="btn btn-outline-secondary d-flex dropdown-toggle align-items-center p-2 text-center"
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
                        <FontAwesomeIcon icon={faSignOutAlt} /> Cerrar sesión
                      </div>
                    </a>
                  </div>
                </div>
              ) : (
                <div></div>
              )}
              {user ? (
                <div></div>
              ) : (
                <button
                  type="button"
                  className="btn btn-success btn-lg my-2 mx-auto"
                  onClick={signInWithGoogle}
                  style={{ textTransform: "none" }}
                >
                  <FontAwesomeIcon icon={faSignInAlt} /> Iniciar sesión
                </button>
              )}
              <Nav.Link href="#inicio">
                <FontAwesomeIcon icon={faHome} /> Inicio
              </Nav.Link>
              <Nav.Link href="#categorias">
                <FontAwesomeIcon icon={faListAlt} /> Categorias
              </Nav.Link>
              <Nav.Link href="#buscar">
                <FontAwesomeIcon icon={faSearch} /> Buscar
              </Nav.Link>
              <Nav.Link href="#acerca_de">
                <FontAwesomeIcon icon={faInfoCircle} /> Acerca de...
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        {user ? (
          <PrimerRegistro
            nombre={user.displayName}
            email={user.email}
            photo={user.photoURL}
            tel=""
            mostrar={true}
          />
        ) : (
          <></>
        )}
      </>
    );
  }
}
/*<PrimerRegistro
            nombre={user.displayName}
            email={user.email}
            photo={user.photoURL}
            tel=""
          />*/
const firebaseAppAuth = firebaseApp.auth();
const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider(),
};

export default withFirebaseAuth({
  providers,
  firebaseAppAuth,
})(MyNavbar2);
