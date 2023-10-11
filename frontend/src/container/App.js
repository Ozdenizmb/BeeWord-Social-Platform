import React from 'react';
import UserSignUpPage from '../pages/UserSignUpPage';
import LoginPage from '../pages/LoginPage';
import HomePage from '../pages/HomePage';
import UserPage from '../pages/UserPage';
import { HashRouter, Route, Redirect, Switch } from 'react-router-dom'
import TopBar from '../Components/TopBar';
import { useSelector } from 'react-redux';

const App = () => {

  const { isLoggedIn } = useSelector(store => {
    return {
      isLoggedIn : store.isLoggedIn
    }
  });

  return (
    <div>

      <HashRouter>

        <TopBar />

        <Switch>
        <Route exact path="/" component={HomePage} />

        {!isLoggedIn && (
          <Route
            path="/login" component={LoginPage}
          />
        )}
        
        <Route path="/signup" component={UserSignUpPage} />

        <Route path="/user/:username" component={UserPage} />

        <Redirect to="/" />
        </Switch>

      </HashRouter>

    </div>
  );

}

export default App;
