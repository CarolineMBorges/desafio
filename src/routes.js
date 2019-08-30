import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Login from './components/Login/Login';
import Home from './components/Home/Home'
import CriarCliente from './components/Crud/CriarCliente';
import CriarEndereco from './components/Crud/CriarEndereco';
import ListarCliente from './components/Crud/ListarCliente';
import EditarCliente from './components/Crud/EditarCliente';
import ExcluirCliente from './components/Crud/ExcluirCliente';
import NotFound from './components/NotFound/NotFound';


const Routes = () => (
    <BrowserRouter>
        <Route path='' component={Login} />
        <Route path='/login' component={Login} />
        <Route path='/home' component={Home} />
        <Route path='/registrarcliente' component={CriarCliente} />
        <Route path='/registrarendereco' component={CriarEndereco} />
        <Route path='/editarcliente' component={EditarCliente} />
        <Route path='/listarcliente' component={ListarCliente} />
        <Route path='/excluircliente' component={ExcluirCliente} />
        <Route path='/notfound' component={NotFound} />

    </BrowserRouter>
);

export default Routes;