import React, {
  Component,
  useRef,
  useState,
  useContext,
  useEffect,
} from "react";
import "../styles/contenido.css";
import { Spring } from "react-spring/renderprops";
import { UserContext } from "../functions/UserProvider";
import { firestore } from "../functions/Firebase.js";
import CardProyecto from "../CardProyecto.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../styles/loader.css";
import { Row, Col, Image, CardDeck } from "react-bootstrap";
import { LoremIpsum } from "./LoremIpsum";
import plusIcon from "../../img/plus_icon.png";
import CardCategoria from "../CardCategoria";

const MisProyectos = ({ setProjectInfo }) => {
  const isMountedRef = useRef(null);
  const [data, setData] = useState(null);
  const [userData, setUserData] = useState(null);
  const [usersData, setUsersData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(UserContext);
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteID, setDeleteID] = useState(null);
  const [showNewUser, setShowNewUser] = useState(false);
  const [filteredData, setFilteredData] = useState(null);
  const [receivedData, setReceivedData] = useState(null);

  const db = firestore;
  useEffect(() => {
    isMountedRef.current = true;
    if (user) {
      db.collection("users")
        .doc(user.uid)
        .get()
        .then((doc) => {
          if (doc && isMountedRef.current) {
            setData(doc.data());
            console.log("ENTRO ACA");
          }
        })
        .then(() =>
          db
            .collection("projects")
            .doc(user.uid)
            .get()
            .then((doc) => {
              if (doc && isMountedRef.current) {
                setReceivedData(doc.data());
                console.log("ENTRO ACA");
              }
              setLoading(false);
            })
        );
      //console.log(user.displayName);
    } else {
      if (data) {
        //setData(null);
      }
    }

    return () => (isMountedRef.current = false);
  }, [user, db]);
  useEffect(() => {
    console.log("PROYECTOS", receivedData);
  }, [receivedData]);
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
                <h1 className="titulo">MIS PROYECTOS</h1>
                <CardDeck>
                  <CardProyecto
                    title="Nuevo proyecto"
                    image={plusIcon}
                    link="nuevo_proyecto"
                    setProjectInfo={setProjectInfo}
                  />
                  {receivedData &&
                    receivedData.projects &&
                    receivedData.projects.map((item) => (
                      <CardProyecto
                        title={item.title}
                        image={item.image}
                        link={item.link}
                        description={item.description}
                        setProjectInfo={setProjectInfo}
                      />
                    ))}
                </CardDeck>
              </div>
            </div>
          </div>
        )}
      </Spring>
    );
};

export default MisProyectos;
