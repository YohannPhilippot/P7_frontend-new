import React, { Component } from 'react'
import { Navbar,Nav } from 'react-bootstrap'
import Cookies from 'js-cookie'
import axios from 'axios'

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
    
    handleFileUpload = (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('file', this.state.medias)
        console.log(formData.append('file', this.state.medias))
        console.log(this.state.medias)
        const data = 'bonjour'
        axios.post('http://localhost:8080/api/posts/newImage', data)
            .then(res => {
                console.log(res)
            })
            .catch( err => {
                console.log(err)
            })
    }

    handleChange = (e) => {

        const { id, value }= e.target
        
        this.setState(prevState => ({
            ...prevState,
            [id]: value
            
        }))
    }

    handleClick = () => {

        const data= {
            'id' : this.state.id,
            'title': this.state.title,
            'content': this.state.content,
            'medias': this.state.medias.name,
            'likes': this.state.likes,
            'dislikes': this.state.dislikes,
            'userId' : this.state.userId,
        }

        const token= Cookies.get('token')
        
        const headers = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }

        axios.post('http://localhost:8080/api/posts/newPost', data, headers)
            .then(
                //document.location.href='http://localhost:3000/posts/allPosts'
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
                    <Navbar.Brand href="/posts/allPosts">Groupomania</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                            <Nav.Link href={'/users/' + userId}>Mon Compte</Nav.Link>
                            <Nav.Link onClick={this.handleDisconnect} href="/">Déconnexion</Nav.Link>
                        </Nav> 
                    </Navbar.Collapse>
                </Navbar>
                <h2>Créer une nouvelle publication</h2>
                <form>
                    <label> Titre </label>
                    <input onChange={this.handleChange} type='text' id='title'></input>

                    <label> Contenu de la publication </label>
                    <input onChange={this.handleChange} type='text' id='content'></input>

                    <label> Medias </label>
                    <form encType='multipart/form-data' method='post'>
                        <input onChange={this.handleFileChange} type='file' name='file' id='medias'></input>
                    
                    
                    
                        <button type='submit' onClick={this.handleFileUpload}> Confirmer le fichier </button>
                    </form>
                </form>
                <button onClick={this.handleClick}> Créer la publication </button>

                



            </div>
        )
    }
}

export default NewPost