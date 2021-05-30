import Swal from 'sweetalert2'

import { db } from '../firebase/firebase-config'
import { types } from '../types/types'

export const startLoadingProducts = () => {
    return async (dispatch) => {
        
        try {
            const productsSnap = await db.collection(`products`).get()
            const products = []

            productsSnap.forEach( snap => {
                products.push({
                    id: snap.id,
                    ...snap.data()
                })
            })
            //Notifico al reducer, para que me almacene los datos en el state
            dispatch( productsLoaded( products ) )

        } catch (error) {
            console.log('Error al cargar los datos de empresas')
        }
    }
}

export const startCreatingProduct = ( data ) => {
    return async (dispatch) => {
        try {
            const doc = await db.collection(`products`).add(data)
            dispatch( productCreated( { id: doc.id, ...data } ) )
            Swal.fire('Correcto', 'Producto registrado!!','success')
        } catch (error) {
            Swal.fire('Error', error.message,'error')
        }
    }
}

export const startUpdatingProduct = ( data ) => {

    return async (dispatch) => {
        
        try {
            const doc = await db.doc(`products/${ data.id }`).get()
            const { nombre, categoria, presentacion, estado } = data

            const updateProduct = { 
                ...doc.data(),
                nombre, categoria, presentacion, estado
            }

            await db.doc(`products/${ doc.id }`).update( updateProduct )
            dispatch( productUpdated( { id: data.id, ...updateProduct } ) )

            Swal.fire('Correcto', 'Producto actualizado!!','success')

        } catch (error) {
            Swal.fire('Error', error.message,'error')
        }
    }

}

export const startDeletingProduct = (data) => {
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
                await db.doc(`products/${ id }`).delete()
                dispatch( productDeleted( data ) )
                Swal.fire('Correcto', 'Producto eliminado!!','success')
            }
        })
    }
}

export const productsLoaded = ( data ) => ({
    type: types.productLoaded,
    payload: data
})

export const productCreated = ( data ) => ({
    type: types.productCreated,
    payload: data
})

export const productUpdated = ( data ) => ({
    type: types.productUpdated,
    payload: data
})

export const productDeleted = ( data ) => ({
    type: types.productDeleted,
    payload: data
})
