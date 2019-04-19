import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Switch } from 'react-router-dom';
import NavBarContainer from './nav/navbar_container';
import Footer from './footer/footer'

import MainPage from './main/main_page';
import LoginFormContainer from './session/login_form_container';
import SignupFormContainer from './session/signup_form_container';
import ProfileContainer from '../components/profile/profile_container';
import PostsContainer from "../components/posts/posts_container";
import PostComposeContainer from "../components/posts/post_compose_container";
import EditProfile from '../components/profile/edit_profile_container'
import EditPassword from '../components/profile/edit_password'

const App = () => (
    <div>
        <NavBarContainer/>
     <Switch>
         <AuthRoute exact path="/" component={MainPage} />
         <AuthRoute exact path="/login" component={LoginFormContainer} />
         <AuthRoute exact path="/signup" component={SignupFormContainer} />

         <ProtectedRoute exact path="/accounts/edit" component={EditProfile} />
         <ProtectedRoute exact path="/accounts/password" component={EditPassword} />
         <ProtectedRoute exact path="/posts" component={PostsContainer} />
         <ProtectedRoute exact path="/profile" component={ProfileContainer} />
         <ProtectedRoute exact path="/new_post" component={PostComposeContainer} />
         <ProtectedRoute exact path="/:username" component={ProfileContainer} />
     </Switch>
        <Footer />
    </div>
);

export default App;