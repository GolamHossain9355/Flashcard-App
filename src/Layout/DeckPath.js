import React from "react";
import { Switch, Route, useRouteMatch, useParams } from "react-router-dom";

import StudyDeckScreen from "./3.StudyDeck/StudyDeckScreen";
import ViewDeckScreen from "./4.ViewDeck/ViewDeckScreen";
import DeckEditScreen from "./6.DeckCreateAndEdit/DeckEditScreen";
import CardCreateScreen from "./5.CardCreateAndEdit/CardCreateScreen";
import CardEditScreen from "./5.CardCreateAndEdit/CardEditScreen";

export default function DeckPath() {
  const { path } = useRouteMatch();
  const { deckId } = useParams();

  //*all of the rounting for routing after home screen apart from createDecks Route
  return (
    <Switch>
      <Route exact path={path}>
        <ViewDeckScreen />
      </Route>
      <Route path={`${path}/study`}>
        <StudyDeckScreen deckId={deckId} />
      </Route>
      <Route path={`${path}/edit`}>
        <DeckEditScreen />
      </Route>
      <Route path={`${path}/cards/new`}>
        <CardCreateScreen />
      </Route>
      <Route path={`${path}/cards/:cardId/edit`}>
        <CardEditScreen />
      </Route>
    </Switch>
  );
}
