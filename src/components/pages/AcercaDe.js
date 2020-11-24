import React from "react";
import { Carousel, Col, Image, Row } from "react-bootstrap";
import { Spring } from "react-spring/renderprops";
import "../styles/contenido.css";
import "../styles/acercaDeStyle.css";
import SebastianImg from "../../img/sebastian.jpg";
import NicolasImg from "../../img/nicolas.jpg";
import CarlosImg from "../../img/carlos.jpg";
import SergioImg from "../../img/sergio.jpg";
import KarenImg from "../../img/karen.jfif";
import MultifolioLogo from "../../img/logo_multifolio_sin_fondo.png";
import MultimediaLogo from "../../img/logo_multimedia.png";
import UmngLogo from "../../img/LOGO_UMNG.png";
const AcercaDe = () => {
  return (
    <Spring
      from={{ opacity: 0, marginTop: -40 }}
      to={{ opacity: 1, marginTop: 0 }}
    >
      {(props) => (
        <div style={props}>
          <div className="wrapper acercaDe">
            <h1 className="titulo w-100">ACERCA DE</h1>

            <div className="contenido ">
              <Row className="p-2 col-sm-10 col-xl-6  mx-auto">
                <Col
                  xs={8}
                  md={4}
                  xl={4}
                  className="text-center mx-auto align-self-center"
                >
                  <Image
                    className="w-100 p-3"
                    src={MultifolioLogo}
                    alt="multi_logo"
                  />
                </Col>
                <Col
                  xs={12}
                  md={6}
                  xl={8}
                  className="align-items-center d-flex"
                >
                  <p className="my-3  w-100 mx-auto text-center">
                    Multifolio fue realizado por estudiantes de Ingeniería en
                    Multimedia de la Universidad Militar Nueva Granada, como
                    proyecto de las materias Gestión Integral de Proyectos y
                    Tecnologías de Internet, a cargo de la Docente Karen Linares
                    Luque.
                  </p>
                </Col>
              </Row>
              <Row className="justify-content-center p-2">
                <Col className="parent" lg={6}>
                  <Col xs={4} lg={5}>
                    <Image alt="user_photo" src={KarenImg} />
                  </Col>
                  <Col>
                    <h2>Karen Linares Luque</h2>
                    <p>Docente de las materias</p>
                  </Col>
                </Col>
              </Row>
              <Row>
                <Col className="parent" lg={6}>
                  <Col xs={4} lg={5}>
                    <Image alt="user_photo" src={SebastianImg} />
                  </Col>
                  <Col>
                    <h2>Sebastian Viveros</h2>
                    <p>
                      Estudiante de Ingeniería en Multimedia. Product Owner.
                    </p>
                  </Col>
                </Col>
                <Col className="parent" lg={6}>
                  <Col xs={4} lg={5}>
                    <Image alt="user_photo" src={SergioImg} />
                  </Col>
                  <Col>
                    <h2>Sergio Beltrán</h2>
                    <p>Estudiante de Ingeniería en Multimedia. Scrum Master.</p>
                  </Col>
                </Col>
              </Row>
              <Row>
                <Col className="parent" lg={6}>
                  <Col xs={4} lg={5}>
                    <Image alt="user_photo" src={NicolasImg} />
                  </Col>
                  <Col>
                    <h2>Nicolás Moreno Posada</h2>
                    <p>
                      Estudiante de Ingeniería en Multimedia. Desarrollador y
                      Diseñador.
                    </p>
                  </Col>
                </Col>
                <Col className="parent" lg={6}>
                  <Col xs={4} lg={5}>
                    <Image alt="user_photo" src={CarlosImg} />
                  </Col>
                  <Col>
                    <h2>Carlos Muñoz Rojas</h2>
                    <p>
                      Estudiante de Ingeniería en Multimedia. Desarrollador y
                      Diseñador.
                    </p>
                  </Col>
                </Col>
              </Row>
            </div>
            <div className="contenido mt-3">
              <Row className="py-3">
                <Col className="text-center">
                  <a
                    href="https://umng.edu.co/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Image
                      className="mr-2"
                      width="100rem"
                      src={UmngLogo}
                      alt="umng_logo"
                    />
                  </a>
                  <a
                    href="https://www.umng.edu.co/programas/pregrados/ingenieria-multimedia"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Image
                      className="ml-2"
                      width="100rem"
                      src={MultimediaLogo}
                      alt="multimedia_logo"
                    />
                  </a>
                </Col>
              </Row>
              <Row>
                <p style={{ fontSize: "0.8rem" }} className="text-center w-100">
                  Ingeniería en Multimedia.
                  <br />
                  Universidad Militar Nueva Granada.
                  <br />
                  Bogotá, Colombia.
                  <br />
                  2020.
                  <br />
                </p>
              </Row>
            </div>
          </div>
        </div>
      )}
    </Spring>
  );
};

export default AcercaDe;
