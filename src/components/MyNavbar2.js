import React, { useContext, useState, useEffect, useRef } from "react";
import { UserContext } from "./functions/UserProvider.js";
import { signOut, signInWithGoogle, firestore } from "./functions/Firebase.js";
import { Navbar, Nav, Dropdown } from "react-bootstrap";
import logo from "../img/logo_con_gradiente.png";
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
  faStream,
  faUsersCog,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const MyNavbar2 = (props) => {
  const { user } = useContext(UserContext);
  const isMountedRef = useRef(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const db = firestore;

  useEffect(() => {
    isMountedRef.current = true;
    if (user) {
      setLoading(true);
      db.collection("users")
        .doc(user.uid)
        .get()
        .then((doc) => {
          if (doc && isMountedRef.current) {
            setData(doc.data());
            setLoading(false);
            // console.log(doc.data());
          }
        });
      //console.log(user.displayName);
    } else {
      if (data) {
        //setData(null);
      }
      setLoading(false);
    }
    //setLoading(false);
    return () => (isMountedRef.current = false);
  }, [user, db]);

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
            <div className="logo_container text-center">
              <img
                className="multifolioLogo"
                src={logo}
                alt="logo_multifolio"
                style={{
                  display: "flex",
                }}
              />
            </div>
            <h1 className="brandTitle m-0">MULTIFOLIO</h1>
          </Navbar.Brand>
        </div>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          className="navbar-dark mr-3"
          style={{ borderColor: "#fff" }}
        />

        <Navbar.Collapse id="my-navbar col-6">
          <Nav className="flex-column ">
            {!loading && user ? (
              <Dropdown className="dropdown align-self-center mb-2">
                <Dropdown.Toggle
                  className="d-flex dropdown-toggle align-items-center justify-content-between p-2 text-center"
                  style={{ lineHeight: "45px" }}
                >
                  <NombreFoto
                    name={data ? data.nickName : user.displayName}
                    photo={data ? data.photo : user.photoURL}
                  />
                </Dropdown.Toggle>
                <Dropdown.Menu
                  className="position-absolute"
                  style={{ fontSize: "1.2em" }}
                >
                  <Dropdown.Item
                    onClick={() => props.setPublicUserData(null)}
                    href="#perfil"
                  >
                    <FontAwesomeIcon icon={faUser} /> Mi perfil
                  </Dropdown.Item>
                  <Dropdown.Item href="#mis_proyectos">
                    <FontAwesomeIcon icon={faBriefcase} /> Mis proyectos
                  </Dropdown.Item>

                  {data && data.admin && (
                    <>
                      {/* <Dropdown.Item href="#solicitudes_proyectos">
                        <FontAwesomeIcon icon={faStream} /> Solicitudes
                      </Dropdown.Item> */}
                      <Dropdown.Item href="#usuarios">
                        <FontAwesomeIcon icon={faUsersCog} /> Usuarios
                      </Dropdown.Item>
                    </>
                  )}

                  <Dropdown.Item href="#inicio">
                    <div
                      onClick={() => {
                        signOut();
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      <FontAwesomeIcon icon={faSignOutAlt} /> Cerrar sesión
                    </div>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : loading ? (
              <div style={{ color: "#ffffff", textAlign: "center" }}>
                Cargando...
              </div>
            ) : null}
            {user ? (
              <div></div>
            ) : (
              <button
                type="button"
                className="btn btn-primary btn-lg my-2 mx-auto"
                onClick={signInWithGoogle}
                style={{
                  textTransform: "none",
                }}
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
    </>
  );
};

export default MyNavbar2;
