import React, { Component } from 'react'
import { Navbar,Nav } from 'react-bootstrap'
import Cookies from 'js-cookie'
import { Link } from 'react-router-dom'
import axios from 'axios'

import logo from "../images/icon-left-font-monochrome-white.svg"


class Post extends Component {

    constructor(props) {

        super(props)

        this.state = { post : {}, currentUserId: Cookies.get('userId'), user: {} }
    }

    handleDisconnect = () => {
        Cookies.remove('userId')
        Cookies.remove('token')
        window.location.replace('http://localhost:3000/')
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
                console.log(this.state.post.medias)
            })
        
        

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
        let medias
        
        if(this.state.post.userId == this.state.currentUserId || this.state.user.isModerator){
            deleteButton = <button className='col-8 col-md-6 offset-2 offset-md-3 my-2 bg-button bg-button--delete radius2' onClick={this.handleCLick}>Supprimer la publication</button>
            modifyButton = <Link to={`/posts/${this.state.post.id}/modify`}>
                                <button className='col-8 col-md-6 offset-2 offset-md-3 my-2 bg-button bg-button--post radius2'>
                                    Modifier la publication 
                                </button>
                            </Link>
        } else {
            deleteButton= null
            modifyButton= null
        }
        
        if(this.state.post.medias !== 'undefined') {
            medias = <div className='medias text-center my-5'>
                        <img className='mw-100' src={`/images/${this.state.post.medias}`}/>
                    </div>
        } else {
            medias = null
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
                <div className='loginpage py-5'>
                    <div className='pb-5 py-3 col-lg-6 offset-lg-3 titleAuthor postsShadow radius2' key={this.state.post.id}>
                        <div className='title text-center'>
                            <h2> {this.state.post.title} </h2>
                        </div>

                        <div className='postContent py-3'>
                            {this.state.post.content}
                        </div>

                        {medias}
                        {modifyButton}
                        <br/>
                        {deleteButton}
                    </div>
                </div>
                


            </div>
        )
    }


}

export default Post