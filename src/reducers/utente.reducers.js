import { utenteCostanti } from "../azioni/costanti";

const initState = {
  ordini: [],
  DetagliOrdine: {},
  error: null,
  loading: false,
  orderFetching: false,
  placedOrderId: null,
};

export default (state = initState, action) => {
  switch (action.type) {
    case utenteCostanti.GET_UTENTE_ORDINE_REQUEST:
      state = {
        ...state,
        orderFetching: true,
      };
      break;
    case utenteCostanti.GET_UTENTE_ORDINE_SUCCESS:
      state = {
        ...state,
        ordini: action.payload.ordini,
        orderFetching: false,
      };
      break;
    case utenteCostanti.GET_UTENTE_ORDINE_FAILURE:
      state = {
        ...state,
        error: action.payload.error,
        orderFetching: false,
      };
      break;
    case utenteCostanti.GET_UTENTE_ORDINE_DETAILS_REQUEST:
      break;
    case utenteCostanti.GET_UTENTE_ORDINE_DETAILS_SUCCESS:
      state = {
        ...state,
        DetagliOrdine: action.payload.ordine,
      };
      break;
    case utenteCostanti.GET_UTENTE_ORDINE_DETAILS_FAILURE:
      break;
    case utenteCostanti.ADD_UTENTE_ORDINE_SUCCESS:
      state = {
        ...state,
        placedOrderId: action.payload.ordine._id,
      };
      break;
  }

  return state;
};