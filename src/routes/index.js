import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import Home from '~/pages/Home';
import Parceiros from '~/pages/Parceiros';
import Aovivo from '~/pages/Aovivo';



export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/inscricao-parceiro" exact component={Parceiros}  />
      <Route path="/Aovivo" exact component={Aovivo} />


      <Route path="/" component={() => <h1>404</h1>} />
    </Switch>
  );
}
