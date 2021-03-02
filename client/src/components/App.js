import React, { Component } from 'react';
import { BrowersRouter, BrowserRouter, Route} from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
import Landing from './Landing';
const Dashboard = () => <h2>Dashboard</h2>
const SurveyNew = () => <h2>SurveyNew</h2>

class App extends Component {
    // As soon as the react app boots up we will be calling the fetchUser
    // action creator.
    componentDidMount() {
        this.props.fetchUser();
    }

    render() {
        return (
            <div className="container">
                <BrowserRouter>
                    <div>
                        <Header />
                        <Route exact path="/" component = { Landing } />
                        <Route exact path="/surveys" component = { Dashboard } />
                        <Route path="/surveys/new" component = { SurveyNew } />
                    </div>
                </BrowserRouter>  
            </div>
        );
    }
};

// We are using the react-redux library to hook up our actions to our App class. Here
// we are passing in all the actions we will be creating and then we are registering these actions
// with the App class. This will attach all our actions that we exported onto the props property onto
// App class.
export default connect(null, actions)(App);