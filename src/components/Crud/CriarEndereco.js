import React, { Component } from 'react'
import './Crud.css'
import { confirmAlert } from 'react-confirm-alert';
import InputMask from 'react-input-mask';
import { PostData } from '../../services/PostData'

class CriarEndereco extends Component{

    constructor(props){
        super(props);
        this.state = {
            cpf: '',
            pais: '',
            estado: '',
            cidade: '',
            rua: '',
            complemento:'',
            numero:'',
            redirect: false
        };
        
        this.pesquisar = this.pesquisar.bind(this);
        this.criarendereco = this.criarendereco.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    /**
     * Essa função tem como finalidade pesquisar qual o cliente terá seu id conectado
     * ao novo endereço.
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
                    let id_cliente = data.userData.id_cliente
                    console.log( id_cliente)
                    confirmAlert({
                        title: 'Inserir Endereço',
                        message: 'Você inserir outro endereço no cliente: ' + data.userData.nome_cliente ,
                            buttons: [
                            {
                                label: 'Sim',
                                    onClick: () => this.criarendereco(id_cliente)
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
     * Essa função tem como finalidade criar no banco de dados o cadastro de pessoas.
     * 
     */


    criarendereco(id_cliente){
        console.log(id_cliente)
        if(this.state.cidade && this.state.rua && this.state.complemento){
            PostData('registrarendereco',this.state).then((result) => {
                let responseJson = result;
                if(responseJson.userData){
                    sessionStorage.setItem('userData',JSON.stringify(responseJson));
                    this.setState({redirect: true});
                    alert("Endereco cadastrado com sucesso");
                }
                else
                    this.setState({redirect: true});
                    alert(result.error);
            });
        }
    }
    
    onChange(e){
        this.setState({[e.target.name]:e.target.value});
    }

    render() {

        return(
            <div>
                <form className="infoCliente" method="post">
                    <ul><label>Pesquise pelo usuário que terá um novo endereco </label></ul>
                    <ul><InputMask mask="999.999.999-99" type="text" name="cpf" placeholder="Entre com o cpf" onChange={this.onChange}/></ul>
                    <ul><input className="botao" type="submit" value="Pesquisar por cpf" onClick={this.pesquisar}/></ul>

                    <ul>Informações do enredeço</ul>
                    <label>Pais: </label>
                    <input type="text" name="pais" placeholder="Pais" onChange={this.onChange} /><br/> 
                    <label>Estado: </label>
                    <input type="text" name="estado" placeholder="Estado" onChange={this.onChange}/><br/> 
                    <label>Cidade: </label>
                    <input type="text" name="cidade" placeholder="Cidade" onChange={this.onChange} /><br/> 
                    <label>Rua: </label>
                    <input type="text" name="rua" placeholder="rua" onChange={this.onChange}/><br/> 
                    <label>Complemento </label>
                    <input type="text" name="complemento" placeholder="Complemento" onChange={this.onChange} /><br/> 
                    <label>Numero </label>
                    <input type="text" name="numero" placeholder="Número" onChange={this.onChange}/><br/>   
                    <input className="botao" type="submit" value="Salvar Dados" onClick={this.criarendereco}/>
            </form>
        </div>
        );
    }
}

export default CriarEndereco;