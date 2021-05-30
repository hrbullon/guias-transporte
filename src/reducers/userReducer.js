import { types } from "../types/types"

const initialState = {
    created: null,
    updated: null,
    deleted: null,
}

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.userCreated:
            return {
                ...state,
                created: action.payload 
            }
        case types.userUpdated:
            return {
                ...state,
                updated: action.payload 
            }
        case types.userDeleted:
            return {
                ...state,
                deleted: action.payload 
            }
        default:
            return state
    }
}
