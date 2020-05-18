import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import Home from '~/pages/Home';
import CadastrarMatricula from '~/pages/Forms/Store/Matricula';
import CadastrarSerie from '~/pages/Forms/Store/Serie';
import CadastrarUsuario from '~/pages/Forms/Store/Usuario';
import CadastrarDespesa from '~/pages/Forms/Store/Despesa';
import EditarSerie from '~/pages/Forms/Update/Serie';
import EditarMatricula from '~/pages/Forms/Update/Matricula';
import EditarUsuario from '~/pages/Forms/Update/Usuario';
import EditarDespesa from '~/pages/Forms/Update/Despesa';
import Parceiros from '~/pages/Parceiros';
import Aovivo from '~/pages/Aovivo';


export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/Parceiros" exact component={Parceiros}  />
      <Route path="/Aovivo" exact component={Aovivo} />

      <Route
        path="/cadastrar-matricula"
        exact
        component={CadastrarMatricula}
        isPrivate
      />
      <Route
        path="/cadastrar-serie"
        exact
        component={CadastrarSerie}
        isPrivate
      />
      <Route
        path="/cadastrar-usuario"
        exact
        component={CadastrarUsuario}
        isPrivate
      />
      <Route
        path="/cadastrar-despesa"
        exact
        component={CadastrarDespesa}
        isPrivate
      />
      <Route path="/serie/:id" exact component={EditarSerie} isPrivate />
      <Route
        path="/matricula/:id"
        exact
        component={EditarMatricula}
        isPrivate
      />

      <Route
        path="/despesa/:id"
        exact
        component={EditarDespesa}
        isPrivate
      />
      <Route path="/" component={() => <h1>404</h1>} />
    </Switch>
  );
}
