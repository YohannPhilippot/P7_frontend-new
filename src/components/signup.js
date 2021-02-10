import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import logo from "../images/icon-left-font-monochrome-black.svg"

class Signup extends Component {

    state = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        isModerator: false
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
            ...prevState,
            [id]: value
        }))
    }

    register = (e) => {
        const data = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            password: this.state.password,
            isModerator:this.state.isModerator
        }

        axios.post('http://localhost:8080/api/users/signup', data)
            .then(
                window.location.replace('http://localhost:3000/')
            )
            .catch( err => {
                console.log(err)
            })
        e.preventDefault();
        
    }


    render() {
        return (
            <div className='d-flex flex-column justify-content-center text-center lg-w-50'>
                
                <h1 className='text-center mb-5'> <img src={logo} alt='logo groupomania'/> </h1>
                <h2> Remplir le formulaire d'inscription : </h2>
                <form className='mb-3 radius-login py-3 col-10 col-lg-4 offset-1 offset-lg-4 bg-login'>
                    <label className='col' for='firstName'>
                        Prénom :
                    </label>
                    <input onChange={this.handleChange} className='col-6' type='text' id='firstName' value={this.state.firstName} required></input>
                    <br/>
                    <small className='col-6 text-danger'></small>
                    <br/>
                    <label className='col' for='lastName'>
                        Nom :
                    </label>
                    <input onChange={this.handleChange} className='col-6' type='text' id='lastName' value={this.state.lastName} required></input>
                    <br/>
                    <small className='col-6 text-danger'></small>
                    <br/>
                    <label className='col' for='email'>
                    Adresse mail :
                    </label>
                    <input onChange={this.handleChange} className='col-6' type='text' id='email' value={this.state.email} required></input>
                    <br/>
                    <small className='col-6 text-danger'></small>
                    <br/>
                    <label className='col' for='email'>
                    Mot de passe :
                    </label>
                    <input onChange={this.handleChange} className='col-6' type='password' id='password' value={this.state.password} required></input>
                    <br/>
                    <button className='my-3 col-6 col-md-4 bg-button rounded' onClick={this.register}>
                        S'enregistrer
                    </button>
                </form>

                <Link className='row justify-content-center' to='/'>
                    Déjà un compte ? Connectez-vous !
                </Link>
        
            </div>
        )
    }
}

export default Signup