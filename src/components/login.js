import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Cookies from 'js-cookie'

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
            <div  className='text-center'>

                <h1 className='text-center mb-5'> Groupomania </h1>
                
                <form className='mb-3'>
                    <label className='col' for='email'>
                    Adresse mail :
                    </label>
                    <input onChange={ this.handleChange } className='col-2' type='text' id='email' required></input>
                    <label className='col' for='email'>
                    Mot de passe :
                    </label>
                    <input onChange={ this.handleChange } className='col-2' type='text' id='password' required></input>
                </form>

                <button onClick={ this.handleClick } className='col-1 mb-3'>
                    Se connecter
                </button>

                <Link className='row justify-content-center' to='/signup'>
                    Pas encore de compte? Créez-le maintenant !
                </Link>
        
            </div>
        )
    }
}

export default Login
