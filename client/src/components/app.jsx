import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import blogRouter from './blog';
import blogPostRouter from './blogPost';
import editRouter from './edit';
import postRouter from './post';
import loginRouter from './auth/login';
import logoutRouter from './auth/logout';
import PrivateRoute from './auth/privateRoute';
import tagsRouter from './tags';
import myBlogRouter from './myblog';
import Donate from './donate';
import Contact from './contact'

class Navigation extends Component {
    render() {
        return (
            <Router>
                <Fragment>
                    <Switch>
                        <Route exact path="/" component={blogRouter} />
                        <Route exact path="/blogs/:id" component={blogPostRouter} />
                        <PrivateRoute exact path="/edit/:id" component={editRouter} />
                        <PrivateRoute exact path="/post" component={postRouter} />
                        <Route exact path="/login" component={loginRouter} />
                        <Route exact path="/logout" component={logoutRouter} />
                        <Route exact path="/tags" component={tagsRouter} />
                        <Route exact path="/donate" component={Donate} />
                        <Route exact path="/contact" component={Contact} />
                        <PrivateRoute exact path="/my-blog" component={myBlogRouter} />
                    </Switch>
                </Fragment>
            </Router>
        )
    }
}

export default Navigation;