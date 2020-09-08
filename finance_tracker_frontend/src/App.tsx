/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Switch, Route, Link, BrowserRouter as Router} from 'react-router-dom';
import Login from "./Login";
import Home from "./Home";

function App() {
  return (
      <Router>
          <Switch>
            <Route path="/home">
              <Home />
            </Route>
            <Route path="/">
              <Login />
            </Route>
          </Switch>
      </Router>
  );
}

export default App;
