import React, { useState, useEffect, useContext, useRef } from "react";
import { firestore } from "../functions/Firebase.js";
import { Spring } from "react-spring/renderprops";
import { UserContext } from "../functions/UserProvider";
import CardCategoria from "../CardCategoria";
import "../styles/loader.css";
import "../styles/contenido.css";
import plusIcon from "../../img/plus_icon.png";

import { Card, CardColumns, CardGroup, CardDeck } from "react-bootstrap";
import { ProcessBubbleType } from "react-particles-js";

const Categorias = ({ setCategoryInfo }) => {
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
  } else {
    return (
      <Spring
        from={{ opacity: 0, marginTop: -40 }}
        to={{ opacity: 1, marginTop: 0 }}
      >
        {(props) => (
          <div style={props}>
            <div className="contenido">
              <h1 className="titulo">CATEGORÍAS</h1>
              <p className="parrafo">
                Descubre los proyectos de estas diferentes categorías
              </p>
            </div>
            {/* <div className="row"> */}
            <CardDeck>
              {userData && userData.admin ? (
                <CardCategoria
                  title="Nueva categoría"
                  image={plusIcon}
                  link="nueva_categoria"
                  setCategoryInfo={setCategoryInfo}
                />
              ) : (
                user && (
                  <CardCategoria
                    title="Solicitar categoría"
                    image={plusIcon}
                    link="solicitar_categoria"
                    setCategoryInfo={setCategoryInfo}
                  />
                )
              )}

              {data &&
                data.map((id) => (
                  <CardCategoria
                    title={id.title}
                    image={id.image}
                    link={id.link}
                    description={id.description}
                    setCategoryInfo={setCategoryInfo}
                  />
                ))}
            </CardDeck>

            {/* </div> */}

            {/* <Row>
              <Col xs={12} lg={6} className="mx-auto">
                <div className="card-body d-flex justify-content-center">
                  <div className="cardContainer">
                    <Link to="categoria_produccion_3d">
                      <Card className="bg-dark text-white cardSize">
                        <Card.Img

                          hover
                          overlay="white-slight"
                          id="produccion3d"
                        />
                        <Card.ImgOverlay className="d-flex align-items-end ">
                          <Card.Title className="cardTitle">
                            PRODUCCIÓN 3D
                          </Card.Title>
                        </Card.ImgOverlay>
                      </Card>
                    </Link>
                  </div>
                </div>
              </Col>

              <Col xs={12} lg={6}>
                <div className="card-body d-flex justify-content-center">
                  <div className="cardContainer">
                    <Link to="categoria_desarrollo">
                      <Card className="bg-dark text-white cardSize">
                        <Card.Img
                          className="cardImage"

                          id="desarrollo"
                        />
                        <Card.ImgOverlay className="d-flex align-items-end ">
                          <Card.Title className="cardTitle">
                            DESARROLLO
                          </Card.Title>
                        </Card.ImgOverlay>
                      </Card>
                    </Link>
                  </div>
                </div>
              </Col>
            </Row>

            <Row>
              <Col xs={12} lg={6}>
                <div className="card-body d-flex justify-content-center">
                  <div className="cardContainer">
                    <Link to="categoria_produccion_audiovisual">
                      <Card className="bg-dark text-white cardSize">
                        <Card.Img
                          className="cardImage"
                          id="produccionAudiovisual"
                        />
                        <Card.ImgOverlay className="d-flex align-items-end ">
                          <Card.Title className="cardTitle">
                            PRODUCCIÓN AUDIOVISUAL
                          </Card.Title>
                        </Card.ImgOverlay>
                      </Card>
                    </Link>
                  </div>
                </div>
              </Col>
              <Col xs={12} lg={6}>
                <div className="card-body d-flex justify-content-center">
                  <div className="cardContainer">
                    <Link to="categoria_diseno">
                      <Card className="bg-dark text-white cardSize">
                        <Card.Img className="cardImage" id="diseño" />
                        <Card.ImgOverlay className="d-flex align-items-end ">
                          <Card.Title className="cardTitle">DISEÑO</Card.Title>
                        </Card.ImgOverlay>
                      </Card>
                    </Link>
                  </div>
                </div>
              </Col>
            </Row> */}
          </div>
        )}
      </Spring>
    );
  }
};

export default Categorias;
