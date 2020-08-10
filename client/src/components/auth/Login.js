import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios'
import { setToken } from '../../actions/authActions'


class Login extends Component {
    login = (e) => {
        e.preventDefault();
        const username = e.target.username.value;
        const password = e.target.password.value;
        let access_token = ""
        axios.post('/oauth/token/', {
            grant_type: 'password',
            client_id: 2,
            client_secret: 'EmmHuHUJPggybfpx9U68A5PniofkIBCLbqjTpLQZ',
            username: username,
            password: password
          })
          .then(res => {
            access_token = res.data.access_token;
            this.props.setToken(access_token);
            this.props.history.push('/todos');
          })
          .catch(error => {
            console.log(error);
          })
        
    }
   
    render(){
     
        return(
            <div className="container">
            <h4 className="center">Login</h4>
            <div className="row">
                <form className="col s12" onSubmit={this.login}>
                                
                <div className="row">
                    <div className="input-field col s12">
                        <input id="username" type="email" className="validate" />
                        <label htmlFor="username">Email</label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s12">
                    <input id="password" type="password" className="validate" />
                    <label htmlFor="password">Password</label>
                    </div>
                </div>
                <button className="btn waves-effect waves-light" type="submit" name="action">Login
                    <i className="material-icons right"></i>
                </button>
                </form>
            </div>
        </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.token
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setToken: (token) => { dispatch(setToken(token))},
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)