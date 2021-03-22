import React, { Component } from 'react'
import { Navbar,Nav } from 'react-bootstrap'
import Cookies from 'js-cookie'
import axios from 'axios'

import logo from "../images/icon-left-font-monochrome-white.svg"

class Post extends Component {

    constructor(props) {

        super(props)

        this.state = { post : {}, medias:''}
    }

    handleClick = () => {
        const formData = new FormData()

        formData.append('id', this.state.post.id)
        formData.append('title', this.state.post.title)
        formData.append('content', this.state.post.content)
        formData.append('medias', this.state.post.medias)
        formData.append('likes', this.state.post.likes)
        formData.append('dislikes', this.state.post.dislikes)
        formData.append('userId', this.state.post.userId)
        formData.append('image', this.state.medias)

        const token= Cookies.get('token')
        
        const headers = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }

        axios.put(`http://localhost:8080/api/posts/${this.props.match.params.id}`, formData, headers)
            .then( res => {
                console.log(res)
                window.location.replace(`http://localhost:3000/posts/${this.state.post.id}`)
            })
            .catch( err => {
                new Error(err)
            })
    }

    handleFileChange = (e) => {
        
        this.setState(prevState => ({
            ...prevState,
            post: {
                title: this.state.post.title,
                content:this.state.post.content,
                medias: e.target.files[0].name,
                id: this.state.post.id,
                userId: this.state.post.userId,
                likes:this.state.post.likes,
                dislikes: this.state.post.dislikes
            },
            medias:e.target.files[0]

        }))
        console.log(e.target.files[0].name)
        console.log(this.state.post)
        
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
                <div className='loginpage borderBlack'>
                    <h1 className='col col-lg-6 offset-lg-3 text-center py-3 white'>Modifier la publication</h1>
                    <form className="mt-2 col-lg-6 offset-lg-3 titleAuthor postsShadow py-2 radius2" key={this.state.post.id}>

                        <label className='title col-6 offset-3 pt-3'> Titre </label>
                        <input className='col-10 offset-1 col-lg-6 offset-lg-3 radius2 inputBorder' onChange={this.handleChange} type='text' id='title' defaultValue={this.state.post.title}/>

                        <label className='postContent col-6 offset-3 pt-3'>Contenu de la publication</label>
                        <textarea className='col-10 offset-1 col-lg-6 offset-lg-3 radius2 inputBorder' onChange={this.handleChange} type='text' id='content' defaultValue={this.state.post.content}/>

                        <label className='medias col-6 offset-3 pt-3'>Medias</label>
                        <input className='col-10 offset-1 col-lg-6 offset-lg-3 radius2 inputBorder' onChange={this.handleChange} type='text' id='medias' defaultValue={this.state.post.medias}/>
                        <form encType='multipart/form-data' method='post'>
                            <input className='col-4 col-lg-6 offset-1 offset-md-3 mt-4' onChange={this.handleFileChange} type='file' name='file' id='medias'/>
                        </form>
                        
                        <button className='col-6 offset-3 my-5 bg-button bg-button--confirm radius2' onClick={this.handleClick} type='button'>
                            Modifier la publication 
                        </button>
                        
                    </form>
                </div>

            </div>
        )
    }


}

export default Post