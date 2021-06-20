import Swal from 'sweetalert2'

import { db } from '../firebase/firebase-config'
import { types } from '../types/types'

const table = "categories"

export const startLoadingCategoriesFilter = (tipo) => {
    return async (dispatch) => {
        
        try {
            const categoriesSnap = await db.collection(table).where("tipo","==",tipo).get()
            const categories = []

            categoriesSnap.forEach( snap => {
                categories.push({
                    id: snap.id,
                    ...snap.data()
                })
            })
            //Notifico al reducer, para que me almacene los datos en el state
            dispatch( categoriesLoaded( categories ) )

        } catch (error) {
            console.log('Error al cargar los datos de categorias')
        }
    }
}

export const startLoadingCategories = () => {
    return async (dispatch) => {
        
        try {            

            const categoriesSnap = await db.collection(table).get()
            const categories = []

            categoriesSnap.forEach( snap => {
                categories.push({
                    id: snap.id,
                    ...snap.data()
                })
            })
            //Notifico al reducer, para que me almacene los datos en el state
            dispatch( categoriesLoaded( categories ) )

        } catch (error) {
            console.log('Error al cargar los datos de categorias')
        }
    }
}

export const startCreatingCategory = ( data ) => {
    return async (dispatch) => {
        try {
            const doc = await db.collection(table).add(data)
            dispatch( categoryCreated( { id: doc.id, ...data } ) )
            Swal.fire('Correcto', 'Categoría registrada!!','success')
        } catch (error) {
            Swal.fire('Error', error.message,'error')
        }
    }
}

export const startUpdatingCategory = ( data ) => {

    return async (dispatch) => {
        
        try {
            const doc = await db.doc(`${table}/${ data.id }`).get()
            const copy = { ...data }
            delete copy.id

            const updatecategory = { 
                ...doc.data(), 
                ...copy
            }

            await db.doc(`${table}/${ doc.id }`).update( updatecategory )
            dispatch( categoryUpdated( { id: data.id, ...updatecategory } ) )

            Swal.fire('Correcto', 'Categoría actualizada!!','success')

        } catch (error) {
            Swal.fire('Error', error.message,'error')
        }
    }

}

export const startDeletingCategory = (data) => {
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
                await db.doc(`${table}/${ id }`).delete()
                dispatch( categoryDeleted( data ) )
                Swal.fire('Correcto', 'Categoría eliminada!!','success')
            }
        })
    }
}

export const categoriesLoaded = ( data ) => ({
    type: types.categoriesLoaded,
    payload: data
})

export const categoryCreated = ( data ) => ({
    type: types.categoryCreated,
    payload: data
})

export const categoryUpdated = ( data ) => ({
    type: types.categoryUpdated,
    payload: data
})

export const categoryDeleted = ( data ) => ({
    type: types.categoryDeleted,
    payload: data
})
