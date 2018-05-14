import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { render } from 'react-dom';
import NavBar from './nav';
import Footer from './footer';
import Tags from './tags';

export default class MyBlog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            myposts: [],
            authorid: ''
        }
    }
    componentWillMount() {
        let id = localStorage.getItem("user");
        this.setState({ authorid: id })
    }
    componentDidMount() {
        fetch(`api/blogs/author/${this.state.authorid}`)
            .then(res => {
                return res.json();
            })
            .then(myposts => {
                this.setState({ myposts })
                console.log(myposts);
            })
    }

    render() {
        let myBlogPost = this.state.myposts.map(post => {
            return (
                <div key={post.id} className="card col-md-8">
                    <div className="card-body">
                        <h5 className="card-title">{post.title}</h5>
                        <p className="created">Posted: {post._created}</p>
                        <h6 className="card-text">{post.content}</h6>
                    </div>
                    <div className="card-body d-flex justify-content-between">
                        <Link className="btn btn-primary" to={`/edit/${post.id}`}>Edit</Link>
                        <Tags id={post.id} />
                    </div>
                </div>
            )
        })
        return (
            <Fragment>
                <NavBar />
                <div className="jumbotron jumbotron-flex" style={{ backgroundColor: "#f5f5f5" }}></div>
                <div className="container d-flex justify-content-center">
                    <div className="row d-flex justify-content-center">
                        {myBlogPost}
                    </div>
                </div>
            </Fragment>
        )
    }
}