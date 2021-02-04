import { Fragment } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Home from "./Components/Home/Home";
import AccountGroup from "./Components/Master/AccountMaster/AccountGroup/AccountGroup";
import AccountName from "./Components/Master/AccountMaster/AccountName/AccountName";
import ItemGroup from "./Components/Master/ItemMaster/ItemGroup/ItemGroup";
import ItemName from "./Components/Master/ItemMaster/ItemName/ItemName";
import Department from "./Components/Master/PrefixMaster/Department/Department";
import PrefixForm from "./Components/Master/PrefixMaster/Form/PrefixForm";
import Prefix from "./Components/Master/PrefixMaster/Prefix/Prefix";

function App() {
  return (
    <Fragment>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/department" exact component={Department} />
          <Route path="/form" component={PrefixForm} />
          <Route path="/prefix" component={Prefix} />
          <Route path="/account-name" component={AccountName} />
          <Route path="/account-group" component={AccountGroup} />
          <Route path="/item-name" component={ItemName} />
          <Route path="/item-group" component={ItemGroup} />
        </Switch>
      </Router>
    </Fragment>
  );
}

export default App;
