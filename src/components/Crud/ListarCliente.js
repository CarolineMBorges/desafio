import React, { Component } from 'react'
import './Crud.css'
import InputMask from 'react-input-mask';
import { PostData } from '../../services/PostData'


class ListarCliente extends Component{

    constructor(props){
        super(props);

        this.state = {
            redirect: false,
            };

        this.pesquisar = this.pesquisar.bind(this);
        this.onChange = this.onChange.bind(this);
        this.listarclientes = this.listarclientes.bind(this);

    }

    componentWillMount() {

        if(sessionStorage.getItem("userData")){
        this.listarclientes();
        }
    }

    /**
     * Essa função tem como finalidade pesquisar qual o cliente terá seu id conectado
     * ao novo endereço.
     * 
     */


    pesquisar(e){
        if(this.state.cpf){
            
            PostData('pesquisar', this.state).then((result) =>{
                let responseJson = result;
                if(responseJson.userData){
                    alert("Dados do cliente " +
                          "\nNome: "+ responseJson.userData.nome_cliente +
                          "\nCPF: "+ responseJson.userData.cpf +
                          "\nRG: "+ responseJson.userData.rg +
                          "\nTelefone: "+ responseJson.userData.telefone +
                          "\nData de nascimento" + responseJson.userData.data_nascimento );
                }
                else{
                    alert('Usuário não existe');
                }
            });
        }
    }

     /**
     * Essa função tem como finalidade listar do banco de dados o cadastro de pessoas.
     * 
     */

    listarclientes(){

        let data = JSON.parse(sessionStorage.getItem("userData"));
        this.setState({ nome_cliente: data.userData.nome_cliente,
                        cpf:data.userData.cpf,
                        rg: data.userData.rg,
                        data_nascimento: data.userData.data_nascimento,
                        telefone: data.userData.telefone,
                    });
        let postData = { id_cliente: data.userData.id_cliente};
        if (data) {
            PostData('listarclientes', postData).then((result) => {
            let responseJson = result;
                if(responseJson.userData){
                    this.setState({data: responseJson.userData});
                    console.log(responseJson);
             }       
         });
        } 
    }

    onChange(e){
        this.setState({[e.target.name]: e.target.value});
        console.log(this.state);
    }

    render() {

        let clientes = []
            for(let i=0; i<5; i++){
            clientes.push(<ul>Dados: {this.state.rg}</ul>)
        }
       
        return(
        <div className="pagina">
            <div className="estrutura">
                        <ul><InputMask mask="999.999.999-99" type="text" name="cpf" placeholder="Entre com o cpf" onChange={this.onChange}/>
                        <input className="botao" type="submit" value="Pesquisar por cpf" onClick={this.pesquisar}/></ul>
                        <ul><label>Todos os usuário</label></ul>
                       
            </div>
            <ul>
            {clientes}
        </ul>
        </div>    
        )
    }
}

export default ListarCliente;