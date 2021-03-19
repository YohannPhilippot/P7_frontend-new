import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import { Navbar,Nav } from 'react-bootstrap'
import Cookies from 'js-cookie'
import axios from 'axios'
import moment from 'moment'

import logo from "../images/icon-left-font-monochrome-white.svg"



class Posts extends Component{

    constructor(props) {

        super(props)

        this.state = { posts : [] }
    }
    
    handleDisconnect = () => {
        Cookies.remove('userId')
        Cookies.remove('token')
        window.location.replace('http://localhost:3000/')
    }

    handleClick = () => {
        document.location.href='http://localhost:3000/posts/newPost'
    }

    handleRedirect = () => {
        const userId= Cookies.get('userId')
        window.location.replace(`http://localhost:3000/users/${userId}`)
        return userId
    }

    displayPosts = () => {

        const token= Cookies.get('token')
        

        
        const headers = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
        

        axios.get('http://localhost:8080/api/posts/allPosts', headers)
            .then( res => {
                const posts = res.data
                this.setState({ posts })            
                console.log(posts)
                console.log(this.state)
                return posts
            })
            .catch( err => {
                console.log(err)
            })
        
            
        
        
    }
    
    componentDidMount() {
        this.displayPosts()
        
        
    }

    render() {

        const userId= Cookies.get('userId')

        return(
            <div>
                <div>
                    <Navbar className='header py-3' expand="lg" sticky="top">
                        <Navbar.Brand href="/posts/allPosts"><img src={logo} alt='logo groupomania' /></Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="ml-auto">
                                <Nav.Link className='white' href={'/users/' + userId}>Mon Compte</Nav.Link>
                                <Nav.Link className='white' onClick={this.handleDisconnect} href="/">Déconnexion</Nav.Link>
                            </Nav> 
                        </Navbar.Collapse>
                    </Navbar>
                    <button className='col-lg-4 offset-lg-4 my-5 bg-button bg-button--post' onClick={this.handleClick}>
                        Créer une nouvelle publication
                    </button>
                    <div className='loginpage radius2 py-5 mx-5 postsShadow mb2 borderBlack'>
                        {this.state.posts.map( (post) =>                     
                            <div className='mb2' key={post.id}>
                                <Link to={`/posts/${post.id}`} className='col-lg-6 offset-lg-3 mb-3 d-flex flex-column justify-content-center linkstyle text-dark'>
                                    <div key={post.id}>
                                        <div className='createdAt mb-1 ml-2 white'>
                                            Post publié le {moment(post.createdAt).format('DD-MM-YYYY, h:mm')}
                                        </div>
                                        <div className='titleAuthor px-2 radius2 postsShadow'>
                                            <div className='title '>
                                                <h2 className='mb-1 mt-2 ml-4'> {post.title} </h2>
                                            </div>
                                            <div className='author ml-4'>
                                                <p>Auteur: {post.user.firstName} {post.user.lastName}</p>
                                            </div>
                                        </div>
                                        
                                    </div>
                                </Link>
                            </div>
                        )}
                    </div>
                    
                    
                    
                </div>
                
            </div>
        )
    }

}

export default Posts