import { types } from "../types/types"

const initialState = {
    loaded: [],
    created: null,
    updated: null,
    deleted: null,
}

export const driverReducer = (state = initialState, action ) => {
    switch (action.type) {
        case types.driverLoaded:
            return {
                ...state,
                loaded: action.payload 
            }
        case types.driverCreated:
            return {
                ...state,
                created: action.payload 
            }
        case types.driverUpdated:
            return {
                ...state,
                updated: action.payload 
            }
        case types.driverDeleted:
            return {
                ...state,
                deleted: action.payload 
            }
        default:
            return state
    }
}
