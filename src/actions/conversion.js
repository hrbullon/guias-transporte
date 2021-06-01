import Swal from 'sweetalert2'

import { db } from '../firebase/firebase-config'
import { types } from '../types/types'

const table = 'conversion_table'

export const startLoadingConversions = () => {
    return async (dispatch) => {
        
        try {
            const conversionsSnap = await db.collection(table).get()
            const conversions = []

            conversionsSnap.forEach( snap => {
                conversions.push({
                    id: snap.id,
                    ...snap.data()
                })
            })
            //Notifico al reducer, para que me almacene los datos en el state
            dispatch( conversionsLoaded( conversions ) )

        } catch (error) {
            console.log('Error al cargar los datos de presetanciones de productos')
        }
    }
}

export const startCreatingConversion = ( data ) => {
    return async (dispatch) => {
        try {
            const doc = await db.collection(table).add(data)
            dispatch( conversionCreated( { id: doc.id, ...data } ) )
            Swal.fire('Correcto', 'Datos registrados!!','success')
        } catch (error) {
            Swal.fire('Error', error.message,'error')
        }
    }
}

export const startUpdatingConversion = ( data ) => {

    return async (dispatch) => {
        
        try {
            const doc = await db.doc(`${ table }/${ data.id }`).get()
            
            const updateConversion = { 
                ...doc.data(),
                ...data
            }

            await db.doc(`${ table }/${ doc.id }`).update( updateConversion )
            dispatch( conversionUpdated( { id: data.id, ...updateConversion } ) )

            Swal.fire('Correcto', 'Datos actualizados!!','success')

        } catch (error) {
            Swal.fire('Error', error.message,'error')
        }
    }

}

export const startDeletingConversion = (data) => {
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
                await db.doc(`${table}/${ id }`).delete()
                dispatch( conversionDeleted( data ) )
                Swal.fire('Correcto', 'Datos eliminados!!','success')
            }
        })
    }
}

export const conversionsLoaded = ( data ) => ({
    type: types.conversionLoaded,
    payload: data
})

export const conversionCreated = ( data ) => ({
    type: types.conversionCreated,
    payload: data
})

export const conversionUpdated = ( data ) => ({
    type: types.conversionUpdated,
    payload: data
})

export const conversionDeleted = ( data ) => ({
    type: types.conversionDeleted,
    payload: data
})
