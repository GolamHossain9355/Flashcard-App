import React, { useState, useEffect } from "react";
import { Switch, Route, useRouteMatch, useParams } from "react-router-dom";

import StudyDeckScreen from "./StudyDeck/StudyDeckScreen";
import ViewDeckScreen from "./ViewDeck/ViewDeckScreen";
import DeckEditScreen from "./DeckEditScreen";
import CardCreateScreen from "./CardCreateScreen";
import CardEditScreen from "./CardEditScreen";

import { readDeck } from "../../utils/api";

export default function DeckPath() {
  const { path } = useRouteMatch();
  const { deckId } = useParams();

  const [currentDeck, setCurrentDeck] = useState({});

  useEffect(() => {
    setCurrentDeck({});
    async function loadDeck() {
      const data = await readDeck(deckId);
      setCurrentDeck(data);
    }
    loadDeck();
  }, []);

  return (
    <Switch>
      <Route exact path={path}>
        <ViewDeckScreen />
      </Route>
      <Route path={`${path}/study`}>
        <StudyDeckScreen deckId={deckId} currentDeck={currentDeck} />
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
