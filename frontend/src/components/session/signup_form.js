import React from 'react';
import { withRouter, Link } from 'react-router-dom';

class SignupForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            username: '',
            name: '',
            lastname: '',
            password: '',
            password2: '',
            errors: {}
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.clearedErrors = false;
        this.demoLogin = this.demoLogin.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.signedIn === true) {
            this.props.history.push('/posts');
        }

        this.setState({ errors: nextProps.errors })
    }

    update(field) {
        return e => this.setState({
            [field]: e.currentTarget.value
        });
    }

    // Animations of inputs on local state by changing class on the parent container

    displayField(field) {
        if (this.state[field] !== '') {
            return "Login-input-input with-info";
        } else {
            return "Login-input-input";
        }
    }

    // Enable/disable submit button 

    isDisabled() {
        if (this.state.email === '') {
            return true
        } else {
            return false
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        let user = {
            email: this.state.email,
            name: this.state.name,
            lastname: this.state.lastname,
            username: this.state.username,
            password: this.state.password,
            password2: this.state.password2
        };

        this.props.signup(user, this.props.history);
    }

    demoLogin(e) {
        e.preventDefault()

        let demoUser = {
            email: 'demo@gmail.com',
            password: 'guestpassword',
        }

        setTimeout(() => this.props.login(demoUser), 1000)
    }

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
                                        <div className="Login-form-item-1">
                                        <h2 className="Login-h2">Sign up to see photos and videos from your friends.</h2>
                                        </div>
                                        <div className="Login-submit-button-holder">
                                            <button id='sub' className="Login-submit-button" type="submit">
                                                <div onClick={this.demoLogin} className="Login-submit-button-text">Demo Log In</div>
                                            </button>
                                        </div>
                                        <div className="Login-separator-holder">
                                            <div className="Login-separator-line"></div>
                                            <div className="Login-separator-OR">or</div>
                                            <div className="Login-separator-line"></div>
                                        </div>
                                        <div className="Login-input-holder">
                                            <div className="Login-input-wrapper">
                                                <div className={this.displayField('email')}>
                                                    <label className="Login-text-input-label" htmlFor="email">Email</label>
                                                    <input id="email" className="Login-text-input" type="text"
                                                        value={this.state.email}
                                                        onChange={this.update('email')}

                                                    />
                                                </div>
                                                <div className="Login-input-margin"></div>
                                            </div>
                                        </div>
                                        <div className="Login-input-holder">
                                            <div className="Login-input-wrapper">
                                                <div className={this.displayField('username')}>
                                                    <label className="Login-text-input-label" htmlFor="username">Username</label>
                                                    <input id="username" className="Login-text-input" type="text"
                                                        value={this.state.username}
                                                        onChange={this.update('username')}

                                                    />
                                                </div>
                                                <div className="Login-input-margin"></div>
                                            </div>
                                        </div>
                                        <div className="Login-input-holder">
                                            <div className="Login-input-wrapper">
                                                <div className={this.displayField('name')}>
                                                    <label className="Login-text-input-label" htmlFor="name">First Name</label>
                                                    <input id="name" className="Login-text-input" type="text"
                                                        value={this.state.name}
                                                        onChange={this.update('name')}

                                                    />
                                                </div>
                                                <div className="Login-input-margin"></div>
                                            </div>
                                        </div>
                                        <div className="Login-input-holder">
                                            <div className="Login-input-wrapper">
                                                <div className={this.displayField('lastname')}>
                                                    <label className="Login-text-input-label" htmlFor="lastname">Last Name</label>
                                                    <input id="lastname" className="Login-text-input" type="text"
                                                        value={this.state.lastname}
                                                        onChange={this.update('lastname')}

                                                    />
                                                </div>
                                                <div className="Login-input-margin"></div>
                                            </div>
                                        </div>
                                        <div className="Login-input-holder">
                                            <div className="Login-input-wrapper">
                                                <div className={this.displayField('password')}>
                                                    <label className="Login-text-input-label" htmlFor="password">Password</label>
                                                    <input id="password" className="Login-text-input" type="password"
                                                        value={this.state.password}
                                                        onChange={this.update('password')}

                                                    />
                                                </div>
                                                <div className="Login-input-margin"></div>
                                            </div>
                                        </div>
                                        <div className="Login-input-holder">
                                            <div className="Login-input-wrapper">
                                                <div className={this.displayField('password2')}>
                                                    <label className="Login-text-input-label" htmlFor="password2">Confirm your Password</label>
                                                    <input id="password2" className="Login-text-input" type="password"
                                                        value={this.state.password2}
                                                        onChange={this.update('password2')}

                                                    />
                                                </div>
                                                <div className="Login-input-margin"></div>
                                            </div>
                                        </div>
                                        <div className="Login-submit-button-holder">
                                            <button id='sub' className="Login-submit-button" type="submit" disabled={this.isDisabled()}>
                                                <div className="Login-submit-button-text">Sign Up</div>
                                            </button>
                                        </div>
                                    
                                        <Link className="Login-reset-password" to={"/reset"}>Forgot password?</Link>
                                        <div className="Login-errors">{this.renderErrors()}</div>
                                    </form>
                                </div>
                            </div>
                            <div className="Login-area-2">
                                <div className="Login-Link-to-Signup">
                                    <div className="Login-Link-Holder">
                                        Have an Account? &nbsp;
                                        <Link to={"/login"}>Log In</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </article>
                </div>
            </div>
        );
    }
}

export default withRouter(SignupForm);