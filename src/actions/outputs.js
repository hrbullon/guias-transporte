import Swal from 'sweetalert2'

import { db } from '../firebase/firebase-config'
import { types } from '../types/types'

const table = "outputs"

export const startLoadingItem = ( id ) => {
    return async (dispatch) => {
   
        var docRef = db.collection(table).doc(id);

        await docRef.get().then((doc) => {
            let data = {}
            
            if (doc.exists) {
                let info = { ...doc.data() }
                data = { id: doc.id, ...info }
                dispatch( outputs(data) )
            } else {
                Swal.fire('Error', 'No existe la salida solicitada','error')

            }
        }).catch((error) => {
            console.log('Error al cargar los datos de la salida', error)
        });
    }
}

export const startLoadingOutputs = ( company, workday, role ) => {
    return async (dispatch) => {
        
        try {

            let outputsSnap = []

            if(role === "Super_Role"){

                outputsSnap = await db.collection(table)
                .where("jornada.id","==",workday)
                .get()
                
            }else{

                outputsSnap = await db.collection(table)
                .where("jornada.id","==",workday)
                .where("importador.id","==",company)
                .get()
                
            }
            
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

            let docRef = db.collection("counters").doc("cod");
    
            docRef.get().then( (doc) => {

                let codigo = ""
            
                if (doc.exists) {
                    
                    let prefx = "SA"    
                    let numero = (doc.data().outputs)+1
                
                    if(numero < 10){
                        codigo = `${prefx}000${numero}`
                    } 
                    
                    if(numero > 10 && numero < 100){
                        codigo = `${prefx}00${numero}`
                    } 
                    
                    if(numero > 100 && numero < 1000){
                        codigo = `${prefx}${numero}`
                    } 

                    let copy = { ...data }
                    copy.codigo = codigo
                    
                    const newDoc =  db.collection(table).add(copy)
                    dispatch( outputCreated( { id: newDoc.id, ...copy } ) )
                    Swal.fire('Correcto', 'Salida registrada!!','success')
 
                }
            }).catch((error) => {
                console.log("Error getting document:", error);
            });

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
            title: 'Seguro quiere eliminar esta salída?',
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

export const outputs = ( data ) => ({
    type: types.outputs,
    payload: data
})

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
