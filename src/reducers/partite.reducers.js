import { partiteCostanti } from "../azioni/costanti";

const initState = {
  partite: [],
//   pageRequest: false,
//   page: {},
  error: null,
  partitaDetails: {},
  loading: false,
};

export default (state = initState, action) => {
  switch (action.type) {
    case partiteCostanti.GET_PARTITA_BY_SLUG:
      state = {
        ...state,
        partite: action.payload.partite,
      };
      break;
    case partiteCostanti.GET_PARTITA_PAGE_REQUEST:
      state = {
        ...state,
        pageRequest: true,
      };
      break;
    case partiteCostanti.GET_PARTITA_PAGE_SUCCESS:
      state = {
        ...state,
        page: action.payload.page,
        pageRequest: false,
      };
      break;
    case partiteCostanti.GET_PARTITA_PAGE_FAILURE:
      state = {
        ...state,
        pageRequest: false,
        error: action.payload.error,
      };
      break;
    case partiteCostanti.GET_PARTITA_DETAILS_BY_ID_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case partiteCostanti.GET_PARTITA_DETAILS_BY_ID_SUCCESS:
      state = {
        ...state,
        loading: false,
        partitaDetails: action.payload.partitaDetails,
      };
      break;
    case partiteCostanti.GET_PARTITA_DETAILS_BY_ID_FAILURE:
      state = {
        ...state,
        loading: false,
        error: action.payload.error,
      };
      break;
  }

  return state;
};