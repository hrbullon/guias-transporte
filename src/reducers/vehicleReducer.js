import { types } from "../types/types"

const initialState = {
    loaded: [],
    created: null,
    updated: null,
    deleted: null,
}

export const vehicleReducer = (state = initialState, action ) => {
    switch (action.type) {
        case types.vehicleLoaded:
            return {
                ...state,
                loaded: action.payload 
            }
        case types.vehicleCreated:
            return {
                ...state,
                created: action.payload 
            }
        case types.vehicleUpdated:
            return {
                ...state,
                updated: action.payload 
            }
        case types.vehicleDeleted:
            return {
                ...state,
                deleted: action.payload 
            }
        default:
            return state
    }
}
