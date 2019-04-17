import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import './session.css'

class LoginForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            errors: {}
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.renderErrors = this.renderErrors.bind(this);
    }

    // Once the user has been authenticated, redirect to Profile
    componentWillReceiveProps(nextProps) {
        if (nextProps.currentUser === true) {
            this.props.history.push('/profile');
        }

        // Errors update
        this.setState({ errors: nextProps.errors })
    }

    // Handle field updates (called in the render method)
    update(field) {
        return e => this.setState({
            [field]: e.currentTarget.value
        });
    }

    // Handle form submission
    handleSubmit(e) {
        e.preventDefault();

        let user = {
            email: this.state.email,
            password: this.state.password
        };

        this.props.login(user);
    }

    // Rendeing errors
    renderErrors() {
        return (
            <ul>
                {Object.keys(this.state.errors).map((error, i) => (
                    <li key={`error-${i}`}>
                        {this.state.errors[error]}
                    </li>
                ))}
            </ul>
        );
    }

    render() {
        return (
            <div className="Login-form-wrapper">
                <div className="Login-form-holder">
                    <article className="Login-item-wrapper">
                        <div className="Login-item-holder">
                            <div className="Login-area-1">
                                <h1 className="Login-title">Instaram</h1>
                                <div className="Login-form-items">
                                    <form onSubmit={this.handleSubmit}>
                                        <div className="Login-form-item-1"></div>
                                        <div className="Login-input-holder">
                                            <div className="Login-input-wrapper">
                                                <div className="Login-input-input">
                                                    <label className="Login-text-input-label" for="email">Email</label>
                                                    <input id="email" className="Login-text-input" type="text"
                                                        value={this.state.email}
                                                        onChange={this.update('email')}
                                                        placeholder="Email"
                                                    />
                                                </div>
                                                <div className="Login-input-margin"></div>
                                            </div>
                                        </div>
                                        <div className="Login-input-holder">
                                            <div className="Login-input-wrapper">
                                                <div className="Login-input-input">
                                                    <label className="Login-text-input-label" for="password">Password</label>
                                                    <input id="password" className="Login-text-input" type="password"
                                                        value={this.state.password}
                                                        onChange={this.update('password')}
                                                        placeholder="Password"
                                                    />
                                                </div>
                                                <div className="Login-input-margin"></div>
                                            </div>
                                        </div>
                                        <div className="Login-submit-button-holder">
                                            <button  className="Login-submit-button" type="submit">
                                                <div className="Login-submit-button-text">Log In</div>
                                            </button>
                                            {this.renderErrors()}
                                        </div>
                                        <div className="Login-separator-holder">
                                            <div className="Login-separator-line"></div>
                                            <div className="Login-separator-OR">or</div>
                                            <div className="Login-separator-line"></div>
                                        </div>
                                        <div className="Login-submit-button-holder">
                                            <button className="Login-demo-button" type="submit">
                                                <div className="Login-submit-button-text">Demo Log In</div>
                                            </button>
                                        </div>
                                        <Link className="Login-reset-password" to={"/reset"}>Forgot password?</Link>
                                    </form>
                                </div>
                            </div>
                            <div className="Login-area-2">
                                <p className="Login-Link-to-Signup">
                                    <div className="Login-Link-Holder">
                                        Don't have an account? &nbsp;
                                        <Link to={"/signup"}>Sign up</Link>
                                    </div>
                                </p>
                            </div>
                        </div>
                    </article>
                </div>
            </div>
        );
    }
}

export default withRouter(LoginForm);