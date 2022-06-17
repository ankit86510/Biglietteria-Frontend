import axios from '../helpers/axios';
import {categorieCostanti} from './costanti';

export const getAllCategorie = () => {
    return async (dispatch) => {

        dispatch({ type: categorieCostanti.GET_ALL_CATEGORIE_REQUEST });
        const res = await axios.get(`categorie/getcategorie`);
        console.log(res);
        if (res.status === 200) {

            const { ListCategorie } = res.data;

            dispatch({
                type: categorieCostanti.GET_ALL_CATEGORIE_SUCCESS,
                payload: { categorie: ListCategorie }
            });
        } else {
            dispatch({
                type: categorieCostanti.GET_ALL_CATEGORIE_FAILURE,
                payload: { error: res.data.error }
            });
        }


    }
}

export const addCategoria = (form) => {
    return async dispatch => {
        dispatch({ type: categorieCostanti.ADD_NEW_CATEGORIE_REQUEST });
        try {
            const res = await axios.post(`/categorie/create`, form);
            if (res.status === 201) {
                dispatch({
                    type: categorieCostanti.ADD_NEW_CATEGORIE_SUCCESS,
                    payload: { categoria: res.data.category }
                });
            } else {
                dispatch({
                    type: categorieCostanti.ADD_NEW_CATEGORIE_FAILURE,
                    payload: {error: res.data.error}
                });
            }
        } catch (error) {   
            console.log(error.response);
        }

    }
}

export const updateCategorie = (form) => {
    return async dispatch => {
        dispatch({ type: categorieCostanti.UPDATE_CATEGORIE_REQUEST });
        const res = await axios.post(`/categorie/update`, form);
        if (res.status === 201) {
            dispatch({ type: categorieCostanti.UPDATE_CATEGORIE_SUCCESS });
            dispatch(getAllCategorie());
        } else {
            const { error } = res.data;
            dispatch({
                type: categorieCostanti.UPDATE_CATEGORIE_FAILURE,
                payload: { error }
            });
        }
    }
}

export const deleteCategorie = (ids) => {
    return async dispatch => {
        dispatch({ type: categorieCostanti.DELETE_CATEGORIE_REQUEST });
        const res = await axios.post(`/categorie/delete`, {
            payload: {
                ids
            }
        });
        if (res.status == 201) {
            dispatch(getAllCategorie());
            dispatch({ type: categorieCostanti.DELETE_CATEGORIE_SUCCESS });
        } else {
            const { error } = res.data;
            dispatch({
                type: categorieCostanti.DELETE_CATEGORIE_FAILURE,
                payload: { error }
            });
        }
    }
}

export const createCategoryList = (categorie, options = []) => {

    for (let categoria of categorie) {
        options.push({
            value: categoria._id,
            nome: categoria.nome,
            parentId: categoria.parentId,
            type: categoria.type
        });
        if (categoria.children.length > 0) {
            createCategoryList(categoria.children, options)
        }
    }

    return options;
}