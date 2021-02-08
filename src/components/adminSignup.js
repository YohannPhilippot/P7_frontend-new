import React, {Component} from 'react'
import axios from 'axios'

class Signup extends Component {

    state = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        isModerator: true
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
            <div className='text-center'>
                
                <h1 className='text-center mb-5'> Groupomania </h1>

                <form className='mb-3'>
                    <label className='col' for='firstName'>
                        Prénom :
                    </label>
                    <input onChange={this.handleChange} className='col-2' type='text' id='firstName' value={this.state.firstName} required></input>
                    <label className='col' for='lastName'>
                        Nom :
                    </label>
                    <input onChange={this.handleChange} className='col-2' type='text' id='lastName' value={this.state.lastName} required></input>
                    <label className='col' for='email'>
                    Adresse mail :
                    </label>
                    <input onChange={this.handleChange} className='col-2' type='text' id='email' value={this.state.email} required></input>
                    <label className='col' for='email'>
                    Mot de passe :
                    </label>
                    <input onChange={this.handleChange} className='col-2' type='text' id='password' value={this.state.password} required></input>
                </form>

                <button onClick={this.register}>
                    S'enregistrer
                </button>
        
            </div>
        )
    }
}

export default Signup