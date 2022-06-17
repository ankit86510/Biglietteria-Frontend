import { carrelloCostanti } from "../azioni/costanti";

const initState = {
    ArticoliCarrello: {
        // 123: {
        //     _id: 123,
        //     name: 'Samsung mobile',
        //     img: 'some.jpg',
        //     price: 200,
        //     qty: 1,
        // }
    },
    updatingCart: false,
    error: null
};

export default (state = initState, action) => {
    switch(action.type){
        case carrelloCostanti.ADD_TO_CARRELLO_REQUEST:
            state = {
                ...state,
                updatingCart: true
            }
            break;
        case carrelloCostanti.ADD_TO_CARRELLO_SUCCESS:
            console.log()
            state = {
                ...state,
                ArticoliCarrello: action.payload.ArticoliCarrello,
                updatingCart: false
            }
            break;
        case carrelloCostanti.ADD_TO_CARRELLO_FAILURE:
            state = {
                ...state,
                updatingCart: false,
                error: action.payload.error
            }
            break;
        case carrelloCostanti.RESET_CARRELLO:
            state = {
                ...initState
            }
    }
    return state;
}