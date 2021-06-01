import Swal from 'sweetalert2'

import { db } from '../firebase/firebase-config'
import { types } from '../types/types'

const table = 'global_table'

export const startLoadingGlobals = () => {
    return async (dispatch) => {
        
        try {
            const globalSnap = await db.collection(table).get()
            const global = []

            globalSnap.forEach( snap => {
                global.push({
                    id: snap.id,
                    ...snap.data()
                })
            })
            //Notifico al reducer, para que me almacene los datos en el state
            dispatch( globalLoaded( global ) )

        } catch (error) {
            console.log('Error al cargar los datos de empresas')
        }
    }
}

export const startCreatingGlobal = ( data ) => {
    return async (dispatch) => {
        try {
            const doc = await db.collection(table).add(data)
            dispatch( globalCreated( { id: doc.id, ...data } ) )
            Swal.fire('Correcto', 'Datos registrados!!','success')
        } catch (error) {
            Swal.fire('Error', error.message,'error')
        }
    }
}

export const startUpdatingGlobal = ( data ) => {

    return async (dispatch) => {
        
        try {
            const doc = await db.doc(`${ table }/${ data.id }`).get()

            const updateGlobal = { 
                ...doc.data(), 
            }

            await db.doc(`${ table }/${ doc.id }`).update( updateGlobal )
            dispatch( globalUpdated( { id: data.id, ...updateGlobal } ) )

            Swal.fire('Correcto', 'Datos actualizados!!','success')

        } catch (error) {
            Swal.fire('Error', error.message,'error')
        }
    }

}

export const startDeletingGlobal = (data) => {
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
                await db.doc(`${ table }/${ id }`).delete()
                dispatch( globalDeleted( data ) )
                Swal.fire('Correcto', 'Datos eliminados!!','success')
            }
        })
    }
}

export const globalLoaded = ( data ) => ({
    type: types.globalLoaded,
    payload: data
})

export const globalCreated = ( data ) => ({
    type: types.globalCreated,
    payload: data
})

export const globalUpdated = ( data ) => ({
    type: types.globalUpdated,
    payload: data
})

export const globalDeleted = ( data ) => ({
    type: types.globalDeleted,
    payload: data
})
