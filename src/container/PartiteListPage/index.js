import Layout from '../../componenti/Layout'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { getPartiteBySlug } from '../../azioni';
import { useParams, Link, useSearchParams } from "react-router-dom";
import Card from '../../componenti/UI/Card'
import { MaterialButton } from '../../componenti/MaterialUI';
import Price from '../../componenti/UI/Prezzo';
import {generatePublicUrl} from '../../urlConfig';
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import "./style.css";




/**
* @author
* @function PartiteListPage
**/
const useStyles = makeStyles({
    gridContainer: {
        paddingLeft: "40px",
        paddingRight: "40px",
        textTransform: "capitalize",
        justifyContent: "space-evenly"

    }
});

const PartiteListPage = (props) => {

    const { slug } = useParams();
    const Partite = useSelector(state => state.partite)
    const [searchParams, setSearchParams] = useSearchParams();
    const classes = useStyles();

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getPartiteBySlug(slug))
    }, [])

    const renderIndirizzo = (stadio) => {
        return (`${stadio.nome}, ${stadio.citta}, ${stadio.regione}`)
    }
    const datetimeHandler = ((datetime) => {
        var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
        let data = new Date(datetime);
        data = data.toLocaleDateString("it-IT", options);
        return data

    })


    return (
        <Layout>
            <Card
                headerLeft={`${searchParams.get("nome")}`}
                // headerRight={
                //     <MaterialButton
                //         title={"VIEW ALL"}
                //         style={{
                //             width: "96px",
                //         }}
                //         bgColor="#2874f0"
                //         fontSize="12px"
                //     />
                // }
                style={{
                    width: "calc(100% - 40px)",
                    margin: "20px",
                }}
            >
                <div style={{ display: "flex" }}>
                    <Grid
                        container
                        spacing={1}
                        className={classes.gridContainer}
                        justify="center"
                    >

                        {Partite.partite.length > 0 ? Partite.partite.map((partita) => {
                            return (
                                <Grid item xs={12} sm={6} md={4} lg={6} xl={4}>
                                    <Card style={{ margin: "20px", borderRadius: 20 }}>
                                        <Link
                                            to={`/${partita.squadra1}-${partita.squadra2}/${partita._id}/p`}
                                            style={{
                                                display: "block",
                                                textDecoration: "none",
                                                color: "#000",
                                            }}
                                            className="productContainer"
                                        >
                                            {partita.ImmaginePartita[0] ?
                                                <>
                                                    <div className="productImgContainer">
                                                        <img src={generatePublicUrl(partita.ImmaginePartita[0].img)} alt="" />
                                                    </div>
                                                </> : null}
                                            <div className="productInfo"
                                                style={{
                                                    height: "auto",
                                                    width: "auto",
                                                    boxShadow: "0 0 3px 2px #cec7c759",
                                                    textAlign: "center",
                                                    margin: "50px",
                                                    borderRadius: 20,
                                                }}
                                            >
                                                <div style={{ margin: "10px 0", fontWeight: "bold", fontSize: "20px" }}>{partita.squadra1} - {partita.squadra2}</div>
                                                <div style={{ margin: "10px 0" }}>{datetimeHandler(partita.dataOraPartita)}</div>
                                                <div style={{ margin: "10px 0" }}>{partita.IdStadio ? renderIndirizzo(partita.IdStadio) : "N/A"}</div>
                                                <div style={{ margin: "10px 0" }}>{partita.descrizione}</div>
                                                <Price value={partita.prezzoBigliettoPartita} />
                                            </div>
                                        </Link>
                                    </Card>
                                </Grid>

                            )
                        })
                            : <div style={{
                                margin: "auto",
                                padding: "10px"
                            }}>NESSUNA PARTITA PRESENTE </div>
                        }
                    </Grid>

                </div>
            </Card>
        </Layout>
    )

}
export default PartiteListPage;