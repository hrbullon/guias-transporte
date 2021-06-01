import { types } from "../types/types"

const initialState = {
    loaded: [],
    created: null,
    updated: null,
    deleted: null,
}

export const conversionReducer = (state = initialState, action ) => {
    switch (action.type) {
        case types.conversionLoaded:
            return {
                ...state,
                loaded: action.payload 
            }
        case types.conversionCreated:
            return {
                ...state,
                created: action.payload 
            }
        case types.conversionUpdated:
            return {
                ...state,
                updated: action.payload 
            }
        case types.conversionDeleted:
            return {
                ...state,
                deleted: action.payload 
            }
        default:
            return state
    }
}
