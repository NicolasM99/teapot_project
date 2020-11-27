import React, { useContext, useEffect, useRef, useState } from "react";
import { Col, Carousel, Image, Row } from "react-bootstrap";
import { Spring } from "react-spring/renderprops";
import { UserContext } from "../functions/UserProvider";
import "../styles/contenido.css";
import "../styles/loader.css";
import "../styles/bienvenidaStyle.css";
import { firestore, signInWithGoogle } from "../functions/Firebase.js";
import { Link } from "react-router-dom";
import MultifolioLogo from "../../img/logo_multifolio_sin_fondo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInfo,
  faInfoCircle,
  faListAlt,
  faSearch,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

const Bienvenida = () => {
  const isMountedRef = useRef(null);
  const [data, setData] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(UserContext);
  const db = firestore;
  // const scrollWithOffset = (el) => {
  //   const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
  //   const yOffset = 0;
  //   window.scrollTo({ top: yCoordinate + yOffset, behavior: "smooth" });
  // };
  useEffect(() => {
    isMountedRef.current = true;
    if (db) {
      db.collection("categories")
        .get()
        .then((querySnapshot) => {
          if (querySnapshot && isMountedRef.current) {
            setData(querySnapshot.docs.map((doc) => doc.data()));
            setLoading(false);
            // console.log(querySnapshot.docs.map((doc) => doc.data()));
          }
        });
    }
    if (user) {
      db.collection("users")
        .doc(user.uid)
        .get()
        .then((doc) => {
          if (doc && isMountedRef.current) {
            setUserData(doc.data());
            setLoading(false);
            // console.log(doc.data());
          }
        });
      // //console.log(user.displayName);
    } else {
      if (data) {
        //setData(null);
      }
    }

    return () => (isMountedRef.current = false);
  }, [user, db]);

  if (loading) {
    return (
      <>
        <div className="contenido">
          <h1 className="text-center">Cargando, por favor espera...</h1>
          <div className="loader" />
        </div>
      </>
    );
  } else
    return (
      <Spring
        from={{ opacity: 0, marginTop: -40 }}
        to={{ opacity: 1, marginTop: 0 }}
      >
        {(props) => (
          <div style={props}>
            <div className="wrapper">
              <div className="contenido">
                <Row>
                  <h1 className="titulo w-100">BIENVENIDO</h1>
                </Row>
                <Row className="justify-content-center">
                  <Col lg={3} className="paragraph text-center">
                    <Image
                      className="w-100 h-100"
                      src={MultifolioLogo}
                      alt="multi_logo"
                      style={{ objectFit: "contain", maxWidth: "15rem" }}
                    />
                  </Col>
                  <Col lg={7} className="paragraph">
                    <p className="parrafo text-center p-5">
                      <b>Multifolio</b> es un espacio donde verás proyectos
                      realizados por estudiantes de{" "}
                      <a
                        href="https://www.umng.edu.co/programas/pregrados/ingenieria-multimedia"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <b>Ingeniería en Multimedia</b>
                      </a>{" "}
                      de la{" "}
                      <a
                        href="https://umng.edu.co/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <b>UMNG</b>
                      </a>
                    </p>
                  </Col>
                </Row>

                <Row className="justify-content-center">
                  <Carousel className="col-lg-10 p-0">
                    {data &&
                      data.map((category) => (
                        <Carousel.Item className="text-center">
                          <Image
                            width="100%"
                            height="500rem"
                            src={category.image}
                            alt="category_image"
                            style={{
                              filter: "brightness(0.3)",
                              objectFit: "cover",
                            }}
                          />
                          <Carousel.Caption>
                            <h2
                              style={{
                                textTransform: "uppercase",
                                fontFamily: "Raleway",
                                fontWeight: "bold",
                              }}
                            >
                              {category.title}
                            </h2>
                          </Carousel.Caption>
                        </Carousel.Item>
                      ))}
                  </Carousel>
                </Row>
                <Row className="justify-content-center">
                  <Col
                    lg={5}
                    className="m-0 d-flex align-items-center paragraph"
                  >
                    <p className="parrafo align-items-center d-flex text-center h-100 ">
                      Estos proyectos están organizados por categorías para que
                      encuentres con mayor facilidad los de tu interés.
                    </p>
                  </Col>
                  <Col lg={5} className="m-0 welcomeButton">
                    <Link to="/categorias" style={{ textDecoration: "none" }}>
                      <p
                        className="parrafo text-center align-items-center d-flex justify-content-center h-100 text-center m-0 p-5"
                        style={{ color: "white" }}
                      >
                        <FontAwesomeIcon icon={faListAlt} className="mr-2" />
                        Ver todas las Categorías
                      </p>
                    </Link>
                  </Col>
                </Row>

                {!userData && (
                  <Row className="justify-content-center">
                    <Col lg={5} className="m-0 p-0">
                      <p className="parrafo m-0 h-100 text-center align-items-center d-flex text-center paragraph">
                        ¿Eres estudiante o egresado de esta carrera y quieres
                        publicar tus proyectos?
                      </p>
                    </Col>

                    {!user ? (
                      <Col lg={5} className="m-0 welcomeButton">
                        <p
                          onClick={signInWithGoogle}
                          className="parrafo text-center align-items-center justify-content-center m-0 d-flex text-center p-5"
                          style={{ color: "white" }}
                        >
                          <FontAwesomeIcon icon={faUser} className="mr-2" />{" "}
                          ¡Inicia sesión y crea tu perfil ahora!
                        </p>
                      </Col>
                    ) : (
                      <Col lg={5} className="m-0 welcomeButton">
                        <Link
                          to="/crear_perfil"
                          style={{ textDecoration: "none" }}
                        >
                          <p
                            className="parrafo text-center align-items-center d-flex justify-content-center text-center m-0 p-5"
                            style={{ color: "white" }}
                          >
                            <FontAwesomeIcon icon={faUser} className="mr-2" />{" "}
                            ¡Crea tu perfil ahora!
                          </p>
                        </Link>
                      </Col>
                    )}
                  </Row>
                )}
                <Row className="justify-content-center">
                  <Col lg={5} className="m-0 p-0">
                    <p className="parrafo m-0 h-100 text-center align-items-center d-flex text-center paragraph">
                      Si tienes el mente el nombre de un Usuario de Multifolio,
                      puedes buscarlo para ver su perfil.
                    </p>
                  </Col>
                  <Col lg={5} className="m-0 welcomeButton">
                    <Link to="/buscar" style={{ textDecoration: "none" }}>
                      <p
                        className="parrafo text-center align-items-center d-flex justify-content-center text-center m-0 p-5"
                        style={{ color: "white" }}
                      >
                        <FontAwesomeIcon icon={faSearch} className="mr-2" />{" "}
                        Buscar usuarios
                      </p>
                    </Link>
                  </Col>
                </Row>
                <Row className="justify-content-center">
                  <Col lg={5} className="m-0 p-0">
                    <p className="parrafo m-0 h-100 text-center align-items-center justify-content-center d-flex text-center paragraph">
                      ¿Quiénes realizaron este proyecto?
                    </p>
                  </Col>
                  <Col lg={5} className="m-0 welcomeButton">
                    <Link
                      // scroll={scrollWithOffset}
                      to="/acerca_de"
                      style={{ textDecoration: "none" }}
                    >
                      <p
                        className="parrafo text-center align-items-center d-flex justify-content-center text-center m-0 p-5"
                        style={{ color: "white" }}
                      >
                        <FontAwesomeIcon icon={faInfoCircle} className="mr-2" />{" "}
                        Saber más acerca de esta página
                      </p>
                    </Link>
                  </Col>
                </Row>
              </div>
            </div>
          </div>
        )}
      </Spring>
    );
};

export default Bienvenida;
