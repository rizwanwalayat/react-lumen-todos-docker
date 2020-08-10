import React, {Component} from 'react';
import axios from 'axios'
import moment from 'moment'
import { Link } from 'react-router-dom'
import {connect} from 'react-redux'


import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class EditTodo extends Component {
    state = {
        id: this.props.match.params.todo_id,
        title: "",
        description: null,
        due_at: null,
    };
    
    constructor(props) {
        super(props);
        axios.defaults.headers.common['Authorization'] = 'Bearer '+ props.token;
      }
  
    componentDidMount(){
        let id = this.state.id;
        axios.get('/todos/'+id)
        .then(res => {
            console.log(res.data)
            this.setState({
                id: res.data.id,
                title: res.data.title,
                description: res.data.description,
                due_at: res.data.due_at,
            })
        })
        .catch(error => {
            console.log(error);
          })
    }

    editTodo = (e) => {
        e.preventDefault();
        axios.patch('/todos/'+this.state.id, {
            title: this.state.title,
            description: this.state.description,
            due_at: this.state.due_at
        })
        .then(res => {
            console.log(res)
        })
        .catch(error => {
            console.log(error);
          })
    }
    changeDate = (date) => {
        var due_date = moment(date).format('YYYY-MM-DD HH:mm:ss');            
        this.setState({
            due_at: due_date
        })
    }
    changeTitle = (e) => {
        this.setState({
            title: e.target.value
        })
    }
    changeDescription = (e) => {
        this.setState({
            description: e.target.value
        })
    }
    deleteDate(){
        this.setState({
            due_at: null
        })
    }
    render(){
    
        const todo = this.state.title ? (
            <div>
                <div className="section">
                <Link to={"/todos/"}><i className="medium material-icons grey-text left">arrow_back</i></Link> 
                </div>
                <div className="container">
            
                    <div className="row">
                        <form className="col s12" onSubmit={this.editTodo}>
                        <h4 className="center">Todo Item</h4>
                        <div className="row">
                            <div className="input-field col s12">
                            <input id="title" type="text" className="validate" onChange={this.changeTitle} value={this.state.title} />
                            <label htmlFor="title" className="active">Title</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                            <input id="description" type="text" className="validate" onChange={this.changeDescription} value={this.state.description ? this.state.description : "" }/>
                            <label htmlFor="description" className={ this.state.description ? "active" : "" }>Description</label>
                            </div>
                        </div>
                    
                        <div className="row">
                            <div className="input-field col s12">
                                <DatePicker
                                    selected={this.state.due_at ? new Date(this.state.due_at) : "" }
                                    onChange={date => this.changeDate(date)}
                                    // customInput={<ExampleCustomInput />}
                                    showTimeSelect
                                    timeFormat="HH:mm"
                                    timeIntervals={30}
                                    timeCaption="time"
                                    dateFormat="MMMM d, yyyy h:mm aa"
                                    placeholderText="Add date/time"
                                    />
                                {this.state.due_at ? <i className="deletedate-btn small material-icons prefix red-text text-lighten-2 " onClick={() => this.deleteDate()}>close</i> : "" } 
                                    
                            </div>
                        </div>
                        <button className="btn waves-effect waves-light" onClick={this.editTodo}>Update
                            <i className="material-icons right"></i>
                        </button>
                        </form>
                    </div>
                </div>
            </div>
        
        )
        :
        (<div className="center">Loading post...</div>)

        return (
            <div className="container">
               {todo}
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        token: state.token
    }
  }
  
  export default connect(mapStateToProps)(EditTodo)
