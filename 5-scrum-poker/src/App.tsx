import React from "react";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import StartPage from "./pages/start";
import DeveloperPage from  "./pages/developer";
import PoPage from  "./pages/po-page";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      {/* Sharable across the pages */}

      <Switch>
        <Route path="/developer">
          <DeveloperPage/>
        </Route>
        <Route path="/po-page">
          <PoPage/>
        </Route>
        <Route path="/">
          <StartPage/>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
