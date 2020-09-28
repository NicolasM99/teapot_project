import React, { useContext } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Bienvenida from "./components/pages/Bienvenida.js";
import Categorias from "./components/pages/Categorias.js";
import Perfil from "./components/pages/Perfil.js";
import PrimerRegistro from "./components/pages/PrimerRegistro.js";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { UserContext } from "./components/functions/UserProvider";

const Container = () => {
  const user = useContext(UserContext);
  return (
    <div className="Wrapper">
      <Switch>
        <Route exact path="/">
          <Redirect to="/inicio" />
        </Route>
        <Route exact path="/inicio" component={Bienvenida} />
        <Route exact path="/categorias" component={Categorias} />
        {user ? (
          <Route
            exact
            path="/mi_perfil"
            component={() => <Perfil user={user} />}
          />
        ) : null}
        {user ? (
          <Route
            exact
            path="/crear_perfil"
            component={() => <PrimerRegistro show_modal={true} />}
          />
        ) : null}
      </Switch>
    </div>
  );
};

export default Container;
