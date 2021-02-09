import React, { Component } from 'react'
import { Navbar,Nav } from 'react-bootstrap'
import Cookies from 'js-cookie'
import axios from 'axios'

import logo from "../images/icon-left-font-monochrome-white.svg"

class Post extends Component {

    constructor(props) {

        super(props)

        this.state = { post : {} }
    }

    handleClick = () => {
        const data = {
            'id' : this.state.post.id,
            'title': this.state.post.title,
            'content': this.state.post.content,
            'medias': this.state.post.medias
        }

        const token= Cookies.get('token')
        
        const headers = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }

        axios.put(`http://localhost:8080/api/posts/${this.props.match.params.id}`, data, headers)
            .then( res => {
                console.log(res)
                window.location.replace('http://localhost:3000/posts/allPosts')
            })
            .catch( err => {
                new Error(err)
            })
    }

    handleChange = (e) => {
        const { id, value } = e.target
        this.setState(prevState => ({
            post:{
                ...prevState.post,
                [id]: value
            }
            
        }))
        console.log(this.state.post)
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
                console.log(this.state)
            })

    }

    componentDidMount() {
        this.displayPost()
    }

    render() {

        const userId = Cookies.get('userId')

        return(
            <div>
                <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
                    <Navbar.Brand href="/posts/allPosts"><img src={logo} alt='logo groupomania'/></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                            <Nav.Link href={'/users/' + userId}>Mon Compte</Nav.Link>
                            <Nav.Link onClick={this.handleDisconnect} href="/">Déconnexion</Nav.Link>
                        </Nav> 
                    </Navbar.Collapse>
                </Navbar>
                <h1 className='col-10 col-lg-4 offset-1 offset-lg-4 text-center my-3'>Modifier la publication</h1>
                <form className="mt-5 col-lg-6 offset-lg-3 titleAuthor shadow-lg py-2" key={this.state.post.id}>

                    <label className='title col-6 offset-3 pt-3'> Titre </label>
                    <input className='col-6 offset-3' onChange={this.handleChange} type='text' id='title' defaultValue={this.state.post.title}></input>

                    <label className='postContent col-6 offset-3 pt-3'>Contenu de la publication</label>
                    <input className='col-6 offset-3' onChange={this.handleChange} type='text' id='content' defaultValue={this.state.post.content}></input>

                    <label className='medias col-6 offset-3 pt-3'>Medias</label>
                    <input className='col-6 offset-3' onChange={this.handleChange} type='text' id='medias' defaultValue={this.state.post.medias}></input>
         
                    
                    <button className='col-6 offset-3 my-5 bg-button rounded' onClick={this.handleClick} type='button'>
                        Modifier la publication 
                    </button>
                    
                </form>


            </div>
        )
    }


}

export default Post