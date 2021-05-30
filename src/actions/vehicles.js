import Swal from 'sweetalert2'

import { db } from '../firebase/firebase-config'
import { types } from '../types/types'

export const startLoadingVehicles = () => {
    return async (dispatch) => {
        
        try {
            const vehiclesSnap = await db.collection(`vehicles`).get()
            const vehicles = []

            vehiclesSnap.forEach( snap => {
                vehicles.push({
                    id: snap.id,
                    ...snap.data()
                })
            })
            //Notifico al reducer, para que me almacene los datos en el state
            dispatch( vehiclesLoaded( vehicles ) )

        } catch (error) {
            console.log('Error al cargar los datos de empresas')
        }
    }
}

export const startCreatingVehicle = ( data ) => {
    return async (dispatch) => {
        try {
            const doc = await db.collection(`vehicles`).add(data)
            dispatch( vehicleCreated( { id: doc.id, ...data } ) )
            Swal.fire('Correcto', 'Vehículo registrado!!','success')
        } catch (error) {
            Swal.fire('Error', error.message,'error')
        }
    }
}

export const startUpdatingVehicle = ( data ) => {

    return async (dispatch) => {
        
        try {
            const doc = await db.doc(`vehicles/${ data.id }`).get()
            const { marca, modelo, placa, color, estado } = data

            const updateVehicle = { 
                ...doc.data(), 
                marca,modelo,placa,color,estado
            }

            await db.doc(`vehicles/${ doc.id }`).update( updateVehicle )
            dispatch( vehicleUpdated( { id: data.id, ...updateVehicle } ) )

            Swal.fire('Correcto', 'Vehículo actualizado!!','success')

        } catch (error) {
            Swal.fire('Error', error.message,'error')
        }
    }

}

export const startDeletingVehicle = (data) => {
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
                await db.doc(`vehicles/${ id }`).delete()
                dispatch( vehicleDeleted( data ) )
                Swal.fire('Correcto', 'Vehículo eliminado!!','success')
            }
        })
    }
}

export const vehiclesLoaded = ( data ) => ({
    type: types.vehicleLoaded,
    payload: data
})

export const vehicleCreated = ( data ) => ({
    type: types.vehicleCreated,
    payload: data
})

export const vehicleUpdated = ( data ) => ({
    type: types.vehicleUpdated,
    payload: data
})

export const vehicleDeleted = ( data ) => ({
    type: types.vehicleDeleted,
    payload: data
})
