import Swal from 'sweetalert2'

import { db } from '../firebase/firebase-config'
import { types } from '../types/types'

const table = "people"

export const startLoadingPeople = () => {
    return async (dispatch) => {
        
        try {
            const peoplesSnap = await db.collection(table).get()
            const people = []

            peoplesSnap.forEach( snap => {
                people.push({
                    id: snap.id,
                    ...snap.data()
                })
            })
            //Notifico al reducer, para que me almacene los datos en el state
            dispatch( peopleLoaded( people ) )

        } catch (error) {
            console.log('Error al cargar los datos de personas')
        }
    }
}

export const startCreatingPeople = ( data ) => {
    return async (dispatch) => {
        try {
            const doc = await db.collection(table).add(data)
            dispatch( peopleCreated( { id: doc.id, ...data } ) )
            Swal.fire('Correcto', 'Persona registrada!!','success')
        } catch (error) {
            Swal.fire('Error', error.message,'error')
        }
    }
}

export const startUpdatingPeople = ( data ) => {

    return async (dispatch) => {
        
        try {
            const doc = await db.doc(`${table}/${ data.id }`).get()
            const copy = { ...data }

            const updatePeople = { 
                ...doc.data(), 
                ...copy
            }

            await db.doc(`${table}/${ doc.id }`).update( updatePeople )
            dispatch( peopleUpdated( { id: data.id, ...updatePeople } ) )

            Swal.fire('Correcto', 'Persona actualizado!!','success')

        } catch (error) {
            Swal.fire('Error', error.message,'error')
        }
    }

}

export const startDeletingPeople = (data) => {
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
                dispatch( peopleDeleted( data ) )
                Swal.fire('Correcto', 'Persona eliminado!!','success')
            }
        })
    }
}

export const peopleLoaded = ( data ) => ({
    type: types.peopleLoaded,
    payload: data
})

export const peopleCreated = ( data ) => ({
    type: types.peopleCreated,
    payload: data
})

export const peopleUpdated = ( data ) => ({
    type: types.peopleUpdated,
    payload: data
})

export const peopleDeleted = ( data ) => ({
    type: types.peopleDeleted,
    payload: data
})
