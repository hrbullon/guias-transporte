import Swal from 'sweetalert2'

import { db } from '../firebase/firebase-config'
import { types } from '../types/types'

export const startLoadingActivesCompanies = () => {
    return async (dispatch) => {
        
        try {
            const companiesSnap = await db.collection(`companies`).where("estado","==","Activo").get()
            const companies = []

            companiesSnap.forEach( snap => {
                companies.push({
                    id: snap.id,
                    ...snap.data()
                })
            })
            //Notifico al reducer, para que me almacene los datos en el state
            dispatch( activeCompaniesLoaded( companies ) )

        } catch (error) {
            console.log('Error al cargar los datos de empresas')
        }
    }
}

export const startLoadingCompanies = () => {
    return async (dispatch) => {
        
        try {
            const companiesSnap = await db.collection(`companies`).get()
            const companies = []

            companiesSnap.forEach( snap => {
                companies.push({
                    id: snap.id,
                    ...snap.data()
                })
            })
            //Notifico al reducer, para que me almacene los datos en el state
            dispatch( companiesLoaded( companies ) )

        } catch (error) {
            console.log('Error al cargar los datos de empresas')
        }
    }
}

export const startCreatingCompany = ( data ) => {
    return async (dispatch) => {
        try {
            let copy = { ...data }
            delete copy.id

            if(data.type == "TYPE_CUSTOMER"){
                delete copy.limite_vehiculos
                delete copy.responsable
            }

            const doc = await db.collection(`companies`).add(copy)
            dispatch( companyCreated( { id: doc.id, ...copy } ) )
            Swal.fire('Correcto', `Datos registrados!!`,'success')
        } catch (error) {
            Swal.fire('Error', error.message,'error')
        }
    }
}

export const startUpdatingCompany = ( data ) => {

    return async (dispatch) => {
        
        try {
            const doc = await db.doc(`companies/${ data.id }`).get()
            let copy = { ...data }
            delete copy.id
            
            if(data.type == "TYPE_CUSTOMER"){
                delete copy.limite_vehiculos
                delete copy.responsable
            }

            await db.doc(`companies/${ doc.id }`).update( copy )
            dispatch( companyUpdated( { id: data.id, ...copy } ) )

            Swal.fire('Correcto', 'Datos actualizado!!','success')

        } catch (error) {
            Swal.fire('Error', error.message,'error')
        }
    }

}

export const startDeletingCompany = (data) => {
    return (dispatch) => {
        
        Swal.fire({
            title: 'Seguro quiere eliminar los datos?',
            text: "No podrá revertirlo!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Sí, eliminar'
        }).then( async (result) => {
            if (result.isConfirmed) {
                let { id } = data
                await db.doc(`companies/${ id }`).delete()
                dispatch( companyDeleted( data ) )
                Swal.fire('Correcto', 'Datos eliminados!!','success')
            }
        })
    }
}

export const activeCompaniesLoaded = ( data ) => ({
    type: types.activeCompaniesLoaded,
    payload: data
})

export const companiesLoaded = ( data ) => ({
    type: types.companyLoaded,
    payload: data
})

export const companyCreated = ( data ) => ({
    type: types.companyCreated,
    payload: data
})

export const companyUpdated = ( data ) => ({
    type: types.companyUpdated,
    payload: data
})

export const companyDeleted = ( data ) => ({
    type: types.companyDeleted,
    payload: data
})

