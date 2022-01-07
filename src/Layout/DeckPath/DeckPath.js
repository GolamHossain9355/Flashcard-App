import React, { useState, useEffect } from "react";
import { Switch, Route, useRouteMatch, useParams } from "react-router-dom";

import StudyDeckScreen from "./StudyDeck/StudyDeckScreen";
import ViewDeckScreen from "./ViewDeck/ViewDeckScreen";
import DeckEditScreen from "./DeckEditScreen";
import CardCreateScreen from "./CardCreateScreen";
import CardEditScreen from "./CardEditScreen";

export default function DeckPath() {
  const { path } = useRouteMatch();
  const { deckId } = useParams();

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
