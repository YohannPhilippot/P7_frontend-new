import React, {Component} from 'react'
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

    handleChange = (e) => {
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
                res => window.location.replace('http://localhost:3000/posts/allPosts')
            )
            .catch( err => {
                console.log(err)
            })
        e.preventDefault();
        
    }


    render() {
        return (
            <div className='d-flex flex-column justify-content-center text-center lg-w-50'>
                
                <h1 className='text-center mb-5'> <img src={logo}/> </h1>
                <h2> Remplir le formulaire d'inscription : </h2>
                <form className='mb-3 radius-login py-3 col-10 col-lg-4 offset-1 offset-lg-4 bg-login'>
                    <label className='col' for='firstName'>
                        Prénom :
                    </label>
                    <input onChange={this.handleChange} className='col-6' type='text' id='firstName' value={this.state.firstName} required></input>
                    <label className='col' for='lastName'>
                        Nom :
                    </label>
                    <input onChange={this.handleChange} className='col-6' type='text' id='lastName' value={this.state.lastName} required></input>
                    <label className='col' for='email'>
                    Adresse mail :
                    </label>
                    <input onChange={this.handleChange} className='col-6' type='text' id='email' value={this.state.email} required></input>
                    <label className='col' for='email'>
                    Mot de passe :
                    </label>
                    <input onChange={this.handleChange} className='col-6' type='password' id='password' value={this.state.password} required></input>
                    <br/>
                    <button className='my-3 col-6 col-md-4' onClick={this.register}>
                        S'enregistrer
                    </button>
                </form>

                
        
            </div>
        )
    }
}

export default Signup