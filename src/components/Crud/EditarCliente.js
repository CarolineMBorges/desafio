import React, { Component } from 'react'
import './Crud.css'
import { PostData } from '../../services/PostData'
import { confirmAlert } from 'react-confirm-alert';

class EditarCliente extends Component{

    constructor(props){
        super(props);

        this.state = {
            cpf:'',
            redirect: false,
            };

        this.pesquisar = this.pesquisar.bind(this);
        this.onChange = this.onChange.bind(this);
        this.alterarcliente = this.alterarcliente.bind(this);

    }

     /**
     * Essa função tem como finalidade fazer uma pesquisa na tabela clientes do banco de dados,
     * utilizando para isso, o cpf. Se a pessoa confirmar que o cliente encontrado será alterado,
     * será chamada a função alterarcliente()
     * 
     */

    pesquisar(e){
        if(this.state.cpf){
            
            PostData('pesquisar', this.state).then((result) =>{
                let data = JSON.parse(sessionStorage.getItem("userData"));
                let responseJson = result;
                console.log(responseJson);
                if(responseJson.userData){
                    sessionStorage.setItem('userData',JSON.stringify(responseJson));
                    confirmAlert({
                        title: 'Alterar Cliente',
                        message: 'Você deseja alterar o(a) cliente: ' + data.userData.nome_cliente ,
                            buttons: [
                            {
                                label: 'Sim',
                                    onClick: () => this.alterarcliente(e)
                                },
                                {
                                label: 'Não',
                                    onClick: () => alert('Ação cancelada')
                                }
                            ]
                        });
                }
                else{
                    alert('Usuário não existe');
                }
            });
        }
    }

    /**
     * Essa função tem como finalidade alterar no banco de dados o cadastro de pessoas.
     * 
     */

    alterarcliente(e){
        e.preventDefault();
            let data = JSON.parse(sessionStorage.getItem("userData"));
            let postData = { id_cliente: data.userData.id_cliente };
            if (this.state.userData) {
                PostData('alterarcliente', postData).then((result) => {
                let responseJson = result;
                this.setState({data: responseJson.userData});
            });
        }
    }

    onChange(e){
        this.setState({[e.target.name]: e.target.value});
    }

    render() {

        return(
            <div>
                <ul><label>Pesquise o usuário que deseja excluir pelo cpf </label></ul>
                <ul><input type="text" name="cpf" placeholder="Entre com o cpf" onChange={this.onChange}/></ul>
                <ul><input className="botao" type="submit" value="Pesquisar" onClick={this.pesquisar}/></ul>
                <ul><input className="botao"  type="submit" value="Alterar" onClick={this.alterarcliente} /></ul>
            </div>
            );
         }    
     }

export default EditarCliente;