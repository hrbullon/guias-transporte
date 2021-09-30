import Swal from 'sweetalert2'

import { db, firebase } from '../firebase/firebase-config'
import { types } from "../types/types";

export const startLoginEmailPassword = (email, password) => {
    return async (dispatch) => {
        
        await firebase.auth().signInWithEmailAndPassword( email, password )
        .then( async ({ user }) => {
            dispatch( login( user.uid, user.displayName) )
        })
        .catch( e => {
            Swal.fire('Error', e.message,'error')
        })
    }
}

export const startLoadingCompany = (user) => {
    return async (dispatch) => { 
        let data = {}
        
        const snapshot = await db.collection(`users`).where("login","==", user.uid).get()
        snapshot.forEach(doc => {
            
            const company = db.collection(`companies`).doc(doc.data().empresa.id)
            company.get().then( (docx) => { 
                let empresa = docx.data()
                
                if(empresa){
                    empresa.id = doc.data().empresa.id
                }
                data = { rol: doc.data().rol , empresa }
                dispatch( sesionCompany( data ) )
            })

        });


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

export const sesionCompany = ( company ) => ({
    type: types.sesionCompany,
    payload: company
})