import Swal from 'sweetalert2'

import { db, firebase } from '../firebase/firebase-config'
import { types } from "../types/types";

export const startLoginEmailPassword = (email, password) => {
    return (dispatch) => {
        firebase.auth().signInWithEmailAndPassword( email, password )
        .then( ({ user }) => {
            let company = {
                id:"aoacqwz4VY7uakWbBdLT",
                rif:"J298192922",
                nombre:"Cooperativa Wayuu",
                municipio:"Mara",
                parroquia:"San Rafael",
                direccion:"DIRECCION",
                limite_vehiculos: "6",
                representante: {
                    nombre:"REPRESENTANTE",
                    rif:"V98988998",
                    telefono:"1231-2361276"
                },
                responsable: {
                    nombre:"RESPONSABLE",
                    rif:"V1232122",
                    telefono:"1231-2361276"
                } 
            }
            //console.log(company)
            dispatch( login( user.uid, user.displayName, company) )
        })
        .catch( e => {
            Swal.fire('Error', e.message,'error')
        })
    }
}

export const login = (uid,displayName, company) => ({
    type: types.login,
    payload: {
        uid,
        displayName,
        company
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