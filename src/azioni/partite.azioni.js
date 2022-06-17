import axios from "../helpers/axios"
import { partiteCostanti } from "./costanti";

export const getPartiteBySlug = (slug) => {
    return async dispatch => {
        const res = await axios.get(`/partite/${slug}`);
        if (res.status === 200) {
            dispatch({
                type: partiteCostanti.GET_PARTITA_BY_SLUG,
                payload: res.data
            });
        } else {
            // dispatch({
            //     type: 
            // })
        }
    }
}

export const getPartitePage = (payload) => {
    return async dispatch => {
        try {
            const { cid, type } = payload.params;
            const res = await axios.get(`/page/${cid}/${type}`);
            dispatch({ type: partiteCostanti.GET_PARTITA_PAGE_REQUEST });
            if (res.status === 200) {
                const { page } = res.data;
                dispatch({
                    type: partiteCostanti.GET_PARTITA_PAGE_SUCCESS,
                    payload: { page }
                });
            } else {
                const { error } = res.data;
                dispatch({
                    type: partiteCostanti.GET_PARTITA_PAGE_FAILURE,
                    payload: { error }
                });
            }
        } catch(error) {
            console.log(error)
        }

    }
}

export const getPartitaDetailsById = (payload) => {
    return async dispatch => {
        dispatch({ type: partiteCostanti.GET_PARTITA_DETAILS_BY_ID_REQUEST });
        let res;
        try {
            const { IdPartita } = payload.params;
            res = await axios.get(`/partita/${IdPartita}`);
            console.log(res);
            dispatch({
                type: partiteCostanti.GET_PARTITA_DETAILS_BY_ID_SUCCESS,
                payload: { partitaDetails: res.data.partita }
            });

        } catch(error) {
            console.log(error);
            dispatch({
                type: partiteCostanti.GET_PARTITA_DETAILS_BY_ID_FAILURE,
                payload: { error: res.data.error }
            });
        }

    }
}