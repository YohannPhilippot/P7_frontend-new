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
            .then(window.location.replace('http://localhost:3000/signup'))
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
            deleteButton = <button onClick={this.handleDelete}> Supprimer le compte </button>
            modifyButton = <button onClick={this.handleModify}> Modifier le profil </button>
        } else {
            deleteButton= null
            modifyButton= null
        }

        return(
            <div>
                <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
                    <Navbar.Brand href="/posts/allPosts"><img src={logo}/></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                            <Nav.Link href={'/users/' + userId}>Mon Compte</Nav.Link>
                            <Nav.Link onClick={this.handleDisconnect} href="/">Déconnexion</Nav.Link>
                        </Nav> 
                    </Navbar.Collapse>
                </Navbar>
                <div>
                    Nom : {this.state.user.lastName}
                </div>
                <div>
                    Prénom: {this.state.user.firstName}
                </div>
                <div>
                    Adresse mail: {this.state.user.email}
                </div>
                {modifyButton}
                {deleteButton}
            </div>
        )
    }
}

export default User