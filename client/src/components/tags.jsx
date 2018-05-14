import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { render } from 'react-dom';

export default class Tags extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tags: [],
            id: this.props.blogId
        }
    }
    componentDidMount() {
        fetch(`/api/blogtags/${this.props.blogId}`)
            .then(res => {
                return res.json();
            })
            .then(tags => {
                this.setState({ tags });
            })
    }

    render() {
        let tagLi = this.state.tags.map((tag, index) => {
            return <li key={index} className="dropdown-item">{tag.tagname}</li>
        })
        return (
            <div className="nav-item dropdown btn btn">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Tags</a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                    {tagLi}
                </ul>
            </div>
        )

    }
}