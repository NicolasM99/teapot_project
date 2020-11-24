import React, { useState, useEffect, useContext, useRef } from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import "./styles/cardStyle.css";
const CardProyecto = ({
  title,
  image,
  link,
  setProjectInfo,
  description,
  category,
  authorID,
}) => {
  return (
    <>
      {/* <div className="card-body d-flex justify-content-center col-lg-4 col-md-6"> */}
      <div className="cardContainer mx-auto p-0">
        <Link
          onClick={() =>
            setProjectInfo({
              authorID: authorID,
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
            className="text-white cardSize py-4 m-3 h-100"
            style={{ backgroundColor: "transparent", boxShadow: "none" }}
          >
            <Card.Img
              hover
              src={image}
              overlay="white-slight"
              alt="card_image"
              className="genericCard h-100"
              style={{
                objectFit: "cover",
                borderTopRightRadius: "30px",
                borderBottomLeftRadius: "30px",
                objectPosition: "center",
              }}
            />
            <Card.ImgOverlay className="d-flex align-items-end ">
              <Card.Title
                className="cardTitle p-2"
                style={{ backgroundColor: "rgba(0,0,0,0.8)" }}
              >
                {title}
                {category && (
                  <>
                    <br />
                    <span
                      style={{
                        fontWeight: "normal",
                        color: "rgba(255,255,255,0.7)",
                      }}
                    >
                      {category}
                    </span>
                  </>
                )}
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
