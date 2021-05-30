import { types } from "../types/types"

const initialState = {
    loaded: [],
    created: null,
    updated: null,
    deleted: null,
}

export const productReducer = (state = initialState, action ) => {
    switch (action.type) {
        case types.productLoaded:
            return {
                ...state,
                loaded: action.payload 
            }
        case types.productCreated:
            return {
                ...state,
                created: action.payload 
            }
        case types.productUpdated:
            return {
                ...state,
                updated: action.payload 
            }
        case types.productDeleted:
            return {
                ...state,
                deleted: action.payload 
            }
        default:
            return state
    }
}
