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
  faPencilAlt,
  faPhone,
  faUserGraduate,
  faUserShield,
} from "@fortawesome/free-solid-svg-icons";
import CardCategoria from "../CardCategoria.js";
import CardProyecto from "../CardProyecto.js";
import UserIcon from "../../img/user_icon.png";
import { Link } from "react-router-dom";
import EditarPerfil from "./EditarPerfil.js";

const Perfil = (functionProps) => {
  const isMountedRef = useRef(null);
  const [userData, setUserData] = useState("");
  const [filteredData, setFilteredData] = useState(null);
  const [projectsData, setProjectsData] = useState(null);
  const [categories, setCategories] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(UserContext);
  const [showEditModal, setShowEditModal] = useState(false);
  const db = firestore;
  useEffect(() => {
    isMountedRef.current = true;
    if (functionProps.publicUserData) {
      setUserData(functionProps.publicUserData);
      console.log("DATA DEL PERFIL", functionProps.publicUserData);
      console.log("ENTRO ACA");
    } else if (user) {
      db.collection("users")
        .doc(user.uid)
        .get()
        .then((doc) => {
          if (doc && isMountedRef.current) {
            setUserData(doc.data());
            console.log("ENTRO ACA");
          }
        });
    }
    db.collection("categories")
      .get()
      .then((querySnapshot) => {
        if (querySnapshot && isMountedRef.current) {
          setCategories(querySnapshot.docs.map((doc) => doc.data()));
        }
        setLoading(false);
      });
    return () => (isMountedRef.current = false);
  }, [user, db]);
  const filterProjects = () => {
    if (categories && userData) {
      setFilteredData(
        categories.map((category) =>
          category.projects.filter(
            (project) => project.authorID === userData.id
          )
        )
      );
    }
  };
  useEffect(() => {
    console.log("PROYECTOS", categories);
    filterProjects();
  }, [categories]);
  useEffect(() => {
    if (userData && userData.id) {
      db.collection("projects")
        .doc(userData.id)
        .get()
        .then((doc) => {
          if (doc) {
            setProjectsData(doc.data());
            console.log("ENTRO ACA");
          }
        });
    }
    setLoading(false);
  }, [userData]);
  useEffect(() => {
    console.log("PROYECTOS: ", projectsData);
  }, [projectsData]);

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
                  {userData && (
                    <EditarPerfil
                      showEditModal={showEditModal}
                      setShowEditModal={setShowEditModal}
                      existingData={userData}
                    />
                  )}

                  {userData ? (
                    <>
                      {user && userData.id === user.uid && (
                        <Button
                          className="mb-4"
                          onClick={() => setShowEditModal(true)}
                          variant="success"
                        >
                          <b>Editar perfil </b>
                          <FontAwesomeIcon icon={faPencilAlt} />
                        </Button>
                      )}

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
                            <Image
                              src={
                                userData.show_photo ? userData.photo : UserIcon
                              }
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
                            {userData.admin && (
                              <>
                                <h1 style={styles.titulo}>
                                  <FontAwesomeIcon icon={faUserShield} />{" "}
                                  Administrador
                                </h1>
                              </>
                            )}
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
                            {filteredData && categories && (
                              <CardDeck>
                                {filteredData.map((item, index) =>
                                  item.map((project) => (
                                    <CardProyecto
                                      authorID={project.authorID}
                                      title={project.title}
                                      image={project.image}
                                      link={project.link}
                                      description={project.description}
                                      setProjectInfo={
                                        functionProps.setProjectInfo
                                      }
                                      category={categories[index].title}
                                    />
                                  ))
                                )}
                              </CardDeck>
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
