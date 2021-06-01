import Swal from 'sweetalert2'

import { db } from '../firebase/firebase-config'
import { types } from '../types/types'

const table = 'documents'

/***** Función para limpiar el state de "created y updated" *****/
export const startClearDocument = () => {
    return async (dispatch) => {
        //Notifico al reducer, para que limpie los datos en el state
        dispatch( documentClear({ document:null, created:null, updated:null}) )
    }
}

/***** Función para consultar el API y devolver una guía específica *****/
export const startLoadingSigleDocument = ( id ) => {
    return async (dispatch) => {
        try {
            const documentSnap = await db.collection(`${ table }`).doc( id ).get()
            //Notifico al reducer, para que me almacene los datos en el state
            dispatch( document(documentSnap.data()) )
        } catch (error) {
            console.log('Error al cargar los datos de la guía')
        }
    }
}

export const startLoadingDocuments = () => {
    return async (dispatch) => {
        
        try {
            const documentsSnap = await db.collection(table).get()
            const documents = []

            documentsSnap.forEach( snap => {
                documents.push({
                    id: snap.id,
                    ...snap.data()
                })
            })
            //Notifico al reducer, para que me almacene los datos en el state
            dispatch( documentsLoaded( documents ) )

        } catch (error) {
            console.log('Error al cargar las guías')
        }
    }
}

export const startCreatingDocument = ( data ) => {
    return async (dispatch) => {
        try {
            const doc = await db.collection(table).add(data)
            dispatch( documentCreated( { id: doc.id, ...data } ) )
            Swal.fire('Correcto', 'Guía registrado!!','success')
        } catch (error) {
            Swal.fire('Error', error.message,'error')
        }
    }
}

export const startUpdatingDocument = ( data ) => {

    return async (dispatch) => {
        
        try {
            const doc = await db.doc(`${ table }/${ data.id }`).get()
            const copy = { ...data}
            delete copy.id

            const updateDocument = { 
                ...doc.data(),
                ...copy
            }

            await db.doc(`${ table }/${ doc.id }`).update( updateDocument )
            dispatch( documentUpdated( { id: doc.id, ...updateDocument } ) )

            Swal.fire('Correcto', 'Guía actualizada!!','success')

        } catch (error) {
            Swal.fire('Error', error.message,'error')
        }
    }

}

export const startDeletingDocument = (data) => {
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
                dispatch( documentDeleted( data ) )
                Swal.fire('Correcto', 'Guía eliminada!!','success')
            }
        })
    }
}

export const document = ( data ) => ({
    type: types.document,
    payload: data
})

export const documentClear = ( data ) => ({
    type: types.documentClear,
    payload: data
})

export const documentsLoaded = ( data ) => ({
    type: types.documentLoaded,
    payload: data
})

export const documentCreated = ( data ) => ({
    type: types.documentCreated,
    payload: data
})

export const documentUpdated = ( data ) => ({
    type: types.documentUpdated,
    payload: data
})

export const documentDeleted = ( data ) => ({
    type: types.documentDeleted,
    payload: data
})
