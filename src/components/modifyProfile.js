import React, {Component} from 'react'
import { Navbar,Nav } from 'react-bootstrap'
import Cookies from 'js-cookie'
import axios from 'axios'

class ModifyUser extends Component {

    constructor(props) {

        super(props)

        this.state = { user : {}}
    }

    handleClick = (e) => {
        const token= Cookies.get('token')
        const userId= Cookies.get('userId')

        const headers = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }

        const data = {
            firstName: this.state.user.firstName,
            lastName: this.state.user.lastName,
            email: this.state.user.email
        }

        axios.put(`http://localhost:8080/api/users/${this.props.match.params.id}`, data, headers)
            .then( res => {
                const user = res.data
                this.setState({user})
                window.location.replace(`http://localhost:3000/users/${userId}`)
                
            })
            .catch( err => {
                new Error(err)
            })
    }

    handleChange = (e) => {
        const { id, value } = e.target
        this.setState(prevState => ({
            user:{
                ...prevState.user,
                [id]: value
            }
            
        }))
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
                
                
            })
            .catch( err => {
                new Error(err)
            })

    }

    componentDidMount() {
        this.displayUser()
    }

    render() {

        const userId= Cookies.get('userId')

        return(
            
            <div>
                <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
                    <Navbar.Brand href="/posts/allPosts">Groupomania</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                            <Nav.Link href={'/users/' + userId}>Mon Compte</Nav.Link>
                            <Nav.Link onClick={this.handleDisconnect} href="/">Déconnexion</Nav.Link>
                        </Nav> 
                    </Navbar.Collapse>
                </Navbar>
                <label className='firstName'> Prénom </label>
                <input onChange={this.handleChange} type='text' id='firstName' defaultValue={this.state.user.firstName}></input>

                <label className='lastName'> Nom </label>
                <input onChange={this.handleChange} type='text' id='lastName' defaultValue={this.state.user.lastName}></input>

                <label className='email'> Adresse Mail </label>
                <input onChange={this.handleChange} type='text' id='email' defaultValue={this.state.user.email}></input>

                <button onClick={this.handleClick} type='button'> Valider les modifications </button>
            </div>

        )
    }

}

export default ModifyUser