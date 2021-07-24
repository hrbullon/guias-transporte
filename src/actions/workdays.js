import Swal from 'sweetalert2'

import { db, firebase } from '../firebase/firebase-config'
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
export const startLoadingSigleWorkdays = () => {
    return async (dispatch) => {
        try {
            const snapshot = await db.collection(`${ table }`).where("estado","==","Abierta").get()
            let data = {}
            snapshot.forEach(doc => {
                data = { id: doc.id, ...doc.data() }
            });
            
            //Notifico al reducer, para que me almacene los datos en el state
            dispatch( workdays( data ) )
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
            let copy = { ...data }
            copy.estado = "Abierta"
            const doc = await db.collection(table).add(copy)
            const increment = firebase.firestore.FieldValue.increment(1);
            dispatch( workdaysCreated( { id: doc.id, ...copy } ) )
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

export const startCloseWorkdays = (data) => {
    return (dispatch) => {
        
        Swal.fire({
            title: 'Seguro quiere finalizar la jornada?',
            text: "No podrá revertirlo!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Sí, eliminar'
        }).then( async (result) => {
            if (result.isConfirmed) {

                const doc = await db.doc(`${ table }/${ data.id }`).get()
                const copy = { ...data}
                delete copy.id
    
                const updateworkdays = { 
                    ...doc.data(),
                    ...copy,
                    estado:"Cerrada"
                }
    
                await db.doc(`${ table }/${ doc.id }`).update( updateworkdays )
                dispatch( workdaysClosed( copy ) )
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

export const workdaysClosed = ( data ) => ({
    type: types.workdaysClosed,
    payload: data
})
