import React, { useState, useEffect, useContext, useRef } from "react";
import { Button, Form, Row, Col, Image } from "react-bootstrap";
import { Spring } from "react-spring/renderprops";
import { Controller, useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { firestore } from "../functions/Firebase.js";
import { UserContext } from "../functions/UserProvider";
import "../styles/loader.css";

import "../styles/contenido.css";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const Buscar = () => {
  const { control, register, getValues, handleSubmit, errors } = useForm();
  const isMountedRef = useRef(null);
  const [data, setData] = useState(null);
  const [userData, setUserData] = useState(null);
  const [usersData, setUsersData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(UserContext);
  const db = firestore;
  useEffect(() => {
    isMountedRef.current = true;
    if (db) {
      db.collection("categories")
        .get()
        .then((querySnapshot) => {
          if (querySnapshot && isMountedRef.current) {
            setData(querySnapshot.docs.map((doc) => doc.data()));
            setLoading(false);
          }
        });
    }
    if (user) {
      db.collection("users")
        .doc(user.uid)
        .get()
        .then((doc) => {
          if (doc && isMountedRef.current) {
            setUserData(doc.data());
            setLoading(false);
          }
        });
      //console.log(user.displayName);
    }
    if (user) {
      db.collection("users")
        .get()
        .then((querySnapshot) => {
          if (querySnapshot && isMountedRef.current) {
            console.log(querySnapshot.docs.map((doc) => doc.data()));
            setUsersData(querySnapshot.docs.map((doc) => doc.data()));
            setLoading(false);
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
                <h1 className="titulo">BUSCAR</h1>
                <Row>
                  <Col md={10} className="px-1 py-1">
                    <input
                      type="text"
                      required
                      className="form-control col-12"
                      placeholder="Escribe un nombre para buscar"
                      style={{ backgroundColor: "white", borderRadius: 400 }}
                    />
                  </Col>
                  <Col md={2} className="px-1 py-1">
                    <Button
                      style={{ borderRadius: 500 }}
                      className="h-100 col-12"
                    >
                      Buscar <FontAwesomeIcon icon={faSearch} />
                    </Button>
                  </Col>
                </Row>
                <Row>
                  {usersData &&
                    usersData.map((id, index) => (
                      <Col sm={6} xs={12} md={3}>
                        <Image
                          className="col-12"
                          style={{
                            borderTopRightRadius: "20%",
                            borderBottomLeftRadius: "20%",
                          }}
                          src={id.photo}
                          alt="user_photo"
                        />
                        <p style={{ textTransform: "uppercase" }}>
                          {id.nickName}
                        </p>
                      </Col>
                    ))}
                </Row>
              </div>
            </div>
          </div>
        )}
      </Spring>
    );
};
export default Buscar;
