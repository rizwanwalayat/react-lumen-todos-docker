import React, {Component} from 'react';
import axios from 'axios'


class Register extends Component {
    register = (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        axios.post('/register', {
            name: name,
            email: email,
            password: password
          })
          .then(res => {
            this.props.history.push('/login');
          })
          .catch(error => {
            console.log(error);
          })
        
    }
   
    render(){
     
        return(
            <div className="container">
            <h4 className="center">Register</h4>
            <div className="row">
                <form className="col s12" onSubmit={this.register}>
                
                <div className="row">
                    <div className="input-field col s12">
                        <input id="name" type="text" className="validate" />
                        <label htmlFor="name">Name</label>
                    </div>
                </div>
              
                <div className="row">
                    <div className="input-field col s12">
                        <input id="email" type="email" className="validate" />
                        <label htmlFor="email">Email</label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s12">
                    <input id="password" type="password" className="validate" />
                    <label htmlFor="password">Password</label>
                    </div>
                </div>
                <button className="btn waves-effect waves-light" type="submit" name="action">Create Account
                    <i className="material-icons right"></i>
                </button>
                </form>
            </div>
        </div>
        )
    }
}


export default Register