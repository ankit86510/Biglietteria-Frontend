import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../componenti/Layout";
import Card from "../../componenti/UI/Card";
import CarrelloArticoli from "./CarrelloArticoli";
import { addOrdine, addToCarrello, getCarrelloItems, removeCarrelloItem, getPartitaDetailsById } from "../../azioni";
import DettagliPrezzo from "../../componenti/DettagliPrezzo";
import "./style.css";
import { MaterialButton } from "../../componenti/MaterialUI";
import { useNavigate } from "react-router-dom";

/**
 * @author
 * @function CarrelloPage
 **/

/*
Before Login
Add product to cart
save in localStorage
when try to checkout ask for credentials and 
if logged in then add products to users cart database from localStorage


*/

const CarrelloPage = (props) => {
  const Carrello = useSelector((state) => state.carrello);
  const auth = useSelector((state) => state.auth);
  const utente = useSelector((state) => state.utente);

  // const cartItems = cart.cartItems;
  const [ArticoliCarrello, setArticoliCarrello] = useState(Carrello.ArticoliCarrello);
  const [confermaOrdine, setConfermaOrdine] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setArticoliCarrello(Carrello.ArticoliCarrello);
  }, [Carrello.ArticoliCarrello]);


  useEffect(() => {
    if (auth.authenticate) {
      dispatch(getCarrelloItems());
    }
  }, [auth.authenticate]);

  useEffect(() => {
    if (confermaOrdine && utente.placedOrderId) {
      navigate(`/order_details/${utente.placedOrderId}`);
    }
  }, [utente.placedOrderId]);

  const onQuantityIncrement = (_id, qty) => {
    //console.log({_id, qty});
    const { nome, prezzoBigliettoPartita, totalePostiStadio, totalePostiOccupati, img } = ArticoliCarrello[_id];
    dispatch(addToCarrello({ _id, nome, prezzoBigliettoPartita, totalePostiStadio, totalePostiOccupati, img }, 1));
  };

  const onQuantityDecrement = (_id, qty) => {
    const { nome, prezzoBigliettoPartita, totalePostiStadio, totalePostiOccupati, img } = ArticoliCarrello[_id];
    dispatch(addToCarrello({ _id, nome, prezzoBigliettoPartita, totalePostiStadio, totalePostiOccupati, img }, -1));
  };

  const onRemoveCartItem = (_id) => {
    dispatch(removeCarrelloItem({ IdPartita: _id }));
    dispatch(getCarrelloItems());
  };

  const onConfermaOrdine = () => {
    const importoTotale = Object.keys(Carrello.ArticoliCarrello).reduce(
      (importoTotale, key) => {
        const { prezzoBigliettoPartita, qty } = Carrello.ArticoliCarrello[key];
        return importoTotale + prezzoBigliettoPartita * qty;
      },
      0
    );
    const biglietti = Object.keys(Carrello.ArticoliCarrello).map((key) => ({
      IdPartita: key,
      PrezzoBiglietto: Carrello.ArticoliCarrello[key].prezzoBigliettoPartita,
      N_BigliettiAcquistati: Carrello.ArticoliCarrello[key].qty,
    }));
    const payload = {
      importoTotale,
      biglietti
    };

    console.log(payload);
    dispatch(addOrdine(payload))
    setConfermaOrdine(true);
  };

  // if (props.onlyCartItems) {
  //   return (
  //     <>
  //       {Object.keys(ArticoliCarrello).map((key, index) => (
  //         <CarrelloArticoli
  //           key={index}
  //           ArticoloCarrello={ArticoliCarrello[key]}
  //           onQuantityInc={onQuantityIncrement}
  //           onQuantityDec={onQuantityDecrement}
  //         />
  //       ))}
  //     </>
  //   );
  // }

  return (
    <Layout>
      <div className="cartContainer" style={{ alignItems: "flex-start" }}>

        <Card
          headerLeft={`Mio Carrello`}
          style={{ width: "calc(100% - 400px)", overflow: "hidden" }}
        >
          {
            Object.keys(ArticoliCarrello).length > 0 ?
              <>
                {Object.keys(ArticoliCarrello).map((key, index) => (
                  <CarrelloArticoli
                    key={index}
                    ArticoloCarrello={ArticoliCarrello[key]}
                    onQuantityInc={onQuantityIncrement}
                    onQuantityDec={onQuantityDecrement}
                    onRemoveCartItem={onRemoveCartItem}
                  />
                ))}
                < div
                  style={{
                    width: "100%",
                    display: "flex",
                    background: "#ffffff",
                    justifyContent: "start",
                    boxShadow: "0 0 10px 10px #eee",
                    padding: "10px 0",
                    boxSizing: "border-box",
                  }}
                >

                  <DettagliPrezzo
                    totalItem={Object.keys(Carrello.ArticoliCarrello).reduce(function (qty, key) {
                      return qty + Carrello.ArticoliCarrello[key].qty;
                    }, 0)}
                    totalPrice={Object.keys(Carrello.ArticoliCarrello).reduce((totalPrice, key) => {
                      const { prezzoBigliettoPartita, qty } = Carrello.ArticoliCarrello[key];
                      return totalPrice + prezzoBigliettoPartita * qty;
                    }, 0)}
                  />
                  {auth.authenticate ?
                    <>
                      <Card
                        style={{
                          margin: "10px 0",
                        }}
                      >
                        <div
                          className="flexRow sb"
                          style={{
                            padding: "20px",
                            alignItems: "center",
                          }}
                        >
                          <p style={{ fontSize: "12px" }}>
                            Order confirmation email will be sent to{" "}
                            <strong>{auth.utente.email}</strong>
                          </p>
                          <MaterialButton
                            title="Conferma Ordine"
                            onClick={() => onConfermaOrdine()}
                            style={{
                              width: "200px",
                            }}
                          />
                        </div>
                      </Card>

                    </>
                    :
                    <div style={{
                      margin: "auto",
                      width: "50%",
                      padding: "10px"
                    }}>ACCEDDI PER COMPLETARE L'ORDINE
                    </div>
                  }
                  {/* <div style={{
                    margin: "auto",
                    width: "50%",
                    padding: "10px"
                  }}>
                    <MaterialButton
                      title="PLACE ORDER"
                      onClick={() => props.history.push(`/checkout`)}
                    />
                  </div> */}
                </div >

              </> : <div style={{
                margin: "auto",
                padding: "10px"
              }}>CARRELLO VUOTO</div>
          }
        </Card>
      </div>
    </Layout>
  );
};

export default CarrelloPage;