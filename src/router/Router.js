import React, { useContext, useState, useEffect, useRef } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Bienvenida from "../components/pages/Bienvenida.js";
import Categorias from "../components/pages/Categorias.js";
import Buscar from "../components/pages/Buscar.js";
import AcercaDe from "../components/pages/AcercaDe.js";
import Perfil from "../components/pages/Perfil.js";
import MisProyectos from "../components/pages/MisProyectos.js";
import PrimerRegistro from "../components/pages/PrimerRegistro.js";
import CategoriaIndividual from "../components/pages/CategoriaIndividual.js";
import NuevaCategoria from "../components/pages/NuevaCategoria";
import { UserContext } from "../components/functions/UserProvider";
import Usuarios from "../components/pages/Usuarios.js";
import { firestore } from "../components/functions/Firebase.js";
import SolicitudesProyectos from "../components/pages/SolicitudesProyectos";
import NuevoProyecto from "../components/pages/NuevoProyecto.js";
import ProyectoIndividual from "../components/pages/ProyectoIndividual.js";
import EditarCategoria from "../components/pages/EditarCategoria.js";
import "../App.css";
import { ROUTES } from "../constants/routes.js";
const Router = ({ publicUserData, setPublicUserData }) => {
  const [categoryInfo, setCategoryInfo] = useState(null);
  const [projectInfo, setProjectInfo] = useState(null);
  const [userData, setUserData] = useState(null);

  const db = firestore;
  const { user } = useContext(UserContext);
  const isMountedRef = useRef(null);
  useEffect(() => {
    isMountedRef.current = true;
    if (user && db) {
      db.collection("users")
        .doc(user.uid)
        .get()
        .then((doc) => {
          if (doc && isMountedRef.current) {
            setUserData(doc.data());
            // console.log(doc.data());
          }
        });
      //console.log(user.displayName);
    }
    return () => (isMountedRef.current = false);
  }, [user, db]);
  return (
    <div className="Wrapper">
      <Switch>
        <Route exact path="/">
          <Redirect to={ROUTES.LANDING} />
        </Route>
        <Route exact path={ROUTES.LANDING} component={Bienvenida} />
        <Route
          exact
          path={ROUTES.CATEGORIES}
          component={() => <Categorias setCategoryInfo={setCategoryInfo} />}
        />
        <Route
          exact
          path={ROUTES.SEARCH}
          component={() => (
            <Buscar
              publicUserData={publicUserData}
              setPublicUserData={setPublicUserData}
            />
          )}
        />
        <Route exact path={ROUTES.ABOUT} component={AcercaDe} />
        <Route
          exact
          path={ROUTES.MY_PROJECTS}
          component={() => <MisProyectos setProjectInfo={setProjectInfo} />}
        />
        <Route
          exact
          path={ROUTES.CATEGORY}
          component={() => (
            <CategoriaIndividual
              setProjectInfo={setProjectInfo}
              categoryInfo={categoryInfo}
            />
          )}
        />
        <Route
          exact
          path={ROUTES.PROJECT}
          component={() => (
            <ProyectoIndividual
              setPublicUserData={setPublicUserData}
              projectInfo={projectInfo}
            />
          )}
        />

        <Route
          exact
          path={ROUTES.PROFILE}
          component={() => (
            <Perfil
              user={user}
              setProjectInfo={setProjectInfo}
              publicUserData={publicUserData}
            />
          )}
        />

        {user ? (
          <Route
            exact
            path={ROUTES.CREATE_PROFILE}
            component={() => <PrimerRegistro show_modal={true} />}
          />
        ) : null}
        {user && userData && userData.admin ? (
          <Route
            exact
            path={ROUTES.NEW_CATEGORY}
            component={() => <NuevaCategoria />}
          />
        ) : null}
        {user && userData && userData.admin ? (
          <Route
            exact
            path={ROUTES.EDIT_CATEGORY}
            component={() => <EditarCategoria categoryInfo={categoryInfo} />}
          />
        ) : null}
        {user && userData ? (
          <Route
            exact
            path={ROUTES.NEW_PROJECT}
            component={() => <NuevoProyecto />}
          />
        ) : null}

        {user && userData && userData.admin ? (
          <Route
            exact
            path={ROUTES.USERS}
            component={() => <Usuarios setPublicUserData={setPublicUserData} />}
          />
        ) : null}
        {/* {user && userData && userData.admin ? (
          <Route
            exact
            path={"/solicitudes_proyectos"}
            component={() => <SolicitudesProyectos />}
          />
        ) : null} */}
      </Switch>
    </div>
  );
};

export default Router;
