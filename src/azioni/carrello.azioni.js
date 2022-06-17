import axios from "../helpers/axios";
import { carrelloCostanti } from "./costanti";
import store from "../store";

const getCarrelloItems = () => {
    return async (dispatch) => {
        try {
            dispatch({ type: carrelloCostanti.ADD_TO_CARRELLO_REQUEST });
            const res = await axios.post(`/utente/getCartItems`);
            if (res.status === 200) {
                const { ArticoliCarrello } = res.data;
                console.log({ getCartItems: ArticoliCarrello });
                if (ArticoliCarrello) {
                    dispatch({
                        type: carrelloCostanti.ADD_TO_CARRELLO_SUCCESS,
                        payload: { ArticoliCarrello },
                    });
                }
            }
        } catch (error) {
            console.log(error);
        }
    };
};

export const addToCarrello = (articolo, newQty = 1) => {
    return async (dispatch) => {
        const {
            carrello: { ArticoliCarrello },
            auth,
        } = store.getState();
        //console.log('action::products', products);
        //const product = action.payload.product;
        //const products = state.products;
        // const qty = ArticoliCarrello[articolo._id] 
        //             && (ArticoliCarrello.totalePostiStadio - ArticoliCarrello.totalePostiOccupati > 0)
        //     ? parseInt(ArticoliCarrello[articolo._id].qty + newQty)
        //     : newQty;
        let qty;
        if (ArticoliCarrello[articolo._id]) {
            if (parseInt(ArticoliCarrello[articolo._id].qty) >= (parseInt(ArticoliCarrello[articolo._id].totalePostiStadio) - parseInt(ArticoliCarrello[articolo._id].totalePostiOccupati))) {
                if (newQty === -1) {
                    qty = parseInt(ArticoliCarrello[articolo._id].qty + newQty)
                } else {
                    qty = parseInt(ArticoliCarrello[articolo._id].qty)
                }
            }
            else {
                qty = parseInt(ArticoliCarrello[articolo._id].qty + newQty)
            }
            console.log(ArticoliCarrello[articolo._id].qty)
            console.log(ArticoliCarrello[articolo._id].totalePostiStadio - ArticoliCarrello[articolo._id].totalePostiOccupati)

        } else { qty = newQty }
        console.log(qty)
        ArticoliCarrello[articolo._id] = {
            ...articolo,
            qty,
        };

        if (auth.authenticate) {
            dispatch({ type: carrelloCostanti.ADD_TO_CARRELLO_REQUEST });
            const payload = {
                // cartItems: Object.keys(cartItems).map((key, index) => {
                //     return {
                //         quantity: cartItems[key].qty,
                //         product: cartItems[key]._id
                //     }
                // })
                ArticoliCarrello: [
                    {
                        articolo: articolo._id,
                        quantita: qty,
                    },
                ],
            };
            console.log(payload);
            const res = await axios.post(`/utente/carrello/addtocart`, payload);
            console.log(res);
            if (res.status === 201) {
                dispatch(getCarrelloItems());
            }
        } else {
            localStorage.setItem("carrello", JSON.stringify(ArticoliCarrello));
        }

        console.log("addToCart::", ArticoliCarrello);

        dispatch({
            type: carrelloCostanti.ADD_TO_CARRELLO_SUCCESS,
            payload: { ArticoliCarrello },
        });
    };
};

export const removeCarrelloItem = (payload) => {
    return async (dispatch) => {
        try {
            const {
                carrello: { ArticoliCarrello },
                auth,
            } = store.getState();

            if (auth.authenticate) {
                dispatch({ type: carrelloCostanti.REMOVE_CARRELLO_ITEM_REQUEST });
                const res = await axios.post(`/utente/carrello/removeItem`, { payload });
                if (res.status === 202) {
                    dispatch({ type: carrelloCostanti.REMOVE_CARRELLO_ITEM_SUCCESS });
                    dispatch(getCarrelloItems());
                } else {
                    const { error } = res.data;
                    dispatch({
                        type: carrelloCostanti.REMOVE_CARRELLO_ITEM_FAILURE,
                        payload: { error },
                    });
                }

            }
            else {
                delete ArticoliCarrello[payload.IdPartita];
                dispatch({
                    type: carrelloCostanti.ADD_TO_CARRELLO_SUCCESS,
                    payload: { ArticoliCarrello },
                });
                localStorage.setItem("carrello", JSON.stringify(ArticoliCarrello));

            }
        } catch (error) {
            console.log(error);
        }
    };
};

export const updateCarrello = () => {
    return async (dispatch) => {
        const { auth } = store.getState();
        let ArticoliCarrello = localStorage.getItem("carrello")
            ? JSON.parse(localStorage.getItem("carrello"))
            : null;

        console.log("upppppppppp");
        console.log(ArticoliCarrello);

        if (auth.authenticate) {
            localStorage.removeItem("carrello");
            //dispatch(getCartItems());
            if (ArticoliCarrello) {
                const payload = {
                    ArticoliCarrello: Object.keys(ArticoliCarrello).map((key, index) => {
                        return {
                            quantita: ArticoliCarrello[key].qty,
                            articolo: ArticoliCarrello[key]._id,
                        };
                    }),
                };
                if (Object.keys(ArticoliCarrello).length > 0) {
                    const res = await axios.post(`/utente/carrello/addtocart`, payload);
                    if (res.status === 201) {
                        dispatch(getCarrelloItems());
                    }
                }
            } else {
                dispatch(getCarrelloItems());
            }
        } else {
            if (ArticoliCarrello) {
                dispatch({
                    type: carrelloCostanti.ADD_TO_CARRELLO_SUCCESS,
                    payload: { ArticoliCarrello },
                });
            }
        }
    };
};

export { getCarrelloItems };