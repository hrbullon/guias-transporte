import Swal from 'sweetalert2'

import { db } from '../firebase/firebase-config'
import { types } from '../types/types'

const table = "inputs"

export const startLoadingItem = ( id ) => {
    return async (dispatch) => {
   
        var docRef = db.collection("inputs").doc(id);

        await docRef.get().then((doc) => {
            let data = {}

            if (doc.exists) {
                data = { id: doc.id, ...doc.data() }
                dispatch( inputs(data) )
            } else {
                Swal.fire('Error', 'No existe la entrada solicitada','error')

            }
        }).catch((error) => {
            console.log('Error al cargar los datos de la entrada', error)
        });
    }
}

export const startLoadingInputs = ( company, workday, role) => {
    return async (dispatch) => {
        
        try {

            let inputSnap = []

            if(role === "Super_Role"){

                inputSnap = await db.collection(table)
                .where("jornada.id","==",workday)
                .get()
                
            }else{
                
                inputSnap = await db.collection(table)
                .where("jornada.id","==",workday)
                .where("importador.id","==",company)
                .get()
                
            }

            const inputs = []

            inputSnap.forEach( snap => {
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
            let docRef = db.collection("counters").doc("cod");
    
            docRef.get().then( (doc) => {

                let codigo = ""
            
                if (doc.exists) {
                    
                    let prefx = "IM"    
                    let numero = (doc.data().inputs)+1
                
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

                    //Actualizo el contador de entradas
                    const docInputs = db.doc('counters/cod').get()
                    let copyInputs = { ...docInputs }
                    delete copyInputs.id
         
                    const updateInput = { 
                        ...copyInputs,
                        inputs: numero
                    }
        
                    db.doc('counters/cod').update( updateInput )

                    dispatch( inputCreated( { id: newDoc.id, ...copy } ) )
                    Swal.fire('Correcto', 'Entrada registrada!!','success')
 
                }
            }).catch((error) => {
                console.log("Error getting document:", error);
            });

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
            title: 'Seguro quiere eliminar esta entrada?',
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

export const inputs = ( data ) => ({
    type: types.inputs,
    payload: data
})

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
