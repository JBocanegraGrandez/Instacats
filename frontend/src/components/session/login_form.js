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
        this.demoLogin = this.demoLogin.bind(this);
        this.demoLoginAnimation = this.demoLoginAnimation.bind(this);
    }

    // Once the user has been authenticated, redirect to Profile
    componentWillReceiveProps(nextProps) {
        if (nextProps.currentUser === true) {
            this.props.history.push('/profile');
        }

        // Errors update
        this.setState({ errors: nextProps.errors })
    }

    submitBehavior(el) {
     
        
    }

    // Handle field updates (called in the render method)
    update(field) {
        return e => {
            this.setState({[field]: e.currentTarget.value });
            
        }
    }

    
    // Animations of inputs on local state by changing class on the parent container

    displayField (field) {
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

    demoLoginAnimation() {
        let demoEmail = Array.from('demo@gmail.com');
        let demoPassword = Array.from('guestpassword')


        for ( let i = 0; demoEmail.length > 0 ; i++) {
            let state = this.state.email
            console.log(demoEmail)
            this.setState({ email: demoEmail.shift() })
            console.log(state)

        }

    }

    // Handle demo login
    demoLogin() {
        this.setState({email: 'demo@gmail.com'})
        this.setState({password: 'guestpassword'})

        let demoUser = {
            email: this.setState.email,
            password: this.state.password,
        }

        this.props.login(demoUser)
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
                                        <div className="Login-submit-button-holder">
                                            <button  id='sub' className="Login-submit-button" type="submit" disabled={this.isDisabled()}>
                                                <div className="Login-submit-button-text">Log In</div>
                                            </button>
                                        </div>
                                        <div className="Login-separator-holder">
                                            <div className="Login-separator-line"></div>
                                            <div className="Login-separator-OR">or</div>
                                            <div className="Login-separator-line"></div>
                                        </div>
                                        <div className="Login-submit-button-holder">
                                            <button className="Login-demo-button" type="submit">
                                                <div className="Login-submit-button-text" onClick={() => this.demoLogin()}>Demo Log In</div>
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
                                        Don't have an account? &nbsp;
                                        <Link to={"/signup"}>Sign up</Link>
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

export default withRouter(LoginForm);