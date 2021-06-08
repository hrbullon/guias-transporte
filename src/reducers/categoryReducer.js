import { types } from "../types/types"

const initialState = {
    loaded: [],
    created: null,
    updated: null,
    deleted: null,
}

export const categoryReducer = (state = initialState, action ) => {
    switch (action.type) {
        case types.categoriesLoaded:
            return {
                ...state,
                loaded: action.payload 
            }
        case types.categoryCreated:
            return {
                ...state,
                created: action.payload 
            }
        case types.categoryUpdated:
            return {
                ...state,
                updated: action.payload 
            }
        case types.categoryDeleted:
            return {
                ...state,
                deleted: action.payload 
            }
        default:
            return state
    }
}
