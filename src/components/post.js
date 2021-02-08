import React, { Component } from 'react'
import { Navbar,Nav } from 'react-bootstrap'
import Cookies from 'js-cookie'
import { Link } from 'react-router-dom'
import axios from 'axios'

import logo from "../images/icon-left-font-monochrome-white.svg"


class Post extends Component {

    constructor(props) {

        super(props)

        this.state = { post : {}, currentUserId:'', user: {} }
    }

    handleCLick = (e) => {
        const token= Cookies.get('token')
        
        const headers = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }

        axios.delete(`http://localhost:8080/api/posts/${this.props.match.params.id}`, headers)
            .then(
                document.location.href='http://localhost:3000/posts/allPosts'
            )
            .catch( err => {
                new Error()
            })
    }

    displayPost = () => {


        const token= Cookies.get('token')
        
        const headers = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }

        axios.get(`http://localhost:8080/api/posts/${this.props.match.params.id}`, headers)
            .then( res => {
                const post = res.data
                this.setState({post})     
            })
        
        this.state.currentUserId = Cookies.get('userId')

        axios.get(`http://localhost:8080/api/users/${this.state.currentUserId}`)
            .then( res => {
                const user = res.data
                this.setState({ user })
                console.log(this.state)
            })
    }

    componentDidMount() {
        this.displayPost()
    }

    render() {
        
        const userId= Cookies.get('userId')

        let deleteButton
        let modifyButton
        if(this.state.post.userId == this.state.currentUserId || this.state.user.isModerator){
            deleteButton = <button onClick={this.handleCLick}>Supprimer la publication</button>
            modifyButton = <Link to={`/posts/${this.state.post.id}/modify`}>
                                <button>
                                    Modifier la publication 
                                </button>
                            </Link>
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
                <div key={this.state.post.id}>

                    <div className='title'>
                        <h2> {this.state.post.title} </h2>
                    </div>

                    <div className='postContent'>
                        {this.state.post.content}
                    </div>
                    
                    <div className='medias'>
                        {this.state.post.medias}
                    </div>
                    {modifyButton}
                    {deleteButton}
                </div>


            </div>
        )
    }


}

export default Post