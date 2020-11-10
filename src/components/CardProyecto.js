import React, { useState, useEffect, useContext, useRef } from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import "./styles/cardStyle.css";
const CardProyecto = ({ title, image, link, setProjectInfo, description }) => {
  return (
    <>
      {/* <div className="card-body d-flex justify-content-center col-lg-4 col-md-6"> */}
      <div className="cardContainer mx-auto p-0">
        <Link
          onClick={() =>
            setProjectInfo({
              title: title,
              image: image,
              link: link,
              description: description,
            })
          }
          className="m-0 p-0"
          to={link === "nuevo_proyecto" ? link : `/proyecto#${link}`}
        >
          <Card
            className="text-white cardSize m-3"
            style={{ backgroundColor: "transparent" }}
          >
            <Card.Img
              hover
              src={image}
              overlay="white-slight"
              alt="card_image"
              className="genericCard"
              style={{
                objectFit: "cover",
                borderTopRightRadius: "30px",
                borderBottomLeftRadius: "30px",
              }}
            />
            <Card.ImgOverlay className="d-flex align-items-end ">
              <Card.Title
                className="cardTitle p-2"
                style={{ backgroundColor: "rgba(0,0,0,0.8)" }}
              >
                {title}
              </Card.Title>
            </Card.ImgOverlay>
          </Card>
        </Link>
      </div>
      {/* </div> */}
    </>
  );
};

export default CardProyecto;
