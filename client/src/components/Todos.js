import React, { Component } from 'react'
import Todo from './Todo'
import AddTodo from './AddTodo'
import {connect} from 'react-redux';
import axios from 'axios'
import { setUser } from '../actions/authActions'



class Todos extends Component {
    state = {
        todos: [
          ]
    };

    constructor(props) {
      super(props);
      axios.defaults.headers.common['Authorization'] = 'Bearer '+ props.token;
    }

    componentDidMount(){
        axios.get('/todos/')
        .then(res => {
            this.setState({
                todos: res.data.filter(todo => {
                  return (todo.status !== 'Deleted')
                })
            })
        })
        .catch(error => {
          console.log(error);
        })

        axios.get('/user')
        .then(res => {
          this.props.setUser(res.data.name);
           
        })
        .catch(error => {
          console.log(error);
        })


      } 

      markTodo = (todo) =>{
        const status = (todo.status === "Active" ? "Completed" : "Active");
        axios.patch('/todos/'+todo.id, {
            status
          })
          .then(res => {
            this.setState({
                todos: this.state.todos.map(stateTodo => {
                  if (stateTodo.id === todo.id)
                      stateTodo.status = status;
                  
                  return stateTodo;
                })
              })
          })
          .catch(error => {
            console.log(error);
          })
      }
    
      editTodo = (todo) =>{ 
        console.log(todo)
        axios.patch('/todos/'+todo.id, {
          title: todo.title,
        })
        .then(res => {
            this.setState({
                todos: this.state.todos.map(stateTodo => {
                  if (stateTodo.id === todo.id){
                  stateTodo.title = todo.title;
                }
                return stateTodo;
                })
              })
        })
        .catch(error => {
          console.log(error);
        })
      }
    
      deleteTodo = (id) =>{
        axios.delete('/todos/'+id)
          .then(res => {
              this.setState({
                  todos: this.state.todos.filter(todo => {
                    return (todo.id !== id)
                  })
                })
          })
          .catch(error => {
            console.log(error);
          })
      }
    
      addTodo = (todo) => {
        axios.post('/todos/', {
          title: todo.title,
        })
        .then(res => {
          let todos = [...this.state.todos, res.data]
          this.setState({
            todos
          })
        })
        .catch(error => {
          console.log(error);
        })
      }
      
    render(){
        const todoList = this.state.todos.length ? (
            this.state.todos.map(todo => {
                return (
                    <Todo todo={todo} key={todo.id} markTodo={this.markTodo} editTodo={this.editTodo} deleteTodo={this.deleteTodo}/>
                )
            })
        ) : (
            <p className="center">You have no Todos</p>
        );

        return (
                <ul className="todos collection">
                    <AddTodo addTodo={this.addTodo}/>

                    {todoList}
                </ul>
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
      setUser: (user) => { dispatch(setUser(user))},
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Todos)