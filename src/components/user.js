import React, { Component } from 'react'
import { Navbar,Nav } from 'react-bootstrap'
import Cookies from 'js-cookie'
import axios from 'axios'

import logo from "../images/icon-left-font-monochrome-white.svg"

class User extends Component{

    constructor(props) {

        super(props)

        this.state = { user : {}}
    }

    handleDelete = (e) => {
        const token= Cookies.get('token')
        
        const headers = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }

        axios.delete(`http://localhost:8080/api/users/${this.props.match.params.id}`, headers)
            .then(window.location.replace('http://localhost:3000/'))
            .catch( err => {
                new Error(err)
            })
    }

    handleModify = () => {
        window.location.replace(`http://localhost:3000/users/${this.state.user.id}/modify`)
    }

    handleDisconnect = () => {
        Cookies.remove('userId')
        Cookies.remove('token')
        window.location.replace('http://localhost:3000/')
    }

    displayUser = () => {


        const token= Cookies.get('token')
        
        const headers = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }

        axios.get(`http://localhost:8080/api/users/${this.props.match.params.id}`, headers)
            .then( res => {
                const user = res.data
                this.setState({user})
                console.log(this.state)
                
            })
            .catch( err => {
                new Error(err)
            })

    }

    componentDidMount() {
        this.displayUser()
    }

    render(){

        const userId= Cookies.get('userId')
        let deleteButton
        let modifyButton
        if(this.state.user.id == userId ){
            deleteButton = <button className='col-8 offset-2 my-2 bg-button bg-button--delete' onClick={this.handleDelete}> Supprimer le compte </button>
            modifyButton = <button className='col-8 offset-2 my-2 bg-button bg-button--post' onClick={this.handleModify}> Modifier le profil </button>
        } else {
            deleteButton= null
            modifyButton= null
        }

        return(
            <div>
                <Navbar className='header py-3' expand="lg" sticky="top">
                    <Navbar.Brand href="/posts/allPosts"><img src={logo} alt='logo groupomania'/></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                            <Nav.Link className='white' href={'/users/' + userId}>Mon Compte</Nav.Link>
                            <Nav.Link className='white' onClick={this.handleDisconnect} href="/">Déconnexion</Nav.Link>
                        </Nav> 
                    </Navbar.Collapse>
                </Navbar>
                <div className='loginpage'>
                    <h1 className='col col-lg-4 offset-lg-4 text-center pt-4 mb-3 white' >Mon Compte</h1>
                    <div className='mb-3 py-3 col-10 col-lg-4 offset-1 offset-lg-4 bg-login radius2'>
                        <div className='col my-3'>
                            <span className='bold'>Nom :</span> {this.state.user.lastName}
                        </div>
                        <div className='col my-3'>
                            <span className='bold'>Prénom :</span> {this.state.user.firstName}
                        </div>
                        <div className='col my-3'>
                            <span className='bold'>Adresse mail :</span> {this.state.user.email}
                        </div>
                        {modifyButton}
                        <br/>
                        {deleteButton}
                    </div>
                </div>
                
                
            </div>
        )
    }
}

export default User