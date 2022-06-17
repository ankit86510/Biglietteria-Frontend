import { carrelloCostanti, utenteCostanti} from "./costanti";
import axios from "../helpers/axios";

export const addOrdine = (payload) => {
    return async (dispatch) => {
      try {
        const res = await axios.post(`/addOrdine`, payload);
        dispatch({ type: utenteCostanti.ADD_UTENTE_ORDINE_REQUEST });
        if (res.status === 201) {
          console.log(res);
          const { ordine } = res.data;
          dispatch({
            type: carrelloCostanti.RESET_CARRELLO,
          });
          dispatch({
            type: utenteCostanti.ADD_UTENTE_ORDINE_SUCCESS,
            payload: { ordine },
          });
          // const {
          //   address: { address },
          // } = res.data;
          // dispatch({
          //   type: userConstants.ADD_USER_ADDRESS_SUCCESS,
          //   payload: { address },
          // });
        } else {
          const { error } = res.data;
          dispatch({
            type: utenteCostanti.ADD_UTENTE_ORDINE_FAILURE,
            payload: { error },
          });
        }
      } catch (error) {
        console.log(error);
      }
    };
  };
  
  export const getOrdini = () => {
    return async (dispatch) => {
      try {
        const res = await axios.get(`/getOrdini`);
        dispatch({ type: utenteCostanti.GET_UTENTE_ORDINE_REQUEST });
        if (res.status === 200) {
          console.log(res);
          const { ordini } = res.data;
          dispatch({
            type: utenteCostanti.GET_UTENTE_ORDINE_SUCCESS,
            payload: { ordini },
          });
        } else {
          const { error } = res.data;
          dispatch({
            type: utenteCostanti.GET_UTENTE_ORDINE_FAILURE,
            payload: { error },
          });
        }
      } catch (error) {
        console.log(error);
      }
    };
  };
  
  // single order with complete info and delivery location
  export const getOrdine = (payload) => {
    return async (dispatch) => {
      try {
          console.log("Get Ordine");
        const res = await axios.post(`/getOrdine`, payload);
        dispatch({ type: utenteCostanti.GET_UTENTE_ORDINE_DETAILS_REQUEST });
        if (res.status === 200) {
          console.log(res);
          const { ordine } = res.data;
          dispatch({
            type: utenteCostanti.GET_UTENTE_ORDINE_DETAILS_SUCCESS,
            payload: { ordine },
          });
        } else {
          const { error } = res.data;
          dispatch({
            type: utenteCostanti.GET_UTENTE_ORDINE_DETAILS_FAILURE,
            payload: { error },
          });
        }
      } catch (error) {
        console.log(error);
      }
    };
  };