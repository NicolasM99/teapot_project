import React, { useState, useEffect, useContext, useRef } from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import "./styles/cardStyle.css";
const CardCategoria = ({ title, image, link }) => {
  return (
    <>
      <div className="card-body d-flex justify-content-center col-lg-4 col-md-6">
        <div className="cardContainer">
          <Link to={link}>
            <Card className="bg-dark text-white cardSize">
              <Card.Img
                hover
                src={image}
                overlay="white-slight"
                alt="card_image"
                style={{ backgroundColor: "white" }}
              />
              <Card.ImgOverlay className="d-flex align-items-end ">
                <Card.Title
                  className="cardTitle p-2"
                  style={{ backgroundColor: "black" }}
                >
                  {title}
                </Card.Title>
              </Card.ImgOverlay>
            </Card>
          </Link>
        </div>
      </div>
    </>
  );
};

export default CardCategoria;
