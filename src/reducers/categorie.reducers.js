import { categorieCostanti} from "../azioni/costanti"

const initState = {
    error: null,
    loading: false,
    categorie: []
}

const buildNewCategories = (parentId, categories, category) => {
    let myCategories = [];

    if(parentId == undefined){
        return [
            ...categories,
            {
                _id: category._id,
                nome: category.nome,
                slug: category.slug,
                type: category.type,
                children: []
            }
        ];
    }
    
    for(let cat of categories){

        if(cat._id == parentId){
            const newCategory = {
                _id: category._id,
                name: category.name,
                slug: category.slug,
                parentId: category.parentId,
                type: category.type,
                children: []
            };
            myCategories.push({
                ...cat,
                children: cat.children.length > 0 ? [...cat.children, newCategory] : [newCategory]
            })
        }else{
            myCategories.push({
                ...cat,
                children: cat.children ? buildNewCategories(parentId, cat.children, category) : []
            });
        }        
    }
    return myCategories;
}


export default (state = initState, action) => {
    console.log(action);
    switch(action.type){
        case categorieCostanti.GET_ALL_CATEGORIE_REQUEST
        :
            state = {
                ...state,
                loading: true
            }
            break;
        case categorieCostanti.GET_ALL_CATEGORIE_SUCCESS:
            state = {
                ...state,
                categorie: action.payload.categorie,
                loading: false,
            }
            break;
        case categorieCostanti.GET_ALL_CATEGORIE_FAILURE:
            state = {
                ...state,
                loading: false,
                error: action.payload.error
            }
            break;
        case categorieCostanti.ADD_NEW_CATEGORIE_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case categorieCostanti.ADD_NEW_CATEGORIE_SUCCESS:
            const Categoria = action.payload.categoria;
            const updatedCategorie = buildNewCategories(Categoria.parentId, state.categorie, Categoria);

            state = {
                ...state,
                categorie: updatedCategorie,
                loading: false,
            }
            break;
        case categorieCostanti.ADD_NEW_CATEGORIE_FAILURE:
            state = {
                ...initState,
            }
            break;

    }

    return state;
}