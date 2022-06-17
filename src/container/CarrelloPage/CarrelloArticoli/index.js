import React, { useState } from "react";
import "./style.css";
import { BiEuro } from "react-icons/bi";


/**
 * @author
 * @function CartItem
 **/

const CartItem = (props) => {
    const [qty, setQty] = useState(props.ArticoloCarrello.qty);
    const [totalePostiStadio] = useState(props.ArticoloCarrello.totalePostiStadio);
    const [totalePostiOccupati] = useState(props.ArticoloCarrello.totalePostiOccupati);
    // const [qty, setQty] = useState(props.ArticoloCarrello.qty);

    const { _id, nome, prezzoBigliettoPartita, img } = props.ArticoloCarrello;

    const onQuantityIncrement = () => {
        if (qty < (totalePostiStadio - totalePostiOccupati)) {
            setQty(qty + 1);
            props.onQuantityInc(_id, qty + 1);
        }
    };

    const onQuantityDecrement = () => {
        if (qty <= 1) return;

        setQty(qty - 1);
        props.onQuantityDec(_id, qty - 1);

    };

    return (
        <div className="cartItemContainer">
            <div className="flexRow">
                <div className="cartProImgContainer">
                    <img src={img} alt={""} />
                </div>
                <div className="cartItemDetails">
                    <div style={{
                        float: "left",
                        margin: "auto",
                    }} >
                        <p>{nome}</p>
                        <p><BiEuro /> {prezzoBigliettoPartita}</p>
                    </div>
                    <div style={{
                        float: "right",
                        margin: "auto",
                    }} >  <p
                        className="productOrario">
                            <span
                                style={{
                                    justifyContent: "space-between",
                                    fontSize: "18px",
                                    color: "#878787",
                                    marginRight: "10px",
                                }}
                            >
                                Totale Posti Stadio
                            </span>
                            {totalePostiStadio}
                        </p>
                        <p
                            className="productOrario">
                            <span
                                style={{
                                    justifyContent: "space-between",
                                    fontSize: "18px",
                                    color: "#878787",
                                    marginRight: "10px",
                                }}
                            >
                                Totale Post Occupati
                            </span>
                            {totalePostiOccupati}
                        </p>
                    </div>

                </div>
            </div>
            <div
                style={{
                    justifyContent: "center",
                    display: "flex",
                    margin: "5px 0",
                }}
            >
                {/* quantity control */}
                <div className="quantityControl">
                    <button onClick={onQuantityDecrement}>-</button>
                    <input value={qty} readOnly />
                    <button onClick={onQuantityIncrement}>+</button>
                </div>
                <button
                    className="cartActionBtn"
                    onClick={() => props.onRemoveCartItem(_id)}
                >
                    Remove
                </button>
            </div>
        </div>
    );
};

export default CartItem;