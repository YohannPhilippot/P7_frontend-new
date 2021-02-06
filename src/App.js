import './App.css';
import React from 'react'
import { BrowserRouter, Route, Switch} from 'react-router-dom'

import Login from './components/login'
import Signup from './components/signup'
import Posts from './components/posts'
import Post from './components/post'
import ModifyPost from './components/modifyPost'
import NewPost from './components/newPost'
import User from './components/user'
import ModifyUser from './components/modifyProfile';

function App() {
  return (
    <div>
      <BrowserRouter>
            
            

            <Switch>
                <Route exact path='/' component={Login} />
                <Route path='/signup' component={Signup}/>
                <Route exact path='/users/:id' component={User} />
                <Route path='/users/:id/modify' component={ModifyUser} />
                <Route path='/posts/allPosts' component={Posts}/>
                <Route path='/posts/newPost' component={NewPost} />
                <Route exact path='/posts/:id' component={Post} />
                <Route path='/posts/:id/modify' component={ModifyPost} />
                
            </Switch>
            
            
      </BrowserRouter>
    </div>
    
      
  );
}

export default App;
