import { authCostanti, carrelloCostanti } from "./costanti";
import axios from "../helpers/axios";

export const registrazione = (utente) => {
  return async (dispatch) => {
    let res;
    try {
      dispatch({ type: authCostanti.REGISTRAZIONE_REQUEST });
      res = await axios.post(`/Registrazione`, utente);
      if (res.status === 201) {
        dispatch({ type: authCostanti.REGISTRAZIONE_SUCCESS });
        const { token, utente } = res.data;
        localStorage.setItem("token", token);
        localStorage.setItem("utente", JSON.stringify(utente));
        dispatch({
          type: authCostanti.LOGIN_SUCCESS,
          payload: {
            token,
            utente,
          },
        });
      } else {
        const { error } = res.data;
        dispatch({ type: authCostanti.REGISTRAZIONE_FAILURE, payload: { error } });
      }
    } catch (error) {
      const { data } = error.response;
      dispatch({
        type: authCostanti.REGISTRAZIONE_FAILURE,
        payload: { error: data.error },
      });
    }
  };
};

export const login = (utente) => {
  return async (dispatch) => {
    dispatch({ type: authCostanti.LOGIN_REQUEST });
    const res = await axios.post(`/Login`, {
      ...utente,
    });

    if (res.status === 200) {
      const { token, utente } = res.data;
      localStorage.setItem("token", token);
      localStorage.setItem("utente", JSON.stringify(utente));
      dispatch({
        type: authCostanti.LOGIN_SUCCESS,
        payload: {
          token,
          utente,
        },
      });
    } else {
      if (res.status === 400) {
        dispatch({
          type: authCostanti.LOGIN_FAILURE,
          payload: { error: res.data.error },
        });
      }
    }
  };
};

export const isUtenteLoggedIn = () => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");
    if (token) {
      const utente = JSON.parse(localStorage.getItem("utente"));
      dispatch({
        type: authCostanti.LOGIN_SUCCESS,
        payload: {
          token,
          utente,
        },
      });
    } else {
      dispatch({
        type: authCostanti.LOGIN_FAILURE,
        payload: { error: "Failed to login" },
      });
    }
  };
};

export const signout = () => {
  return async (dispatch) => {
    dispatch({ type: authCostanti.LOGOUT_REQUEST });
    localStorage.clear();
    dispatch({ type: authCostanti.LOGOUT_SUCCESS });
    dispatch({ type: carrelloCostanti.RESET_CARRELLO });
  };
};