import React from "react"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Trainings from "../components/Training/Trainings";
import Home from "../components/Home/Home";
import Account from "../components/Account/Account";
import Info from "../components/Info/Info";
import dumbbellIcon from "../assets/icons/dumbbell.png"
import homeIcon from "../assets/icons/home.png"
import userIcon from "../assets/icons/user.png"

const Routes = () => {

    return (
        <Router>
          <header>
            <ul>
              <li>
                <Link className="link" to="/home">
                  <button className="header-button">
                    <img className="header-icons" src={homeIcon} alt="dumbbell"/>
                  </button>
                </Link>
              </li>
              <li>
                <Link className="link" to="/training">
                  <button className="header-button">
                    <img className="header-icons" src={dumbbellIcon} alt="dumbbell"/>
                  </button>
                </Link>
              </li>
              <li>
                <Link className="link" to="/account">
                  <button className="header-button">
                    <img className="header-icons" src={userIcon} alt="dumbbell"/>
                  </button>
                </Link>
              </li>
            </ul>
          </header>

          <Switch>
            <div className="content">
              <Route exact path="/" component={Info}/>
              <Route exact path="/home" component={Home}/>
              <Route exact path="/training" component={Trainings}/>
              <Route exact path="/account" component={Account}/>
            </div>
          </Switch>
        </Router>
    )
}

export default Routes;