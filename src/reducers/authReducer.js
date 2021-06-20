import { types } from '../types/types';

export const authReducer = (state = {}, action) => {
    switch (action.type) {
        case types.login:
            return { 
                ...action.payload,
            }
        case types.sesionCompany:
            return { 
                ...state,
                role: action.payload.rol,
                sesionCompany: { ...action.payload.empresa },
            }
        case types.logout:
            return {}
        default:
            return state
    }
}

