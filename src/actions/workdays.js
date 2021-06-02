import Swal from 'sweetalert2'

import { db } from '../firebase/firebase-config'
import { types } from '../types/types'

const table = 'workdays'

/***** Función para limpiar el state de "created y updated" *****/
export const startClearWorkdays = () => {
    return async (dispatch) => {
        //Notifico al reducer, para que limpie los datos en el state
        dispatch( workdaysClear({ workdays:null, created:null, updated:null}) )
    }
}

/***** Función para consultar el API y devolver una jornada específica *****/
export const startLoadingSigleWorkdays = ( id ) => {
    return async (dispatch) => {
        try {
            const workdaysnap = await db.collection(`${ table }`).doc( id ).get()
            //Notifico al reducer, para que me almacene los datos en el state
            dispatch( workdays(workdaysnap.data()) )
        } catch (error) {
            console.log('Error al cargar los datos de la jornada')
        }
    }
}

export const startLoadingWorkdays = () => {
    return async (dispatch) => {
        
        try {
            const workdaysSnap = await db.collection(table).get()
            const workdays = []

            workdaysSnap.forEach( snap => {
                workdays.push({
                    id: snap.id,
                    ...snap.data()
                })
            })
            //Notifico al reducer, para que me almacene los datos en el state
            dispatch( workdaysLoaded( workdays ) )

        } catch (error) {
            console.log('Error al cargar las guías')
        }
    }
}

export const startCreatingWorkdays = ( data ) => {
    return async (dispatch) => {
        try {
            const doc = await db.collection(table).add(data)
            dispatch( workdaysCreated( { id: doc.id, ...data } ) )
            Swal.fire('Correcto', 'Jornada registrada!!','success')
        } catch (error) {
            Swal.fire('Error', error.message,'error')
        }
    }
}

export const startUpdatingWorkdays = ( data ) => {

    return async (dispatch) => {
        
        try {
            const doc = await db.doc(`${ table }/${ data.id }`).get()
            const copy = { ...data}
            delete copy.id

            const updateworkdays = { 
                ...doc.data(),
                ...copy
            }

            await db.doc(`${ table }/${ doc.id }`).update( updateworkdays )
            dispatch( workdaysUpdated( { id: doc.id, ...updateworkdays } ) )

            Swal.fire('Correcto', 'Jornada actualizada!!','success')

        } catch (error) {
            Swal.fire('Error', error.message,'error')
        }
    }

}

export const startDeletingWorkdays = (data) => {
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
                dispatch( workdaysDeleted( data ) )
                Swal.fire('Correcto', 'Jornada eliminada!!','success')
            }
        })
    }
}

export const workdays = ( data ) => ({
    type: types.workdays,
    payload: data
})

export const workdaysClear = ( data ) => ({
    type: types.workdaysClear,
    payload: data
})

export const workdaysLoaded = ( data ) => ({
    type: types.workdaysLoaded,
    payload: data
})

export const workdaysCreated = ( data ) => ({
    type: types.workdaysCreated,
    payload: data
})

export const workdaysUpdated = ( data ) => ({
    type: types.workdaysUpdated,
    payload: data
})

export const workdaysDeleted = ( data ) => ({
    type: types.workdaysDeleted,
    payload: data
})
