import { Route, Switch } from "react-router-dom";

import Header from "./Header";
import NotFound from "./NotFound";
import Home from "./Home/Home";
import DeckPath from "./DeckPath/DeckPath";
import DeckCreateScreen from "./DeckPath/DeckCreateScreen";

function Layout() {
  return (
    <div>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/decks/new">
            <DeckCreateScreen />
          </Route>
          <Route path="/decks/:deckId">
            <DeckPath />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default Layout;
