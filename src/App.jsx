// src/App.jsx
import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import TKDN from "./pages/Tkdn";
import NonTKDN from "./pages/Nontkdn";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/tkdn" component={TKDN} />
        <Route path="/non-tkdn" component={NonTKDN} />
      </Switch>
    </div>
  );
}

export default App;
