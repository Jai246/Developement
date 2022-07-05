import './App.css';
import React, { useContext } from 'react';
import { AuthContextProvider, AuthContext } from "./Components/AuthContext";
import Login from './Components/Login'
import SignUp from './Components/SignUp'
import Forget from './Components/Forget'
import PageNotFound from './Components/PageNotFound'
import Profile from './Components/Profile.jsx'
import Feed from './Components/Feed'
// Note that we instll react router dom for routing
// npm i react-router-dom@5.3.1


import {BrowserRouter,Switch,Route,Redirect} from 'react-router-dom';
// import { AuthContextProvider } from './Components/AuthContext';
function App() {
  return (
    <>
      <AuthContextProvider>
        <BrowserRouter>
        <Switch>
          <RedirectToFeed path="/login" comp={Login}>
          </RedirectToFeed>
          <RedirectToFeed path="/signup" comp={SignUp}>
          </RedirectToFeed>
          <PrivateRoute path="/feed"
            comp={Feed}
          >
          </PrivateRoute>
          <PrivateRoute path="/profile"
            comp={Profile}
          >
          </PrivateRoute>
          <Redirect from="/" to="/feed"></Redirect>
          <Route>
            <PageNotFound></PageNotFound>
          </Route>
        </Switch>
        </BrowserRouter>
      </AuthContextProvider>
    </>
  );
}

function PrivateRoute(props) {
  console.log("private Route", props)
  let Component = props.comp;
  // check -> are you loggedIN
  let cUser = useContext(AuthContext);
  // cuser-> null ->logi page
  // cuser-> anything 
  return (
    <Route
      {...props}
      render={
        (props) => {
          // logic
          return cUser != null ? <Component {...props}>
          </Component> : <Redirect
            {...props}
            to="/login"></Redirect>
        }
      }
    ></Route>
  )
}

function RedirectToFeed(props) {
  let Component = props.comp;
  // check -> are you loggedIN
  let cUser = useContext(AuthContext);
  // cuser-> null ->login page
  // cuser-> anything 
  return (
    <Route
      {...props}
      render={
        (props) => {
          // logic
          return cUser != null ? <Redirect {...props} to="/feed">
          </Redirect> : <Component
            {...props}
          ></Component>
        }
      }
    ></Route>
  )
}
export default App;