import { types } from "../types/types"

const initialState = {
    model: null,
    loaded: [],
    created: null,
    updated: null,
    deleted: null,
}

export const outputReducer = (state = initialState, action ) => {
    switch (action.type) {
        case types.outputs:
            return {
                ...state,
                model: action.payload 
            }
        case types.outputsLoaded:
            return {
                ...state,
                loaded: action.payload 
            }
        case types.outputCreated:
            return {
                ...state,
                created: action.payload 
            }
        case types.outputUpdated:
            return {
                ...state,
                updated: action.payload 
            }
        case types.outputDeleted:
            return {
                ...state,
                deleted: action.payload 
            }
        default:
            return state
    }
}
