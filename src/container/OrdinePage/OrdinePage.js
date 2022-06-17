import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getOrdini } from "../../azioni";
import Layout from "../../componenti/Layout";
import Card from "../../componenti/UI/Card";
import { BiEuro } from "react-icons/bi";
import { IoIosArrowForward } from "react-icons/io";

import "./style.css";
import { Breed } from "../../componenti/MaterialUI";

/**
 * @author
 * @function OrderPage
 **/

const OrderPage = (props) => {
    const dispatch = useDispatch();
    const utente = useSelector((state) => state.utente);

    useEffect(() => {
        dispatch(getOrdini());
    }, []);

    console.log(utente);

    const datetimeHandler = ((datetime) => {
        var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
        let data = new Date(datetime);
        data = data.toLocaleDateString("it-IT", options);
        return data
      
    })

    return (
        <Layout>
            <div style={{ maxWidth: "1160px", margin: "5px auto" }}>
                <Breed
                    breed={[
                        { name: "Home", href: "/" },
                        { name: "My Orders", href: "/account/orders" },
                    ]}
                    breedIcon={<IoIosArrowForward />}
                />
                {Object.keys(utente.ordini).length > 0 ?
                    <>
                        {utente.ordini.map((ordine) => {
                            // return ordine.biglietti.map((biglietto) => (
                                return <Card style={{ display: "flex", margin: "5px" }}>
                                    <Link
                                        to={`/order_details/${ordine._id}`}
                                        className="orderItemContainer"
                                    >
                                        {/* <div className="orderImgContainer">
                                            <img
                                                className="orderImg"
                                                src={biglietto.IdPartita.ImmaginePartita ? biglietto.IdPartita.ImmaginePartita[0].img : null}
                                            />
                                        </div> */}
                                        <div className="orderRow">
                                            <div className="orderName">Numero Ordine: {ordine._id}</div>
                                            <div className="orderPrice"> Prezzo totale Ordine: 
                                                <BiEuro />
                                                {ordine.importoTotale}
                                            </div>
                                            <div className="orderName">Acquistato il: {datetimeHandler(ordine.createdAt)}</div>
                                            <div className="orderName">N° Partite: {ordine.biglietti.length}</div>
                                        </div>
                                    </Link>
                                </Card>
                            // ));
                        })}
                    </>
                    :
                    <Card>
                        <div style={{
                            margin: "auto",
                            padding: "10px"
                        }}>NESSUN ORDINE PRESENTE
                        </div>
                    </Card>
                }
            </div>
        </Layout>
    );
};

export default OrderPage;