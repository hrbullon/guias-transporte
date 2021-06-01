import { types } from "../types/types"

const initialState = {
    document: null,
    loaded: [],
    created: null,
    updated: null,
    deleted: null,
}

export const documentReducer = (state = initialState, action ) => {
    switch (action.type) {
        case types.documentClear:
            return {
                ...state,
                ...action.payload 
            }
        case types.document:
            return {
                ...state,
                document: action.payload 
            }
        case types.documentLoaded:
            return {
                ...state,
                loaded: action.payload 
            }
        case types.documentCreated:
            return {
                ...state,
                created: action.payload 
            }
        case types.documentUpdated:
            return {
                ...state,
                updated: action.payload 
            }
        case types.documentDeleted:
            return {
                ...state,
                deleted: action.payload 
            }
        default:
            return state
    }
}
