import { types } from "../types/types"

const initialState = {
    model: null,
    loaded: [],
    created: null,
    updated: null,
    closed: null,
}

export const workdaysReducer = (state = initialState, action ) => {
    switch (action.type) {
        case types.workdaystClear:
            return {
                ...state,
                ...action.payload 
            }
        case types.workdays:
            return {
                ...state,
                model: action.payload 
            }
        case types.workdaysLoaded:
            return {
                ...state,
                loaded: action.payload 
            }
        case types.workdaysCreated:
            return {
                ...state,
                created: action.payload 
            }
        case types.workdaysUpdated:
            return {
                ...state,
                updated: action.payload 
            }
        case types.workdaysClosed:
            return {
                ...state,
                closed: action.payload 
            }
        default:
            return state
    }
}
