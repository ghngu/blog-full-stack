import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { render } from 'react-dom';
import { one, update, destroy } from '../services/blogs';
import NavBar from './nav';
import Footer from './footer';

export default class Edit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            authorid: "",
            content: "",
            title: ""
        }
    }

    componentDidMount() {
        one(this.props.match.params.id)
            .then(post => {
                this.setState({ id: post.id, authorid: post.authorid, content: post.content, title: post.title })
            })
    }

    deletePost() {
        destroy(this.state.id)
            .then(() => { this.props.history.replace("/") });
    }

    putPost() {
        update(this.state.id, { content: this.state.content })
        this.props.history.goBack();
    }

    handleInput(content) {
        this.setState({ content })
    }

    render() {
        return (
            <Fragment>
                <NavBar />
                <div className="jumbotron jumbotron-flex" style={{ backgroundColor: "#f5f5f5" }}></div>
                <div className="container d-flex justify-content-center">
                    <div className="card col-md-10" >
                        <div className="card-head">
                            <h6 className="card-title">Title: {this.state.title}</h6>
                            <h6 className="card-title">Post ID: {this.state.id}</h6>
                            <p className="card-subtitle mb-2 text-muted">Edit Post Content:</p>
                        </div>
                        <div className="card-body d-flex justify-content-center">
                            <textarea rows="6" type="text" name="chirp" className="w-100 text-center" value={`${this.state.content}`} onChange={(e) => { this.handleInput(e.target.value) }} />
                        </div>
                        <div className="links text-center">
                            <button className="btn btn-primary mr-2" onClick={() => { this.putPost() }}>Save Changes</button>
                            <button className="btn btn-danger mr-2" onClick={() => { this.deletePost() }}>Delete</button>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}