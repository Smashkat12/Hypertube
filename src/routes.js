import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import App from "./pages/App";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import UserProfile from "./pages/UserProfile";
import NotFound from "./pages/NotFound";
import Search from "./pages/Search";

export default function MainRouter() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={App} />
          <Route path="/users/login" component={Login} />
          <Route exact path="/users/register" component={Register} />
          <Route path="/users/forgot-password" component={ForgotPassword} />
          <Route path="/users/reset-password/:key" component={ResetPassword} />
          <Route path="/users/profile/:username" component={UserProfile} />
          <Route path="/main/search" component={Search} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
}
