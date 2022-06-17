import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getOrdine } from "../../azioni";
import Layout from "../../componenti/Layout";
import Card from "../../componenti/UI/Card";
import Prezzo from "../../componenti/UI/Prezzo";
import {generatePublicUrl} from '../../urlConfig';


import "./style.css";

/**
 * @author
 * @function OrdineDetailsPage
 **/

const OrdineDetailsPage = (props) => {
    const dispatch = useDispatch();
    const DetagliOrdine = useSelector((state) => state.utente.DetagliOrdine);
    const IdOrdine = useParams();
    useEffect(() => {
        // console.log(payload);
        dispatch(getOrdine(IdOrdine));
    }, []);
    const renderIndirizzo = (stadio) => {
        return (<p>{stadio.nome}<br />{stadio.citta}<br />{stadio.regione}</p>)
    }
    const datetimeHandler = ((datetime) => {
        var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
        let data = new Date(datetime);
        data = data.toLocaleDateString("it-IT", options);
        return data

    })


    if (Object.keys(DetagliOrdine).length === 0) {
        return null;
    }

    return (
        <Layout>
            <div
                style={{
                    width: "1160px",
                    margin: "10px auto",
                }}
            >

                {DetagliOrdine.biglietti.map((biglietto, index) => (
                    <Card
                        style={{ display: "flex", padding: "20px 0", margin: "10px 0" }}
                    >
                        <div className="flexRow"
                            style={{
                                // display: "block",
                                // margin: "auto",
                            }}>
                            <div className="delItemImgContainer">
                                <img src={biglietto.IdPartita.ImmaginePartita[0] ? generatePublicUrl(biglietto.IdPartita.ImmaginePartita[0].img) : null} alt="" />
                            </div>
                            <div className="orderDetails">
                                <div
                                    style={{
                                        float: "left",
                                        margin: "auto",
                                    }}>
                                    <span
                                        style={{
                                            fontSize: "18px",
                                            color: "#878787",
                                            marginRight: "10px",
                                        }}
                                    >
                                        Dettagli Biglietto:
                                    </span>
                                    <p>{biglietto.IdPartita.squadra1} - {biglietto.IdPartita.squadra2}</p>
                                    <p>Totale N. Bigliettti: {biglietto.N_BigliettiAcquistati} </p>
                                    <Prezzo value={biglietto.PrezzoBiglietto} />
                                </div>
                                <div style={{
                                    float: "right",
                                    margin: "auto",
                                }} >
                                    <span
                                        style={{
                                            fontSize: "18px",
                                            color: "#878787",
                                            marginRight: "10px",
                                        }}
                                    >
                                        Dettagli Stadio:
                                    </span>
                                    <p>{renderIndirizzo(biglietto.IdPartita.IdStadio)}</p>
                                    <span
                                        style={{
                                            fontSize: "18px",
                                            color: "#878787",
                                            marginRight: "10px",
                                        }}
                                    >
                                        Data e Ora Partita:
                                    </span>
                                    <p>{datetimeHandler(biglietto.IdPartita.dataOraPartita)}</p>

                                </div>

                            </div>


                        </div>

                    </Card>
                ))}
            </div>
        </Layout >
    );
};

export default OrdineDetailsPage;