import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Spring } from "react-spring/renderprops";
import { Col, Row, Container, Image, Button } from "react-bootstrap";
import "../styles/contenido.css";
import { UserContext } from "../functions/UserProvider";
import { firestore } from "../functions/Firebase.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListAlt } from "@fortawesome/free-solid-svg-icons";

const ProyectoIndividual = ({ projectInfo, setPublicUserData }) => {
  const isMountedRef = useRef(null);
  const [userData, setUserData] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filteredData, setFilteredData] = useState(null);
  const [receivedData, setReceivedData] = useState(null);
  const db = firestore;
  useEffect(() => {
    isMountedRef.current = true;
    if (projectInfo && db) {
      db.collection("users")
        .doc(projectInfo.authorID)
        .get()
        .then((doc) => {
          if (doc && isMountedRef.current) {
            setUserData(doc.data());
            // console.log(doc.data());
          }
          setLoading(false);
        });
      // //console.log(user.displayName);
    } else {
      setLoading(false);
    }
    return () => (isMountedRef.current = false);
  }, [projectInfo, db]);
  useEffect(() => {
    // if (userData) console.log("AUTOR: ", userData);
  }, [userData]);
  const handleUserProfile = (id) => {
    setPublicUserData(id);
  };
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
              <div className="text-right">
                <Link to="/categorias">
                  <Button variant="primary">
                    <FontAwesomeIcon icon={faListAlt} /> <b>categorías</b>
                  </Button>
                </Link>
              </div>
              <div className="contenido">
                {projectInfo && userData ? (
                  <>
                    <h1 className="titulo">{projectInfo.title}</h1>
                    <div className="contenedor_parrafo mx-auto">
                      <Row className="mb-3">
                        <Col className="d-flex pr-2 justify-content-center align-items-center">
                          <h4>
                            <b>Autor:</b>
                          </h4>
                          <Link
                            style={{ color: "#07b897" }}
                            to="/perfil"
                            onClick={() => handleUserProfile(userData)}
                            className="flex-row pl-2 d-flex align-items-center"
                          >
                            {userData.show_photo === true && (
                              <Image
                                src={userData.photo}
                                alt="user_photo"
                                style={{
                                  borderRadius: "50%",
                                  marginRight: "10px",
                                  objectFit: "cover",
                                }}
                                width="80px"
                                height="80px"
                              />
                            )}

                            <h4>{userData.nickName}</h4>
                          </Link>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg={6}>
                          <p className="parrafo">{projectInfo.description}</p>
                        </Col>
                        <Col lg={6}>
                          <img
                            className="col-12"
                            src={projectInfo.image}
                            alt="project_image"
                          />
                        </Col>
                      </Row>
                    </div>
                  </>
                ) : (
                  <h2>
                    Parece que no has seleccionado un proyecto. Por favor,
                    vuelve a la lista de proyectos y selecciona uno.
                  </h2>
                )}
              </div>
            </div>
          </div>
        )}
      </Spring>
    );
};

export default ProyectoIndividual;
