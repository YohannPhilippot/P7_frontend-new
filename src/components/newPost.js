import React, { Component } from 'react'
import { Navbar,Nav } from 'react-bootstrap'
import Cookies from 'js-cookie'
import axios from 'axios'

import logo from "../images/icon-left-font-monochrome-white.svg"

class NewPost extends Component{

    constructor(props) {

        super(props)

        
        
        this.state = {
            id : '',
            title: '',
            content: '',
            medias: '',
            likes: '',
            dislikes: '',
            userId: ''
        }
    }

    handleFileChange = (e) => {

        this.setState({
            medias: e.target.files[0]
        }
            
            
        )
        console.log(this.state.medias)
        
    }
    

    handleChange = (e) => {

        const { id, value }= e.target
        
        this.setState(prevState => ({
            ...prevState,
            [id]: value
            
        }))
    }

    handleClick = () => {

        
        const formData = new FormData()

        formData.append('id', this.state.id)
        formData.append('title', this.state.title)
        formData.append('content', this.state.content)
        formData.append('medias', this.state.medias.name)
        formData.append('likes', this.state.likes)
        formData.append('dislikes', this.state.dislikes)
        formData.append('userId', this.state.userId)
        formData.append('image', this.state.medias)

        const token= Cookies.get('token')
        
        const headers = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }

        axios.post('http://localhost:8080/api/posts/newPost', formData, headers)
            .then(
                document.location.href='http://localhost:3000/posts/allPosts'
                )
            .catch( err => {
                new Error(err)
            })
    }


    render(){
        const userId= Cookies.get('userId')

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
                <h2 className='col-lg-6 offset-lg-3 text-center' >Créer une nouvelle publication</h2>
                <form className='d-flex flex-column justify-content-center rounded shadow-lg mb-3 py-3 col-10 col-lg-4 offset-1 offset-lg-4 bg-login'>
                    <label className='col'> Titre </label>
                    <input className='col mb-3' onChange={this.handleChange} type='text' id='title'></input>

                    <label className='col'> Contenu de la publication </label>
                    <textarea className='col mb-3 areaHeight' rows='5' onChange={this.handleChange} type='text' id='content'/>

                    <label className='col'> Medias </label>
                    <form encType='multipart/form-data' method='post'>
                        <input onChange={this.handleFileChange} type='file' name='file' id='medias'></input>
                    </form>
                </form>
                <button className='col-6 col-lg-2 offset-3 offset-lg-5 my-3 bg-button rounded' onClick={this.handleClick}> Créer la publication </button>

                



            </div>
        )
    }
}

export default NewPost