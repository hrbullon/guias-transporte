import { db } from '../firebase/firebase-config'

export const validatePlaca = async (placa) => {
    const snapshot = await db.collection(`vehicles`).where('placa','==',placa).get()
    return (snapshot.empty)? true : false
}

export const validatedVehiculo = async (jornadaId, placa) => {
    
    const outputsSnap = await db.collection('outputs')
    .where("jornadaId","==",jornadaId)
    .get()
    
    let contador = 0
   
    outputsSnap.forEach( snap => {
        let item = snap.data()
        if(item.vehiculo.placa == placa){
            contador++
        }
    })

    return ( contador < 2 )
}

export const validateLimit = ( outputs, company ) => {
    const items = outputs.filter( item => item.estado == "Verificada" )
    const limit = parseInt(company.limite_vehiculos)
    return ( items.length <= limit )? true : false
}

export const validateDuplicated = ( outputs, data ) => {

    let flag = true

    outputs.map((item) => {

        if( item.vehiculo.id == data.vehiculo.id ||
            item.conductor.id == data.conductor.id ||
            item.conductor.id == data.ayudante.id ||
            item.ayudante.id == data.ayudante.id ||
            item.ayudante.id == data.conductor.id ){
                
                flag = false 
        }
        
    });

    return flag
}

export const validateOutputs = ( outputs, company, data) => {
    return (validateLimit( outputs, company ) && validateDuplicated( outputs, data ))
}