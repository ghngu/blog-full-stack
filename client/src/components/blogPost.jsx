import React, { Component, Fragment } from 'react';
import { render } from 'react-dom';
import { one } from '../services/blogs';
import NavBar from './nav';
import Footer from './footer';
import Tags from './tags';

export default class BlogPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            post: {},
            id: this.props.match.params.id
        }
    }

    componentWillMount() {
        one(this.props.match.params.id)
            .then(post => {
                this.setState({ post })
            })
    }

    render() {
        let post = this.state.post
        return (
            <Fragment>
                <NavBar />
                <div className="jumbotron jumbotron-flex" style={{ backgroundColor: "#f5f5f5" }}></div>
                <div className="container d-flex justify-content-center">
                    <div className="row d-flex justify-content-center">
                        <div className="card col-md-8">
                            <div className="card-body">
                                <h5 className="card-title">{post.title}</h5>
                                <p className="created">Posted: {post._created}</p>
                                <h6 className="card-text">{post.content}</h6>
                            </div>
                            <div className="tags text-right">
                                <Tags blogId={this.state.id} />
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </Fragment>
        )
    }
}