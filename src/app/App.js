import { json } from "express";
import React, { Component } from "react";

class App extends Component {

    constructor (){
        super();
        this.state ={
            title:'',
            Description:''
        };
        this.handleChange = this.handleChange.bind(this);
        this.addTask = this.addTask.bind(this);
    }

    addTask(e) {
        fetch('/api/tasks', {
            method: 'POST',
            body: json.stringify(this.state),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'aplication/json'
            }
        })
        .then (res => res.json())
        .then (data =>{
            console.log(data)
            M.toast({html:'Task Saved'});
            this.setState({title:'', description:''})
        })
        .catch(err => console.error(err));

        e.preventDefault();
    }

    handleChange(e){
        const {name, value} = e.target;
        this.setState({
            [name]: value
        });

    }

    render(){
        return (
            <div>
                {/*NAVIGATION*/}
                <nav className="light-blue darken-4">
                    <div className="container">
                        <a className="brand-log" href="/">Gestion Archivos</a>
                    </div>
                </nav>
            <div className="container">
                <div className="row">
                    <div className="col s5">
                        <div className="card">
                        <div className="card-content">
                            <form onSubmit={this.addTask}> 
                                <div className="row">
                                    <div className="input-field col s12">
                                        <input name="title" type="text" onChange={this.handleChange} placeholder="Task Title" />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="input-field col s12">
                                        <textarea name="description" placeholder="Task Description" onChange={this.handleChange} className="materialize-textarea"></textarea>
                                    </div>
                                </div>
                                <button type="submit" className="btn light-blue darken-4">Send</button>
                            </form>
                            </div>
                        </div>
                    </div>
                    <div className="col s7">

                    </div>

                </div>

            </div>

            </div>
        )
    }
}

export default App;