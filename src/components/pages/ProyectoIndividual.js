import React from "react";
import { Link } from "react-router-dom";
import { Spring } from "react-spring/renderprops";
import { Col, Row, Container } from "react-bootstrap";
import "../styles/contenido.css";

const ProyectoIndividual = ({ projectInfo }) => {
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
                <button className="btn btn-primary">
                  <b>Volver a las categorías</b>
                </button>
              </Link>
            </div>
            <div className="contenido">
              {projectInfo ? (
                <>
                  <h1 className="titulo">{projectInfo.title}</h1>
                  <div className="contenedor_parrafo mx-auto">
                    <Row className="row">
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
                  Parece que no has seleccionado un proyecto. Por favor, vuelve
                  a la lista de proyectos y selecciona uno.
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
