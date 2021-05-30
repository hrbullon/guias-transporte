import Swal from 'sweetalert2'

import { db, firebase } from '../firebase/firebase-config'
import { types } from "../types/types";

export const startLoginEmailPassword = (email, password) => {
    return (dispatch) => {
        firebase.auth().signInWithEmailAndPassword( email, password )
        .then( ({ user }) => {
            dispatch( login( user.uid, user.displayName) )
        })
        .catch( e => {
            Swal.fire('Error', e.message,'error')
        })
    }
}

export const login = (uid,displayName) => ({
    type: types.login,
    payload: {
        uid,
        displayName
    }
})

export const startLogout = () => {
    return async (dispatch) => {
        await firebase.auth().signOut()
        dispatch( logout() )
    }
}

export const logout = () => ({
    type: types.logout,
})