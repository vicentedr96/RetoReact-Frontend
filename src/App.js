
import React, { Suspense, lazy } from 'react';
import { Router, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import { useSelector } from "react-redux";
import { PrivateRoute } from "./Utils/PrivateRoute";
import { PublicRoute } from "./Utils/PublicRoute";
import Progress from "./Utils/Progress";
import './App.css';

const Busqueda = lazy(()=> import("./View/Busqueda"));
const Resultado = lazy(()=> import("./View/Resultado"));
const hist = createBrowserHistory();

function App() {
  const validate = useSelector(state => state.validate);
  return (
    <Router history={hist}>
      <Suspense fallback={<Progress />}>
      <Switch>
        <PrivateRoute isAuthenticated={validate.checking} path="/done" component={Resultado} />
        <PublicRoute isAuthenticated={validate.checking} path="/" component={Busqueda} />
      </Switch>
      </Suspense>
    </Router>
  );
}

export default App;
