import React, { Component } from "react";
import { Form } from "react-bootstrap";
import { Spring } from "react-spring/renderprops";
import { Col } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Link } from "react-router-dom";

import { Card } from "react-bootstrap";
// import img_3d from "../../img/categoria/3d.png";
// import desarrollo from "../../img/categoria/desarrollo.jpg";
// import produccion from "../../img/categoria/produccion.jpg";
// import diseño from "../../img/categoria/diseño.jpg";
import "../styles/contenido.css";
import "../styles/cardStyle.css";

class Categorias extends Component {
  render() {
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
            <Row>
              <Col xs={12} lg={6}>
                <div className="card-body d-flex justify-content-center">
                  <div className="cardContainer">
                    <Link to="categoria_produccion_3d">
                      <Card
                        className="bg-dark text-white "
                        style={{ width: "30rem" }}
                      >
                        <Card.Img
                          //src={img_3d}
                          //alt="Card image"
                          hover
                          overlay="white-slight"
                          id="produccion3d"
                        />
                        <Card.ImgOverlay className="d-flex align-items-end ">
                          <Card.Title className="cardTitle">
                            PRODUCCIÓN 3D
                          </Card.Title>
                          {/* <Card.Text>
                        This is a wider card with supporting text below as a
                        natural lead-in to additional content. This content is a
                        little bit longer.
                      </Card.Text>
                      <Card.Text>Last updated 3 mins ago</Card.Text> */}
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
                      <Card
                        className="bg-dark text-white"
                        style={{ width: "30rem" }}
                      >
                        <Card.Img
                          className="cardImage"
                          //src={desarrollo}
                          //alt="Card image"
                          id="desarrollo"
                        />
                        <Card.ImgOverlay className="d-flex align-items-end ">
                          <Card.Title className="cardTitle">
                            DESARROLLO
                          </Card.Title>
                          {/* <Card.Text>
                          This is a wider card with supporting text below as a
                          natural lead-in to additional content. This content is
                          a little bit longer.
                        </Card.Text>
                        <Card.Text>Last updated 3 mins ago</Card.Text> */}
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
                      <Card
                        className="bg-dark text-white"
                        style={{ width: "30rem" }}
                      >
                        <Card.Img
                          className="cardImage"
                          //src={produccion}
                          //alt="Card image"
                          id="produccionAudiovisual"
                        />
                        <Card.ImgOverlay className="d-flex align-items-end ">
                          <Card.Title className="cardTitle">
                            PRODUCCIÓN AUDIOVISUAL
                          </Card.Title>
                          {/* <Card.Text>
                          This is a wider card with supporting text below as a
                          natural lead-in to additional content. This content is
                          a little bit longer.
                        </Card.Text>
                        <Card.Text>Last updated 3 mins ago</Card.Text> */}
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
                      <Card
                        className="bg-dark text-white"
                        style={{ width: "30rem" }}
                      >
                        <Card.Img className="cardImage" id="diseño" />
                        <Card.ImgOverlay className="d-flex align-items-end ">
                          <Card.Title className="cardTitle">DISEÑO</Card.Title>
                          {/* <Card.Text>
                          This is a wider card with supporting text below as a
                          natural lead-in to additional content. This content is
                          a little bit longer.
                        </Card.Text>
                        <Card.Text>Last updated 3 mins ago</Card.Text> */}
                        </Card.ImgOverlay>
                      </Card>
                    </Link>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        )}
      </Spring>
    );
  }
}

export default Categorias;
