import React, { Component } from 'react'
import Cookies from 'js-cookie'
import axios from 'axios'



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
        return(
            <div>
                <form className="form-flex" key={this.state.post.id}>

                    <label className='title'> Titre </label>
                    <input onChange={this.handleChange} type='text' id='title' defaultValue={this.state.post.title}></input>

                    <label className='postContent'>Contenu de la publication</label>
                    <input onChange={this.handleChange} type='text' id='content' defaultValue={this.state.post.content}></input>

                    <label className='medias'>Medias</label>
                    <input onChange={this.handleChange} type='text' id='medias' defaultValue={this.state.post.medias}></input>
         
                    
                    <button onClick={this.handleClick} type='button'>
                        Modifier la publication 
                    </button>
                    
                </form>


            </div>
        )
    }


}

export default Post