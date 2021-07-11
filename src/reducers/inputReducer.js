import { types } from "../types/types"

const initialState = {
    model: null,
    loaded: [],
    created: null,
    updated: null,
    deleted: null,
}

export const inputReducer = (state = initialState, action ) => {
    switch (action.type) {
        case types.inputs:
            return {
                ...state,
                model: action.payload 
            }
        case types.inputsLoaded:
            return {
                ...state,
                loaded: action.payload 
            }
        case types.inputCreated:
            return {
                ...state,
                created: action.payload 
            }
        case types.inputUpdated:
            return {
                ...state,
                updated: action.payload 
            }
        case types.inputDeleted:
            return {
                ...state,
                deleted: action.payload 
            }
        default:
            return state
    }
}
