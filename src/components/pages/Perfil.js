import React, { useState, useEffect, useContext, useRef } from "react";
import { firestore } from "../functions/Firebase.js";
import "../styles/contenido.css";
import { Button, CardDeck, Container } from "react-bootstrap";
import { UserContext } from "../functions/UserProvider";
import "../styles/loader.css";
import { Spring } from "react-spring/renderprops";
import { Row, Col, Image } from "react-bootstrap";
import { LoremIpsum } from "./LoremIpsum";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAward,
  faBookReader,
  faBriefcase,
  faEnvelope,
  faFeather,
  faFeatherAlt,
  faFilePdf,
  faMedal,
  faPhone,
  faUserGraduate,
} from "@fortawesome/free-solid-svg-icons";
import CardCategoria from "../CardCategoria.js";
import CardProyecto from "../CardProyecto.js";

const Perfil = (functionProps) => {
  const isMountedRef = useRef(null);
  const [data, setData] = useState("");
  const [projectsData, setProjectsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(UserContext);
  const db = firestore;
  useEffect(() => {
    isMountedRef.current = true;
    if (functionProps.publicUserData) {
      setData(functionProps.publicUserData);
      setLoading(false);
      console.log("ENTRO ACA");
    } else if (user) {
      db.collection("users")
        .doc(user.uid)
        .get()
        .then((doc) => {
          if (doc && isMountedRef.current) {
            setData(doc.data());
            console.log("ENTRO ACA");
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
  useEffect(() => {
    if (data && data.id) {
      db.collection("projects")
        .doc(data.id)
        .get()
        .then((doc) => {
          if (doc) {
            setProjectsData(doc.data());
            console.log("ENTRO ACA");
          }
        });
    }
    setLoading(false);
  }, [data]);
  useEffect(() => {
    console.log("PROYECTOS: ", projectsData);
  }, [projectsData]);
  const userData = data;
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
            <>
              <div className="wrapper">
                <div className="contenido">
                  {userData ? (
                    <>
                      <h1 className="titulo">
                        {userData.show_nickname
                          ? userData.nickName
                          : userData.username}
                      </h1>
                      <Row className="px-2">
                        <Col xl={3} lg={4} md={8} className="px-1 mx-auto">
                          <Container
                            className="col-12 mx-auto py-2"
                            style={{
                              margin: 0,
                              position: "sticky",
                              top: 0,
                            }}
                          >
                            {userData.show_photo ? (
                              <Image
                                src={userData.photo}
                                alt="profilePic"
                                className="col-12 p-0"
                                style={{
                                  objectFit: "cover",
                                  borderTopRightRadius: "30px",
                                  borderBottomLeftRadius: "30px",
                                  margin: "auto",
                                  marginBottom: "10px",
                                  backgroundColor: "rgba(255,255,255,0.1)",
                                }}
                              />
                            ) : null}
                            <div className="text-center">
                              <h1 style={styles.titulo}>Contacto</h1>

                              {userData.show_email && userData.email !== "" ? (
                                <p style={{ fontSize: "0.8rem" }}>
                                  <FontAwesomeIcon icon={faEnvelope} />{" "}
                                  {userData.email}
                                </p>
                              ) : null}

                              {userData.show_phone && userData.phone !== "" ? (
                                <p style={{ fontSize: "0.8rem" }}>
                                  <FontAwesomeIcon icon={faPhone} />{" "}
                                  {userData.phone}
                                </p>
                              ) : null}
                            </div>
                          </Container>
                        </Col>
                        <Col xl={9} lg={8} className="px-1 h-100">
                          <Container
                            className="col-12 p-4"
                            style={{
                              margin: 0,
                              backgroundColor: "rgba(0,0,0,0.5)",
                            }}
                          >
                            {userData.show_st_or_grad ? (
                              <>
                                {userData.student ? (
                                  <>
                                    <h1 style={styles.titulo}>
                                      <FontAwesomeIcon icon={faBookReader} />{" "}
                                      Estudiante
                                      {userData.show_semester ? (
                                        <>
                                          , actualmente en {userData.semester}{" "}
                                          semestre
                                        </>
                                      ) : null}
                                    </h1>
                                  </>
                                ) : (
                                  <>
                                    <h1 style={styles.titulo}>
                                      <FontAwesomeIcon icon={faUserGraduate} />{" "}
                                      Egresado
                                    </h1>
                                  </>
                                )}
                              </>
                            ) : null}

                            {userData.show_bio && userData.bio !== "" ? (
                              <div>
                                <h1 style={styles.titulo}>
                                  <FontAwesomeIcon icon={faFeatherAlt} />{" "}
                                  Biografía:
                                </h1>{" "}
                                <p>{userData.bio}</p>
                              </div>
                            ) : null}
                            {userData.show_exp && userData.exp !== "" ? (
                              <div>
                                <h1 style={styles.titulo}>
                                  <FontAwesomeIcon icon={faBriefcase} />{" "}
                                  Experiencia laboral:
                                </h1>{" "}
                                <p>{userData.exp}</p>
                              </div>
                            ) : null}
                            {userData.show_certificates &&
                            userData.certificate.length > 0 ? (
                              <div>
                                <h1 style={styles.titulo}>
                                  <FontAwesomeIcon icon={faAward} />{" "}
                                  Certificados:
                                </h1>
                                {userData.certificate.map((item) => (
                                  <p style={styles.parrafo}>
                                    <a
                                      style={{ color: "darkgray" }}
                                      href={item}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                    >
                                      <FontAwesomeIcon icon={faFilePdf} />{" "}
                                      {item
                                        .substring(
                                          item.lastIndexOf("_certificate_"),
                                          item.indexOf(".pdf")
                                        )
                                        .replace("_certificate_", "")
                                        .replace(/%20/g, " ")}
                                    </a>
                                  </p>
                                ))}
                              </div>
                            ) : null}
                          </Container>

                          <Container
                            className="col-12 mt-1 p-4"
                            style={{
                              margin: 0,
                              backgroundColor: "rgba(0,0,0,0.5)",
                            }}
                          >
                            <h1 style={styles.titulo} className="text-center">
                              <b>PROYECTOS</b>
                            </h1>
                            {projectsData &&
                            projectsData.projects.length > 0 ? (
                              <CardDeck>
                                {projectsData.projects.map((item) => (
                                  <CardProyecto
                                    title={item.title}
                                    image={item.image}
                                    link={item.link}
                                    description={item.description}
                                    setProjectInfo={
                                      functionProps.setProjectInfo
                                    }
                                  />
                                ))}
                              </CardDeck>
                            ) : (
                              <p className="text-center">
                                Aún no ha publicado proyectos
                              </p>
                            )}
                            <p>{LoremIpsum}</p>
                          </Container>
                        </Col>
                      </Row>
                    </>
                  ) : (
                    <div
                      className="col-12 align-items-center"
                      style={{ textAlign: "center" }}
                    >
                      <h1 style={styles.titulo}>
                        Parece que no has creado un perfil. ¡Es un buen momento
                        para crearlo!
                      </h1>
                      {console.log(loading)}
                      <Button variant="success" href="#crear_perfil">
                        Crear perfil
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </>
          </div>
        )}
      </Spring>
    );
  }
};
const styles = {
  parrafo: {
    color: "darkgray",
  },
  titulo: {
    fontFamily: "Raleway",
    fontWeight: "bold",
    color: "#07b897",
  },
};
export default Perfil;
