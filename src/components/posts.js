import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import Cookies from 'js-cookie'
import axios from 'axios'
import moment from 'moment'



class Posts extends Component{

    constructor(props) {

        super(props)

        this.state = { posts : [] }
    }
    
    handleClick = () => {
        document.location.href='http://localhost:3000/posts/newPost'
    }

    handleRedirect = () => {
        const userId= Cookies.get('userId')
        console.log(Cookies.get('userId'))
        window.location.replace(`http://localhost:3000/users/${userId}`)
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
    
    componentWillMount() {
        this.displayPosts()
        
        
    }

    render() {
        return(
            <section>
                <div>
                    <div className='d-flex justify-content-between align-items-center mx-5'>
                        <h1 className='text-center mb-5'> Groupomania </h1>
                        <p onClick={this.handleRedirect}> Mon compte </p>
                    </div>
                    <div>
                        {this.state.posts.map( (post) =>                     
                            <div key={post.id}>
                                <Link to={`/posts/${post.id}`}>
                                    <div key={post.id}>
                                        <div className='createdAt'>
                                            Post publié le {moment(post.createdAt).format('DD-MM-YYYY, h:mm')}
                                        </div>
                                        <div className='title'>
                                            <h2> {post.title} </h2>
                                        </div>
                                        <div className='likes'>
                                            {post.likes}
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        )}
                    </div>
                    
                    <button onClick={this.handleClick}>
                        Créer une nouvelle publication
                    </button>
                    
                </div>
                
            </section>
        )
    }

}

export default Posts