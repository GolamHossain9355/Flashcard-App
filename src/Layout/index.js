import { Route, Switch } from "react-router-dom";

import Header from "./Header";
import NotFound from "./NotFound";
import Home from "./Home/Home";
import DeckPath from "./DeckPath/DeckPath";
import DeckCreateScreen from "./DeckPath/DeckCreateAndEdit/DeckCreateScreen";

function Layout() {
  //*routing to home screen and deckCreate screens and deckPath(this routes to all other files)
  return (
    <div>
      <Header />
      <div className="container col-6">
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
