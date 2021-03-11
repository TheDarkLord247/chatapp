import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from "react-router-dom";
import './App.css';
import SettingsGeneral from './components/SettingsGeneral.js';
import SettingsAppearance from './components/SettingsAppearance.js';
import SettingsSignout from './components/SettingsSignout.js';
import ChatWindow from './components/ChatWindow.js';
import LoginPage from './components/LoginPage.js';
import About from './components/About.js';
import SignupPage from './components/SignupPage.js';
import SearchPage from './components/SearchPage.js';
import FriendRequests from './components/FriendRequests.js';

import Test from './components/Test.js';
import Nav from './components/Nav.js';
import Page404 from './components/Page404.js';

import {isLoggedIn} from './utils.js';
import {storage} from './firebase-config.js';

// future features: notifications popup 
// render the notifications menu if the user has clicked on the notifications button
// function RenderNotifs(props) {
//   const status = props.status;
//   if (status) {
//     return (
//       <div class="notifications">
//         <div class="notifications-content">
//           notification
//         </div>
//         <div class="notifications-content">
//           notification
//         </div>
//         <div class="notifications-content">
//           notification
//         </div>
//         <div class="notifications-content">
//           notification
//         </div>
//         <div class="notifications-content">
//           notification
//         </div>
//         <div class="notifications-content">
//           notification
//         </div>
//         <div class="notifications-content">
//           notification
//         </div>
//         <div class="notifications-content">
//           notification
//         </div>
//       </div>
//     )
//   }
//   return (null);
// }

//changed App from a function a class 
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      curPage: 0,
      showNotif: false,
      response: '',
    };
    /*this.CurNav = this.CurNav.bind(this);
    this.mainNav = this.mainNav.bind(this);
    this.LogInNav = this.CurNav.bind(this);*/
  }
  //curPage values: Log in page: 0, Sign up page: 1, About page: 2, Settings page: 3, Chats page: 4
  //loggedIn state variable is to make sure someone is logged in before they can click on settings or chats

  handleClick(i) {
    this.setState({
      curPage: i,
    })
  }

  handleLogin() {
    this.setState({
      curPage: 2,
    })
  }

  handleNotifClick() {
    this.setState({
      showNotif: !this.state.showNotif,
    })
  }

  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <Nav />
            <div id="reqsent"> Friend request sent!</div>
            <Switch>
              <Route path="/about">
                <About />
              </Route>
              <Route path="/signup">
                <SignupPage />
              </Route>
              <Route path="/login">
                <LoginPage />
              </Route>
              <Route path="/chats">
                <ChatWindow />
              </Route>
              <Route path="/search">
                <SearchPage />
              </Route>
              <Route path="/settings/general">
                <SettingsGeneral />
              </Route>
              <Route path="/settings/appearance">
                <SettingsAppearance />
              </Route>
              <Route path="/settings/signout">
                <SettingsSignout />
              </Route>
              <Route path="/search">
                <SearchPage />
              </Route>
              <Route path="/friendrequests">
                <FriendRequests />
              </Route>
              <Route exact path="/"> // needs to be exact path otherwise it becomes default
                <LoginPage/>
              </Route>
              <Route path="/404" component={Page404} />
              <Redirect to="/404" />
            </Switch>
          </div>
        </Router>
      </div>
    )
  }
}

export default App;
