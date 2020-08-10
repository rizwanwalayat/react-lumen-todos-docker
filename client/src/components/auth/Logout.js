import React, { Component } from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import { destroyToken } from '../../actions/authActions'



class Logout extends Component {
    componentDidMount(){
        const {props} = this;
        axios.post('/logout', '', { headers: {
            'Authorization' : `Bearer ${this.props.token}`
        }})
          .then(res => {
            props.destroyToken();
           
          })
          .catch(error => {
            console.log(error);
            props.destroyToken();
    
          })
    }
    
    render() {
        return (
            <div>
                
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
        destroyToken: () => { dispatch(destroyToken())}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Logout)
