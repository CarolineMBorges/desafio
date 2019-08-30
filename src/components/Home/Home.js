import React, {Component} from 'react'
import '../../styles/custom.css'
import './Home.css'
import {  Link } from 'react-router-dom'


class Home extends Component {

    render(){    
        return(
            <div>
                 <div className="estruturaHome"> 
                        <label>Escolha uma das opções abaixo:</label>
                        <ul><Link className="textoLink" to='/registrarcliente'>Cadastrar clientes</Link></ul>
                        <ul><Link className="textoLink" to='/registrarendereco'>Cadastrar endereço</Link></ul>
                        <ul><Link className="textoLink" to='/editarcliente'>Editar clientes</Link></ul>
                        <ul><Link className="textoLink" to='/listarcliente'>Listar clientes</Link></ul>
                        <ul><Link className="textoLink" to='/excluircliente'>Excluir clientes</Link></ul>                            
                </div>
            </div>
        ); 
    }
}

export default Home;