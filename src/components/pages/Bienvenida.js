import React, { useContext, useEffect, useRef, useState } from "react";
import { Col, Carousel, Image, Row } from "react-bootstrap";
import { Spring } from "react-spring/renderprops";
import { UserContext } from "../functions/UserProvider";
import "../styles/contenido.css";
import "../styles/loader.css";
import "../styles/bienvenidaStyle.css";
import { firestore, signInWithGoogle } from "../functions/Firebase.js";
import { Link } from "react-router-dom";
import MultimediaLogo from "../../img/logo_multimedia.png";

const Bienvenida = () => {
  const isMountedRef = useRef(null);
  const [data, setData] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(UserContext);
  const db = firestore;
  useEffect(() => {
    isMountedRef.current = true;
    if (db) {
      db.collection("categories")
        .get()
        .then((querySnapshot) => {
          if (querySnapshot && isMountedRef.current) {
            setData(querySnapshot.docs.map((doc) => doc.data()));
            setLoading(false);
            console.log(querySnapshot.docs.map((doc) => doc.data()));
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
            console.log(doc.data());
          }
        });
      //console.log(user.displayName);
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
                <Row>
                  <Col lg={10} className="mx-auto  paragraph">
                    <p className="parrafo text-center">
                      <b>Multifolio</b> es un espacio donde verás proyectos
                      realizados por estudiantes de{" "}
                      <b>Ingeniería en Multimedia</b> de la <b>UMNG</b>.
                    </p>
                  </Col>
                </Row>

                <Row className="justify-content-center">
                  <Carousel className="col-lg-4 p-0">
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
                  <Col lg={6} className="m-0  paragraph">
                    <Link to="/categorias" style={{ color: "inherit" }}>
                      <p className="parrafo align-items-center d-flex text-center h-100 ">
                        Estos proyectos están organizados por categorías para
                        que encuentres con mayor facilidad los de tu interés.
                        Presiona acá para ver todas las Categorías.
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
                            ¡Crea tu perfil ahora!
                          </p>
                        </Link>
                      </Col>
                    )}
                  </Row>
                )}
              </div>
            </div>
          </div>
        )}
      </Spring>
    );
};

export default Bienvenida;
