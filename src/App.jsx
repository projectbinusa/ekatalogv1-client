import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import TKDN from "./pages/Tkdn";
import NonTKDN from "./pages/Nontkdn";
import Pc from "./pages/Pc";
import Product from "./pages/Product";
import NotFound from "./pages/NotFound";
import DetailProduk from "./pages/DetailProduct";
import ListProduk from "./pages/ListProduct";
import CardProduk from "./pages/CardProduct";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/tkdn" component={TKDN} />
        <Route path="/nontkdn" component={NonTKDN} />
        <Route path="/pc" component={Pc} />
        <Route path="/product" component={Product} />
        <Route path="/detailproduct" component={DetailProduk} />
        <Route path="/listproduct" component={ListProduk} />
        <Route path="/cardproduct" component={CardProduk} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

export default App;
