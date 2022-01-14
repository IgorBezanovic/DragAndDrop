import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Trainings from "../containers/Training/Trainings";
import Home from "../containers/Home/Home";
import Account from "../containers/Account/Account";
// import Info from "../containers/Info/Info";
import dumbbellIcon from "../assets/icons/dumbbell.png";
import homeIcon from "../assets/icons/home.png";
import userIcon from "../assets/icons/user.png";
import NavButton from "../components/NavigationButton/navButton";

const Routes = () => {
  return (
    <Router>
      <header>
        <ul>
          <li>
            <NavButton routeTo={"/home"} icon={homeIcon} />
          </li>
          <li>
            <NavButton routeTo={"/training"} icon={dumbbellIcon} />
          </li>
          <li>
            <NavButton routeTo="/account" icon={userIcon} />
          </li>
        </ul>
      </header>

      <Switch>
          {/* <Route exact path="/" component={Info} /> */}
          <Route exact path="/home" component={Home} />
          <Route exact path="/training" component={Trainings} />
          <Route exact path="/account" component={Account} />
      </Switch>
    </Router>
  );
};

export default Routes;
