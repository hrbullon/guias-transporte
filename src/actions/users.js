import Swal from 'sweetalert2'

import { db, firebase } from '../firebase/firebase-config'
import { types } from '../types/types'

export const startCreatingUser = ( data ) => {
    return async (dispatch) => {
        
        const { nombre, apellido, rol, empresa, estado, email, password } = data
        
        await firebase.auth().createUserWithEmailAndPassword( email, password )
        .then( async ({ user }) => {

            const newUser = {
                login: user.uid,
                nombre,
                apellido,
                email,
                rol,
                empresa,
                estado
            }

            const doc = await db.collection(`users`).add(newUser)
            dispatch( userCreated( { id: doc.id, ...newUser } ) )
            Swal.fire('Correcto', 'Usuario guardado!!','success')

        })
        .catch( e => {
            Swal.fire('Error', e.message,'error')
        })
    }
}

export const startUpdatingUser = ( data ) => {

    return async (dispatch) => {
        
        const doc = await db.doc(`users/${ data.id }`).get()
        
        const updateUser = { 
            ...doc.data(), 
            nombre: data.nombre,
            apellido: data.apellido,
            rol: data.rol,
            estado: data.estado,
            empresa: data.empresa
        }
        
        await db.doc(`users/${ doc.id }`).update( updateUser )
        dispatch( userUpdated( { id: data.id, ...updateUser } ) )

        Swal.fire('Correcto', 'Usuario guardado!!','success')
    }

}

export const startResetingPassword = (email) => {
    return async (dispatch) => {
    
        Swal.fire({
            title: 'Restablecer Contraseña',
            text: "Enviar enlace para restablecer contraseña!",
            icon: 'info',
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Enviar'
        }).then( async (result) => {
            if (result.isConfirmed) {
                firebase.auth().sendPasswordResetEmail(email)
                .then(() => {
                    Swal.fire('Correcto', 'Enlace para restablecer contraseña enviado!','success')
                })
                .catch((error) => {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                });
            }
        })        
    }
}

export const startDeletingUser = (data) => {
    return (dispatch) => {
        
        Swal.fire({
            title: 'Seguro quiere eliminarlo?',
            text: "No podrá revertirlo!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Sí, eliminar'
        }).then( async (result) => {
            if (result.isConfirmed) {
                let { id } = data
                await db.doc(`users/${ id }`).delete()
                dispatch( userDeleted( data ) )
                Swal.fire('Correcto', 'Usuario eliminado!!','success')
            }
        })
    }
}

export const userCreated = ( data ) => ({
    type: types.userCreated,
    payload: data
})

export const userUpdated = ( data ) => ({
    type: types.userUpdated,
    payload: data
})

export const userDeleted = ( data ) => ({
    type: types.userDeleted,
    payload: data
})

