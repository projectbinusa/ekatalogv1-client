import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import TKDN from "./pages/Tkdn";
import NonTKDN from "./pages/Nontkdn";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/tkdn" component={TKDN} />
        <Route path="/nontkdn" component={NonTKDN} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

export default App;
