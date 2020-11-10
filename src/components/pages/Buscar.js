import React, { useState, useEffect, useContext, useRef } from "react";
import { Button, Form, Row, Col, Image } from "react-bootstrap";
import { Spring } from "react-spring/renderprops";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { firestore } from "../functions/Firebase.js";
import { UserContext } from "../functions/UserProvider";
import "../styles/loader.css";
import "../styles/BuscarStyle.css";
import "../styles/contenido.css";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Buscar = (props) => {
  const isMountedRef = useRef(null);
  const [data, setData] = useState(null);
  const [userData, setUserData] = useState(null);
  const [usersData, setUsersData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(UserContext);
  const [filteredData, setFilteredData] = useState(null);
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
  const handleFilteredData = (name) => {
    if (name === "") setFilteredData(null);
    else if (name.length > 1)
      setFilteredData(
        usersData.filter((person) =>
          person.nickName
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .includes(
              name
                .toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
            )
        )
      );
  };
  const handleUserProfile = (id) => {
    props.setPublicUserData(id);
  };

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
                <Row className="mb-4">
                  <Col md={12} className="px-3 py-1">
                    <input
                      onChange={(value) =>
                        handleFilteredData(value.target.value)
                      }
                      type="text"
                      required
                      className="form-control col-12"
                      placeholder="Escribe un nombre de usuario"
                      style={{
                        backgroundColor: "#E5EEFF",
                        borderRadius: 400,
                        fontSize: "1.2rem",
                      }}
                    />
                  </Col>
                </Row>
                <Row>
                  {filteredData && filteredData.length > 0 ? (
                    filteredData.map((id, index) => (
                      <Spring
                        config={{ duration: 100 }}
                        from={{ opacity: 0, marginTop: 40 }}
                        to={{ opacity: 1, marginTop: 0 }}
                      >
                        {(props) => (
                          <Col style={props} key={index} sm={6} xs={12} md={3}>
                            <Link
                              style={{ textDecoration: "none", color: "white" }}
                              to="/perfil"
                              onClick={() => handleUserProfile(id)}
                            >
                              <Image
                                className="col-12 p-0 person-image"
                                style={{
                                  borderTopRightRadius: "20%",
                                  borderBottomLeftRadius: "20%",
                                  backgroundColor: "rgba(255,255,255,0.1)",
                                  objectPosition: "center",
                                }}
                                src={id.photo}
                                alt="user_photo"
                              />
                              <p
                                style={{
                                  textTransform: "capitalize",
                                  fontSize: "1rem",
                                  textAlign: "center",
                                  marginTop: "10px",
                                }}
                              >
                                {id.nickName.toLowerCase()}
                              </p>
                            </Link>
                          </Col>
                        )}
                      </Spring>
                    ))
                  ) : filteredData && filteredData.length === 0 ? (
                    <p
                      style={{
                        textAlign: "center",
                        fontWeight: "bold",
                        width: "100%",
                      }}
                    >
                      No se encontraron resultados...
                    </p>
                  ) : (
                    <p
                      style={{
                        textAlign: "center",
                        fontWeight: "bold",
                        width: "100%",
                      }}
                    >
                      Por favor escribe al menos 2 letras
                    </p>
                  )}
                </Row>
              </div>
            </div>
          </div>
        )}
      </Spring>
    );
};
export default Buscar;
