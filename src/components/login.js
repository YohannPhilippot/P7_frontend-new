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

        let regex 
        let validMessage
        let input = e.target
         if (input.id == 'firstName' || input.id == 'lastName') {
            regex = '^[a-zA-Z\u00C0-\u017F.,\-]+$'
            validMessage = 'Caractères acceptés: minuscules, majuscules . , -'
            this.valid(input, regex, validMessage)
        } else if (input.id == 'email') {
            regex = '^[0-9a-zA-Z\u00C0-\u017F.,\-]+[@]{1}[0-9a-zA-Z,\-]+[.]{1}[a-zA-Z]{1,10}$'
            validMessage = 'Veuillez entrer une adresse mail valide !'
            this.valid(input, regex, validMessage)
        }

        
        
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
                let loginError = document.getElementById('loginError')
                loginError.innerHTML = 'Mauvaise combinaison email/mot de passe'
                
                
            })
            
        e.preventDefault();
    }

    valid(input, regex, smallInner) {
        let regEx = new RegExp(
            regex, 'g'
        )
        const result = regEx.test(input.value)
        
        let br = input.nextElementSibling
        let small = br.nextElementSibling
        
        if (result) {
            input.classList.remove('bg-danger')
            small.innerHTML = null               
            
        } else {
            input.classList.add('bg-danger')
            small.innerHTML = smallInner         
        }
       
    }

    render() {
        return (
            <div  className='d-flex flex-column justify-content-center text-center lg-w-50'>

                <h1 className='text-center mb-5'> <img src={logo} alt='logo groupomania'/> </h1>
                <h2> Connectez-vous : </h2>
                <form className='mb-3 radius-login py-3 col-10 col-lg-4 offset-1 offset-lg-4 bg-login'>
                    <label className='col' for='email'>
                    Adresse mail :
                    </label>
                    <input onChange={ this.handleChange } className='col-6' type='text' id='email' required></input>
                    <br/>
                    <small className='col-6 text-danger'></small>
                    <br/>
                    <label className='col' for='email'>
                    Mot de passe :
                    </label>
                    <input onChange={ this.handleChange } className='col-6' type='password' id='password' required></input>
                    <br/>
                    <button onClick={ this.handleClick } className='my-3 col-6 col-md-4 bg-button rounded' id='connectButton'>
                        Se connecter
                    </button>
                    <br/>
                    <small className='text-danger' id='loginError'></small>
                    
                </form>

                

                <Link className='row justify-content-center' to='/signup'>
                    Pas encore de compte? Créez-le maintenant !
                </Link>
        
            </div>
        )
    }
}

export default Login
