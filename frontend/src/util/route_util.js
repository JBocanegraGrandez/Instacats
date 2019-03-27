import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, withRouter } from 'react-router-dom'

const Auth = ({ component: Component, path, loggedIn, exact }) => (
    <Route path={path} exact={exact} render={
        (props) => (
            !loggedIn ? (
                <Component {...props} />
            ) : (
                <Redirect to="/posts" />
            )
        )
    } />
);

const Protected = ({ component: Component, loggedIn, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            loggedIn ? (
                <Component {...props} />
            ) : (
                <Redirect to="login" />
            )
        }
    />
);

// const mapStateToProps = state => (
//     {loggedIn: state.session.isAuthenticated}
// );
const mapStateToProps = state => {
    // console.log(state)
   return state.session ? {loggedIn: state.session.isAuthenticated} : {loggedIn: false};
};

export const AuthRoute = withRouter(connect(mapStateToProps)(Auth));

export const ProtectedRoute = withRouter(connect(mapStateToProps(Protected)));