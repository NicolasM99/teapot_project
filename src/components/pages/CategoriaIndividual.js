import React, { useContext, useEffect, useRef, useState } from "react";
import { firestore } from "../functions/Firebase.js";
import { Button, CardDeck, Col, Modal, Row } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { Spring } from "react-spring/renderprops";
import "../styles/contenido.css";
import { UserContext } from "../functions/UserProvider.js";
import CardProyecto from "../CardProyecto.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faListAlt,
  faPencilAlt,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { ROUTES } from "../../constants/routes.js";

const CategoriaIndividual = ({ categoryInfo, setProjectInfo }) => {
  const isMountedRef = useRef(null);
  const history = useHistory();
  const [userData, setUserData] = useState(null);
  const [filteredData, setFilteredData] = useState(null);
  const [projectsData, setProjectsData] = useState(null);
  const [categories, setCategories] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(UserContext);
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteID, setDeleteID] = useState(null);

  const db = firestore;
  useEffect(() => {
    // // console.log("categoryinfo: ", categoryInfo);
    isMountedRef.current = true;
    if (user) {
      db.collection("users")
        .doc(user.uid)
        .get()
        .then((doc) => {
          if (doc && isMountedRef.current) {
            setUserData(doc.data());
            // console.log("ENTRO ACA");
          }
          setLoading(false);
        });
    }
    if (categoryInfo) {
      db.collection("categories")
        .doc(categoryInfo.id)
        .get()
        .then((doc) => {
          if (doc && isMountedRef.current) {
            setFilteredData(doc.data().projects);
          }
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
    return () => (isMountedRef.current = false);
  }, [db]);
  const handleDeleteCategory = (id) => {
    // console.log(id);
    if (id) {
      db.collection("categories")
        .doc(id)
        .delete()
        .then(() => {
          // console.log("Se elimino la CATEGORÍA");
        })
        .catch((error) => console.error("Error al borrar el documento:", error))
        .then(() => {
          history.push(ROUTES.CATEGORIES);
          window.location.reload();
        });
    }
  };
  const handleClose = () => setShowConfirm(false);

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
                <Modal
                  show={showConfirm}
                  size="sm"
                  aria-labelledby="contained-modal-title-vcenter"
                  centered
                  onHide={handleClose}
                >
                  <Modal.Header closeButton>
                    <Modal.Title>Confirmación</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <p>¿Seguro que deseas eliminar a esta categoría?</p>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button
                      style={{ textTransform: "none" }}
                      variant="success"
                      onClick={() => handleDeleteCategory(deleteID)}
                    >
                      Sí
                    </Button>
                    <Button
                      style={{ textTransform: "none" }}
                      variant="danger"
                      onClick={() => setShowConfirm(false)}
                    >
                      No
                    </Button>
                  </Modal.Footer>
                </Modal>
                <Row>
                  <Col className="text-left">
                    {categoryInfo && userData && userData.admin && (
                      <div>
                        <Link to={ROUTES.EDIT_CATEGORY}>
                          <Button className="m-1" variant="success">
                            <b>Editar categoría </b>
                            <FontAwesomeIcon icon={faPencilAlt} />
                          </Button>
                        </Link>
                        <Button
                          onClick={() => {
                            setShowConfirm(true);
                            setDeleteID(categoryInfo.id);
                          }}
                          className="m-1"
                          variant="danger"
                        >
                          <b>Eliminar categoría </b>
                          <FontAwesomeIcon icon={faTrash} />
                        </Button>
                      </div>
                    )}
                  </Col>
                  <Col className="text-right">
                    <Link to={ROUTES.CATEGORIES}>
                      <Button variant="primary">
                        <FontAwesomeIcon icon={faListAlt} /> <b>categorías</b>
                      </Button>
                    </Link>
                  </Col>
                </Row>

                {categoryInfo ? (
                  <>
                    <h1 className="titulo mt-4">{categoryInfo.title}</h1>
                    <div className="contenedor_parrafo mx-auto">
                      <Row className="align-items-center">
                        <Col lg={6}>
                          <img
                            className="w-100"
                            src={categoryInfo.image}
                            alt="category_image"
                            style={{
                              borderRadius: "20px",
                            }}
                          />
                        </Col>
                        <Col lg={6}>
                          <p className="parrafo text-center w-100">
                            {categoryInfo.description}
                          </p>
                        </Col>
                      </Row>
                      <Row className="justify-content-center">
                        <h1
                          style={styles.titulo}
                          className="text-center w-100 mt-5"
                        >
                          <b>PROYECTOS</b>
                        </h1>
                        {filteredData && filteredData.length > 0 ? (
                          <CardDeck>
                            {filteredData.map((project) => (
                              <CardProyecto
                                authorID={project.authorID}
                                title={project.title}
                                image={project.image}
                                link={project.link}
                                description={project.description}
                                setProjectInfo={setProjectInfo}
                                category={categoryInfo.title}
                              />
                            ))}
                          </CardDeck>
                        ) : (
                          <p>Aún no hay proyectos en esta categoría.</p>
                        )}
                      </Row>
                    </div>
                  </>
                ) : (
                  <h2>
                    Parece que no has seleccionado una categoría. Por favor,
                    vuelve a la lista de categorías y selecciona una.
                  </h2>
                )}
              </div>
            </div>
          </div>
        )}
      </Spring>
    );
};
const styles = {
  titulo: {
    fontFamily: "Raleway",
    fontWeight: "bold",
    color: "#07b897",
  },
};

export default CategoriaIndividual;
