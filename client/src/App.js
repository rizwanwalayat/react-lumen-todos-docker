import React, { Component } from 'react';
import Todos from './components/Todos'
import Navbar from './components/Navbar'
import { Redirect, BrowserRouter, Route, Switch} from 'react-router-dom'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Logout from './components/auth/Logout'
import EditTodo from './components/EditTodo'
import axios from 'axios'
import {connect} from 'react-redux'



class App extends Component {
  
  constructor(props) {
    super(props);
    axios.defaults.baseURL = 'http://localhost:8000';
  }
  render(){
    const isLoggedIn = this.props.isLoggedIn;
    return (
      <BrowserRouter>
        <div className="App container">
          <Navbar/>
          <Switch>
            <Route exact path="/"> {isLoggedIn ? <Redirect to="/todos" /> : <Redirect to="/login" />}</Route>
            <Route exact path='/todos'> {isLoggedIn ? <Todos /> : <Redirect to="/login"/>}</Route>
            <Route path='/todos/edit/:todo_id' component={isLoggedIn ? EditTodo : Login} /> 
            <Route path="/login"> {isLoggedIn ? <Redirect to="/todos" /> : <Login />}</Route>
            <Route path="/logout"> {isLoggedIn ? <Logout/> : <Redirect to="/login"/>}</Route>

            <Route path='/register' component={Register} />
          </Switch>

        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) => {
  return {
      isLoggedIn: state.isLoggedIn
  }
}


export default connect(mapStateToProps)(App)
