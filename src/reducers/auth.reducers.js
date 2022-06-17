import { authCostanti } from "../azioni/costanti";

const initState = {
  token: null,
  utente: {
    nome: "",
    cognome: "",
    email: ""
  },
  authenticate: false,
  authenticating: false,
  loading: false,
  error: null,
  message: "",
};

export default (state = initState, action) => {
  console.log(action);

  switch (action.type) {
    case authCostanti.LOGIN_REQUEST:
      state = {
        ...state,
        authenticating: true,
      };
      break;
    case authCostanti.LOGIN_SUCCESS:
      state = {
        ...state,
        utente: action.payload.utente,
        token: action.payload.token,
        authenticate: true,
        authenticating: false,
      };
      break;
    case authCostanti.LOGOUT_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case authCostanti.LOGOUT_SUCCESS:
      state = {
        ...initState,
      };
      break;
    case authCostanti.LOGOUT_FAILURE:
      state = {
        ...state,
        error: action.payload.error,
        loading: false,
      };
      break;
    case authCostanti.REGISTRAZIONE_REQUEST:
      break;
    case authCostanti.REGISTRAZIONE_SUCCESS:
      break;
    case authCostanti.REGISTRAZIONE_FAILURE:
      state = {
        ...state,
        error: action.payload.error,
      };
      break;
  }

  return state;
};