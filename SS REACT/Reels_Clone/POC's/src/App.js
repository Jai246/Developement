import React from 'react'
import Login from './Components/Login'
import SignUp from './Components/SignUp'
import Forget from './Components/Forget'
import PageNotFound from './Components/PageNotFound'
import Profile from './Components/Profile'
import Feed from './Components/Feed'
// import ContextNormal from "./ContextPOCs/contextEg/contextMemo/ContextNormal";
// import UseState from "./POCs/UseStatePOCs/UseState.jsx"
import {BrowserRouter,Switch,Route} from 'react-router-dom';

function App() {
  return (
      <>

      {/* <UseState></UseState> */}
      {/* <ContextNormal></ContextNormal> */}
        <BrowserRouter>
          <Switch>
              <Route path="/" exact>
                <Feed></Feed>
              </Route>
              <Route path="/login">
                <Login></Login>
              </Route>
              <Route path="/signup">
                <SignUp></SignUp>
              </Route>
              <Route path="/forget">
                <Forget></Forget>
              </Route>
              <Route path="/pagenotfound">
                <PageNotFound></PageNotFound>
              </Route>
          </Switch>
        </BrowserRouter>
       <div>App</div>
      </>
  )
}

export default App;