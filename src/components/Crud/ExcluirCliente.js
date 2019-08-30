import React, { Component } from 'react'
import './Crud.css'
import InputMask from 'react-input-mask';
import { PostData } from '../../services/PostData'
import { confirmAlert } from 'react-confirm-alert';

class ExcluirCliente extends Component{

    constructor(props){
        super(props);

        this.state = {
            cpf:'',
            redirect: false,
            };

        this.pesquisar = this.pesquisar.bind(this);
        this.onChange = this.onChange.bind(this);
        this.excluircliente = this.excluircliente.bind(this);

    }

    /**
     * Essa função tem como finalidade fazer uma pesquisa na tabela clientes do banco de dados,
     * utilizando para isso, o cpf. Se a pessoa confirmar que o cliente encontrado será excluído,
     * será chamada a função excluircliente()
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
                        title: 'Deletar Cliente',
                        message: 'Você deseja deletar o(a) cliente: ' + data.userData.nome_cliente ,
                            buttons: [
                            {
                                label: 'Sim',
                                    onClick: () => this.excluircliente(e)
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
     * Essa função tem como finalidade excluir do banco de dados o cadastro de pessoas.
     * 
     */


    excluircliente(e){
        let data = JSON.parse(sessionStorage.getItem("userData"));

        let postData = { id_cliente: data.userData.id_cliente };
        if (postData) {

            PostData('excluircliente', postData).then((result) => {
                this.setState({data:this.state.data});

                console.log('entrou aqui')
                if(result.success){
                    alert(result.success);
                }
                else
                    alert(result.error);
                });
            }
        
    }

    onChange(e){
        this.setState({[e.target.name]: e.target.value});
        console.log(this.state);
    }

    render() {

        return(
            <div>
                <ul><label>Pesquise o usuário que deseja excluir pelo cpf </label></ul>
                <ul><InputMask mask="999.999.999-99" type="text" name="cpf" placeholder="Entre com o cpf" onChange={this.onChange}/></ul>
                <ul><input className="botao" type="submit" value="Pesquisar" onClick={this.pesquisar}/></ul>
            </div>
            );
         }    
     }
export default ExcluirCliente;