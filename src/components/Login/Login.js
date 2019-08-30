import React, { Component } from 'react';
import './Login.css';
import login from '../../imagens/login.jpg';
import { Redirect } from 'react-router-dom';
import { PostData } from '../../services/PostData';



class Login extends Component{

    constructor(props){
        super(props);

        this.state = {
            login_usuario:'',
            senha:'',
            redirect: false
        }
        this.login = this.login.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    login(){
        if(this.state.login_usuario && this.state.senha){
            
            PostData('login', this.state).then((result) =>{
                let responseJson = result;
                console.log(responseJson);
                if(responseJson.userData){
                    sessionStorage.setItem('userData',JSON.stringify(responseJson));
                    this.setState({redirect: true});
                }
                else{
                    alert(result.error);
                }
            });
        }

    }

    onChange(e){
        this.setState({[e.target.name]: e.target.value});
        console.log(this.state);
    }

    render() {

        if (this.state.redirect) {
            return (<Redirect to={'/home'}/>)
        }
        if(sessionStorage.getItem('userData')){
            return (<Redirect to={'/home'}/>)
        }

        return(
            <div className="titulo"> 
                <ul><label>Faça login para continuar</label></ul>
                    <div className="estrutura" >
                        <ul><img src={login} alt="imagem ilustrativa"/></ul>
                        <div className="infoLogin">
                            <ul><label>Usuário </label>
                            <input type="text" name="login_usuario" placeholder="Usuario" onChange={this.onChange}/></ul>
                            <ul><label>Senha </label>
                            <input type="password" name="senha" placeholder="Senha" onChange={this.onChange}/></ul>
                            <ul><input className="botao" type="submit" value="Entrar" onClick={this.login}/></ul>
                        </div>
                    </div> 
            </div>
        );
    }
}

export default Login;