import React, { Component } from "react";
import './style/SearchPage.css';
import egg from '../images/paul.jpg';
import {Redirect} from "react-router-dom";
import {isLoggedIn} from '../utils.js';

export default class SearchPage extends Component {

    constructor(props)
    {
        super(props);
        this.state = {loggedIn: true, search: ""};
    }
    componentDidMount() //we need to make sure we are actually logged in
    {                   
        console.log("Inside component did mount for chat window");
        isLoggedIn().then(loggedIn => this.setState({loggedIn: loggedIn}));
    }

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }

    handleSubmit =  async (event) => {
        event.preventDefault();
        const result = await fetch("/search", 
                  {
                    method: 'POST',
                    headers: {
                      'Content-Type': "application/json; charset=utf-8",
                  },
                  body: JSON.stringify(this.state) /* this is the data being posted */
        })

        const res = await result.json();  /* this is the res sent by the backend */

        event.target.reset(); // clear out form entries

        // make the contactList object 
    };

    handleClick() {

        //change addstatus, send update to backend 

    }


    render() {
        if(this.state.loggedIn == false)
        {
            return <Redirect to='/login' />;
        }

        //receive this from the backend
        const contactList = [{user: 'Paul', addstatus: 0}, {user: 'Aman', addstatus: 1}, {user: 'Milo', addstatus: 2}, ]

        var renderedcards = contactList.map(contactcard => 
            <div className="contactcard">
                <div className="contactname">
                    {contactcard['user']}
                </div>
                <div className = { (contactcard['addstatus'] === 0) ? "button-add" : (contactcard['addstatus'] === 1) ? "button-pending" : "button-friend"}
                onClick={() => this.handleClick()}/>
            </div>
            )


        return (
            <div className="searchpage">
                <form action="/search" onSubmit={this.handleSubmit}>
                    <input 
                        type="search"
                        name="query"
                        class="search-input"
                        value= {this.state.value}
                        onChange= {this.handleChange}
                        placeholder="Search for Friends"

                    />
                </form>
                {renderedcards}
            </div> 
        )
    }
}
