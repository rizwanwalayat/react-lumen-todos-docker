 import React from 'react'
 import { NavLink, withRouter } from 'react-router-dom'
 import { connect } from 'react-redux';

 const Navbar = ({isLoggedIn, user}) => {
    
     return (
         <nav>
             <div className="nav-wrapper teal lighten-1">
                <NavLink to="/" className="brand-logo">React Lumen Todo</NavLink>                   
                    { 
                        (isLoggedIn) 
                    ?   <ul id="nav-mobile" className="right">
                            <li>Welcome, {user}</li>
                            <li><NavLink to="/Todos">Todos</NavLink></li>
                            <li><NavLink to="/logout">Logout</NavLink></li>
                        </ul>
                    :   <ul id="nav-mobile" className="right">
                            <li><NavLink to="/login">Login</NavLink></li>
                            <li><NavLink to="/register">Register</NavLink></li>
                        </ul>
                    }
                 
             </div>
         </nav>
        
     )
 }
 const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.isLoggedIn,
        token: state.token,
        user: state.user
    }
}

 export default connect(mapStateToProps)(withRouter(Navbar))