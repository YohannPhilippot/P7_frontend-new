import React, { Component } from 'react'
import Cookies from 'js-cookie'
import { Link } from 'react-router-dom'
import axios from 'axios'


class Post extends Component {

    constructor(props) {

        super(props)

        this.state = { post : {} }
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

    }

    componentDidMount() {
        this.displayPost()
    }

    render() {
        return(
            <div>
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
                    <Link to={`/posts/${this.state.post.id}/modify`}>
                        <button>
                            Modifier la publication 
                        </button>
                    </Link>
                    <button onClick={this.handleCLick}>Supprimer la publication</button>
                </div>


            </div>
        )
    }


}

export default Post