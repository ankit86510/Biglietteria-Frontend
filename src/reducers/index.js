import {combineReducers} from 'redux';
import categorieReducer from './categorie.reducers';
import partiteReducer from  './partite.reducers';
import authReducer from './auth.reducers'
import carrelloReducer from './carrello.reducers'
import utenteReducer from './utente.reducers'


const rootReducer = combineReducers({
    categorie: categorieReducer,
    partite: partiteReducer,
    auth: authReducer,
    carrello: carrelloReducer,
    utente: utenteReducer
});

export default rootReducer