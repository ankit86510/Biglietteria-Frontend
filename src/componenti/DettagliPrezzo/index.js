import React from "react";
import Card from "../../componenti/UI/Card";
import { BiEuro } from 'react-icons/bi'

/**
 * @author
 * @function DettagliPrezzo
 **/

const DettagliPrezzo = (props) => {
    return (
        <Card headerLeft={"Dettagli Prezzi"} style={{ maxWidth: "380px" }}>
            <div
                style={{
                    padding: "20px",
                    boxSizing: "border-box",
                }}
            >
                <div className="flexRow sb" style={{ margin: "10px 0" }}>
                    <div>Prezzo Totale Articoli ({props.totalItem} articoli)
                        <div style={{ fontSize: "25px", fontWeight: "400" }}><BiEuro />
                            {props.totalPrice}
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default DettagliPrezzo;