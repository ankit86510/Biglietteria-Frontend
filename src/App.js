import React, { useEffect } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom'
import HomePage from './container/HomePage';
import PartiteListPage from './container/PartiteListPage';
import { useDispatch, useSelector } from 'react-redux';
import { isUtenteLoggedIn, updateCarrello } from './azioni';
import PartitaDetailsPage from './container/PartitaDetailsPage/PartitaDetailsPage';
import CarrelloPage from './container/CarrelloPage';
import OrderPage from './container/OrdinePage/OrdinePage';
import OrdineDetailsPage from './container/OrdineDetailsPage';



function App() {

  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUtenteLoggedIn());
    }
  }, [auth.authenticate]);

  useEffect(() => {
    console.log("App.js - updateCart");
    dispatch(updateCarrello());
  }, [auth.authenticate]);

  return (
    <div className="App" >
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/carrello" element={<CarrelloPage />} />
        <Route path="/:Incontro/:IdPartita/p" element={<PartitaDetailsPage />} />
        <Route path="/order_details/:IdOrdine" element={<OrdineDetailsPage />} />
        <Route path="/account/ordini" element={<OrderPage />} />
        <Route path="/:slug" element={<PartiteListPage />} />

      </Routes>
    </div>
  );
}

export default App;
