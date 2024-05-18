import React from 'react';
import { Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import TKDN from './pages/Tkdn';
import NONTKDN from './pages/Nontkdn';
import Error from "./pages/Error";

const App = () => {
  return (
    <>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/tkdn" component={TKDN} />
        <Route path="/nontkdn" component={NONTKDN} />
        <Route path="*" component={Error} />
      </Switch>
    </>
  );
};

export default App;
