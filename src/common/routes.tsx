import React from "react"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Trainings from "../components/Trainings";
import Home from "../components/Home";
import Account from "../components/Account";
import Info from "../components/Info";

const Routes = () => {
    return (
        <Router>
          <header>
            <ul>
              <li>
                <Link to="/home">Home</Link>
              </li>
              <li>
                <Link to="/training">Training</Link>
              </li>
              <li>
                <Link to="/account">Account</Link>
              </li>
            </ul>
          </header>

          <Switch>
            <Route exact path="/" component={Info}/>
            <Route exact path="/home" component={Home}/>
            <Route exact path="/training" component={Trainings}/>
            <Route exact path="/account" component={Account}/>
          </Switch>
        </Router>
    )
}

export default Routes;