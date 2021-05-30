import { types } from "../types/types"

const initialState = {
    loaded: [],
    created: null,
    updated: null,
    deleted: null,
}

export const companyReducer = (state = initialState, action ) => {
    switch (action.type) {
        case types.companyLoaded:
            return {
                ...state,
                loaded: action.payload 
            }
        case types.companyCreated:
            return {
                ...state,
                created: action.payload 
            }
        case types.companyUpdated:
            return {
                ...state,
                updated: action.payload 
            }
        case types.companyDeleted:
            return {
                ...state,
                deleted: action.payload 
            }
        default:
            return state
    }
}
