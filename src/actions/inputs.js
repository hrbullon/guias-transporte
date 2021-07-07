import Swal from 'sweetalert2'

import { db } from '../firebase/firebase-config'
import { types } from '../types/types'

const table = "inputs"

export const startLoadingInputs = ( company, workday) => {
    return async (dispatch) => {
        
        try {
            
            const inputsSnap = await db.collection(table)
            .where("jornadaId","==",workday)
            .where("importadorId","==",company)
            .get()
            const inputs = []

            inputsSnap.forEach( snap => {
                inputs.push({
                    id: snap.id,
                    ...snap.data()
                })
            })
            //Notifico al reducer, para que me almacene los datos en el state
            dispatch( inputsLoaded( inputs ) )

        } catch (error) {
            console.log('Error al cargar los datos de la entrada')
        }
    }
}

export const startCreatingInput = ( data ) => {
    return async (dispatch) => {
        try {
            const doc = await db.collection(table).add(data)
            dispatch( inputCreated( { id: doc.id, ...data } ) )
            Swal.fire('Correcto', 'Entrada registrada!!','success')
        } catch (error) {
            Swal.fire('Error', error.message,'error')
        }
    }
}

export const startUpdatingInput = ( data ) => {

    return async (dispatch) => {
        
        try {
            const doc = await db.doc(`${ table }/${ data.id }`).get()
            let copy = { ...data }
            delete copy.id
 
            const updateInput = { 
                ...doc.data(), 
                ...copy
            }

            await db.doc(`${ table }/${ doc.id }`).update( updateInput )
            dispatch( inputUpdated( { id: data.id, ...updateInput } ) )

            Swal.fire('Correcto', 'Entrada actualizada!!','success')

        } catch (error) {
            Swal.fire('Error', error.message,'error')
        }
    }

}

export const startDeletingInput = (data) => {
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
                dispatch( inputDeleted( data ) )
                Swal.fire('Correcto', 'Entrada eliminada!!','success')
            }
        })
    }
}

export const startCancelingInput = ( data ) => {

    return async (dispatch) => {
        
        Swal.fire({
            title: 'Seguro quiere cancelar esta entrada?',
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
     
                const updateInput = { 
                    ...doc.data(), 
                    ...copy,
                    estado: "Cancelada"
                }
    
                await db.doc(`${ table }/${ doc.id }`).update( updateInput )
                dispatch( inputUpdated( { id: data.id, ...updateInput } ) )
    
                Swal.fire('Correcto', 'Entrada cancelada!!','success')

            }
        })
    }
}

export const inputsLoaded = ( data ) => ({
    type: types.inputsLoaded,
    payload: data
})

export const inputCreated = ( data ) => ({
    type: types.inputCreated,
    payload: data
})

export const inputUpdated = ( data ) => ({
    type: types.inputUpdated,
    payload: data
})

export const inputDeleted = ( data ) => ({
    type: types.inputDeleted,
    payload: data
})
