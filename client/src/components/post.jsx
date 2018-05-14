import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { render } from 'react-dom';
import { insert } from '../services/blogs';
import NavBar from './nav';
import Footer from './footer';

export default class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            authorid: "",
            content: ""
        }
    }

    componentDidMount() {
        let id = localStorage.getItem("user");
        this.setState({ authorid: id })
    }

    handleTitle(title) {
        this.setState({ title });
        // console.log("title", this.state.title)
    }

    handleInput(content) {
        this.setState({ content })
        // console.log("content", this.state.content)
    }

    postPost() {
        insert({ title: this.state.title, authorid: this.state.authorid, content: this.state.content })
            .then(() => { this.props.history.replace("/") });
    }

    render() {
        return (
            <Fragment>
                <NavBar />
                <div className="jumbotron jumbotron-flex" style={{ backgroundColor: "#f5f5f5" }}></div>
                <div className="container d-flex justify-content-center">
                    <div className="card col-md-10">
                        <div className="card-head mt-3">
                            <h6 className="card-title mt-3">Title:</h6>
                            <input type="text" className="input-title mb-3" onChange={e => { this.handleTitle(e.target.value) }} />
                            <p className="card-subtitle mb-2 text-muted">Post Content:</p>
                        </div>
                        <div className="card-body d-flex justify-content-center">
                            <textarea rows="6" type="text" name="chirp" className="w-100 text-center" onChange={(e) => { this.handleInput(e.target.value) }} />
                        </div>
                        <div className="links text-center">
                            <button className="btn btn-primary mr-2" onClick={() => { this.postPost() }}>Make Post</button>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}