import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Cookies from 'js-cookie'
import axios from 'axios'

class User extends Component{

    constructor(props) {

        super(props)

        this.state = { user : {}}
    }

    handleClick = (e) => {
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

    render(){

        const userId= Cookies.get('userId')
        let deleteButton
        let modifyButton
        if(this.state.user.id == userId ){
            deleteButton = <button onClick={this.handleClick}> Supprimer le compte </button>
            modifyButton = <Link  to={`/users/${this.state.user.id}/modify`}> Modifier le profil </Link>
        } else {
            deleteButton= null
            modifyButton= null
        }

        return(
            <div>
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