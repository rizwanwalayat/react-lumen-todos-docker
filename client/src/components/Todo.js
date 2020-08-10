import React, { Component } from 'react'
import Moment from 'react-moment'
import { Link } from 'react-router-dom'
import moment from 'moment'

class Todo extends Component {
    state = {
        id: null,
        title: "",
        due_at: "",
        editing: false,
        startDate: new Date()
    }

    constructor(props){
        super(props);
        this.state = {
            id: props.todo.id,
            title: props.todo.title,
            due_at: props.todo.due_at,
            editing: false,
        }
     }
    
    toggleEdit(){
        this.setState({
            editing: true
        })
    }
    doneEdit(){
        this.setState({
            editing: false
        })
        this.props.editTodo(this.state);   
    }
    handleChange = (e) => {
        this.setState({
            title: e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.doneEdit();
    }
   
    render() {
        const {todo, markTodo, deleteTodo} = this.props;
        const calendarStrings = {
            lastDay : '[Yesterday]',
            sameDay : '[Today,] LT',
            nextDay : '[Tomorrow,] LT',
            lastWeek : '[last] dddd',
            nextWeek : 'dddd[,] LT ',
            sameElse : 'L, LT'
        };   
        const now = moment().format('YYYY-MM-DD HH:mm:ss');            

       
        return (
            
            <li className="collection-item avatar">
                <label className="circle">
                    <input type="checkbox" className="" checked={todo.status === "Completed"? "checked" : ""} onChange={() => markTodo(todo)}/>
                    <span></span>
                </label>
                {(!this.state.editing) ? <p className={"title "+(todo.status === "Completed"? "completed" : "")} onDoubleClick={() => this.toggleEdit()}>{this.state.title}</p> : <form onSubmit={this.handleSubmit}><input type="text" onChange={this.handleChange} onBlur={() => this.doneEdit()} value={this.state.title}/></form> }
                
                <p className="grey-text text-darken-1">{todo.description}</p>
                {todo.due_at ? <button className={"datetime waves-effect waves-light btn grey lighten-4 btn-flat "+(todo.due_at<now ? "red-text text-darken-1" : "teal-text")}><i className="material-icons left">today</i><Moment className ="grey-text text-darken-2" calendar={calendarStrings}>{todo.due_at}</Moment></button> : "" }
                <i className="delete-btn secondary-content small material-icons red-text text-lighten-2 right" onClick={() => deleteTodo(todo.id)}>delete_forever</i>                    
                <Link to={"/todos/edit/"+todo.id} className="edit-btn small material-icons grey-text right">edit</Link> 
                
               
            </li>
        )
               
    }
}


export default Todo;