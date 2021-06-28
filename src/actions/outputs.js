import Swal from 'sweetalert2'

import { db } from '../firebase/firebase-config'
import { types } from '../types/types'

const table = "outputs"

export const startLoadingOutputs = ( company, workday) => {
    return async (dispatch) => {
        
        try {
            
            const outputsSnap = await db.collection(table)
            .where("jornadaId","==",workday)
            .where("importadorId","==",company)
            .get()
            const outputs = []

            outputsSnap.forEach( snap => {
                outputs.push({
                    id: snap.id,
                    ...snap.data()
                })
            })
            //Notifico al reducer, para que me almacene los datos en el state
            dispatch( outputsLoaded( outputs ) )

        } catch (error) {
            console.log('Error al cargar los datos de la salida')
        }
    }
}

export const startCreatingOutput = ( data ) => {
    return async (dispatch) => {
        try {
            const doc = await db.collection(table).add(data)
            dispatch( outputCreated( { id: doc.id, ...data } ) )
            Swal.fire('Correcto', 'Salida registrada!!','success')
        } catch (error) {
            Swal.fire('Error', error.message,'error')
        }
    }
}

export const startUpdatingOutput = ( data ) => {

    return async (dispatch) => {
        
        try {
            const doc = await db.doc(`${ table }/${ data.id }`).get()
            let copy = { ...data }
            delete copy.id
 
            const updateOutput = { 
                ...doc.data(), 
                ...copy
            }

            await db.doc(`${ table }/${ doc.id }`).update( updateOutput )
            dispatch( outputUpdated( { id: data.id, ...updateOutput } ) )

            Swal.fire('Correcto', 'Salida actualizada!!','success')

        } catch (error) {
            Swal.fire('Error', error.message,'error')
        }
    }

}

export const startDeletingOutput = (data) => {
    return (dispatch) => {
        
        Swal.fire({
            title: 'Seguro quiere eliminarla?',
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
                dispatch( outputDeleted( data ) )
                Swal.fire('Correcto', 'Salida eliminada!!','success')
            }
        })
    }
}

export const startCancelingOutput = ( data ) => {

    return async (dispatch) => {
        
        Swal.fire({
            title: 'Seguro quiere cancelar esta salída?',
            text: "No podrá revertirlo!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Sí, cancelar'
        }).then( async (result) => {
            if (result.isConfirmed) {

                const doc = await db.doc(`${ table }/${ data.id }`).get()
                let copy = { ...data }
                delete copy.id
     
                const updateOutput = { 
                    ...doc.data(), 
                    ...copy,
                    estado: "Cancelada"
                }
    
                await db.doc(`${ table }/${ doc.id }`).update( updateOutput )
                dispatch( outputUpdated( { id: data.id, ...updateOutput } ) )
    
                Swal.fire('Correcto', 'Salida cancelada!!','success')

            }
        })
    }
}

export const outputsLoaded = ( data ) => ({
    type: types.outputsLoaded,
    payload: data
})

export const outputCreated = ( data ) => ({
    type: types.outputCreated,
    payload: data
})

export const outputUpdated = ( data ) => ({
    type: types.outputUpdated,
    payload: data
})

export const outputDeleted = ( data ) => ({
    type: types.outputDeleted,
    payload: data
})
