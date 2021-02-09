import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Cookies from 'js-cookie'

import logo from "../images/icon-left-font-monochrome-black.svg"

class Login extends Component {

    state = {
        email:'',
        password:'',
        token:'',
        connection: null,
        error: ''
    }

    handleChange = (e) => {
        const { id, value } = e.target
        this.setState(prevState => ({
            ...prevState.post,
            [id]: value
        }))
    }

    handleClick = (e) => {
        const data = {
            email: this.state.email,
            password: this.state.password
        }

        axios({
            method: 'post',
            url: 'http://localhost:8080/api/users/login',
            data: data
        })
            .then( res => {
                if (res.status === 200) {
                    this.setState(prevState => ({
                        ...prevState,
                        connection: 'Connecté avec succès à Groupomania'
                    }))
                    
                    document.location.href='http://localhost:3000/posts/allPosts'
                    
                    Cookies.set('token', res.data.token)
                    Cookies.set('userId', res.data.userId)                   
                } else {
                    console.log(res)
                }})
            .catch( err => {
                this.setState({ error: 'La tentative de connexion a échoué !'})
            })
            
        e.preventDefault();
    }

    render() {
        return (
            <div  className='d-flex flex-column justify-content-center text-center lg-w-50'>

                <h1 className='text-center mb-5'> <img src={logo} alt='logo groupomania'/> </h1>
                
                <form className='mb-3 radius-login py-3 col-10 col-lg-4 offset-1 offset-lg-4 bg-login'>
                    <label className='col' for='email'>
                    Adresse mail :
                    </label>
                    <input onChange={ this.handleChange } className='col-6' type='text' id='email' required></input>
                    <label className='col' for='email'>
                    Mot de passe :
                    </label>
                    <input onChange={ this.handleChange } className='col-6' type='text' id='password' required></input>
                    <br/>
                    <button onClick={ this.handleClick } className='my-3 col-6 col-md-4 bg-button rounded'>
                        Se connecter
                    </button>
                </form>

                

                <Link className='row justify-content-center' to='/signup'>
                    Pas encore de compte? Créez-le maintenant !
                </Link>
        
            </div>
        )
    }
}

export default Login
