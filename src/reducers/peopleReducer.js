import { types } from "../types/types"

const initialState = {
    loaded: [],
    created: null,
    updated: null,
    deleted: null,
}

export const peopleReducer = (state = initialState, action ) => {
    switch (action.type) {
        case types.peopleLoaded:
            return {
                ...state,
                loaded: action.payload 
            }
        case types.peopleCreated:
            return {
                ...state,
                created: action.payload 
            }
        case types.peopleUpdated:
            return {
                ...state,
                updated: action.payload 
            }
        case types.peopleDeleted:
            return {
                ...state,
                deleted: action.payload 
            }
        default:
            return state
    }
}
