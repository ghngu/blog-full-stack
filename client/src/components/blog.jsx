import React, { Component, Fragment } from 'react';
import { Link } from "react-router-dom";
import { all } from "../services/blogs";
import { render } from 'react-dom';
import NavBar from './nav';
import Footer from './footer';
import Tags from './tags';

export default class Blog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            blogs: [],
        }
    }

    componentDidMount() {
        all()
            .then(blogs => {
                this.setState({ blogs })
            })
    }

    render() {
        let blogPosts = this.state.blogs

        let blogPost = blogPosts.map(post => {
            return (
                <div key={post.id} className="card col-md-3 mx-3 my-2">
                    <div className="card-body">
                        <h5 className="card-title">{post.title}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">Written by: {post.author}</h6>
                        <p className="card-text">{post.content.substring(0, 100)}...</p>
                        <div className="row d-flex justify-content-between align-center">
                            <Link className="btn" to={`blogs/${post.id}`}>Read More</Link>
                        </div>
                    </div>
                </div>
            )
        })

        let heroImageStyle = {
            backgroundImage: 'url(https://images.alphacoders.com/789/thumb-1920-789452.jpg)',
            height: '600px',
            backgroundAttachment: 'fixed',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
        }

        let heroTextStyle = {
            textAlign: 'center',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-25%, -100%)'
        }

        return (
            <Fragment>
                <NavBar />
                <div className="jumbotron jumbotron-fluid" style={heroImageStyle}>
                    <div className="hero-text" style={heroTextStyle}>
                        <h3>Welcome to:</h3>
                        <h1>Bumblr</h1>
                        <h6>A place to explore</h6>
                    </div>
                </div>
                <div className="row d-flex justify-content-center">
                    {blogPost}
                </div>
                <Footer />
            </Fragment >
        )
    }
}