import React, { Component } from 'react'
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
            'medias': this.state.medias,
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

        return(
            <div>
                <h2>Créer une nouvelle publication</h2>
                <form>
                    <label> Titre </label>
                    <input onChange={this.handleChange} type='text' id='title'></input>

                    <label> Contenu de la publication </label>
                    <input onChange={this.handleChange} type='text' id='content'></input>

                    <label> Medias </label>
                    <input onChange={this.handleChange} type='text' id='medias'></input>   
                </form>
                <button onClick={this.handleClick}> Créer la publication </button>

                



            </div>
        )
    }
}

export default NewPost