import { db } from '../firebase/firebase-config'

export const validateInput = async (id, token) => {
    const snapshot = await db.collection(`inputs`).doc(id).get()
    if(!snapshot.empty){
        let data = snapshot.data()
        return (data.token == token)? true : false
    }
}

export const validatePlaca = async (placa) => {
    const snapshot = await db.collection(`vehicles`).where('placa','==',placa).get()
    return (snapshot.empty)? true : false
}

export const validatedVehiculo = async (jornadaId, placa, id) => {

    const outputsSnap = await db.collection('outputs')
    .where("jornadaId","==",jornadaId)
    .where("estado","==","Activa")
    .get()
    
    let contador = 0
   
    outputsSnap.forEach( snap => {
        let item = snap.data()
        if(item.vehiculo.placa == placa && item.id !== id){
            contador++
        }
    })

    return ( contador < 2 )
}

export const validateLimit = ( outputs, company, id ) => {
    const items = outputs.filter( item => item.estado == "Activa" && item.id !== id )
    const limit = parseInt(outputs[0].importador.limite_vehiculos)
    return ( items.length < limit )? true : false
}

export const validateDuplicated = ( outputs, data, id ) => {

    let flag = true
    let error = ""

    outputs.map((item) => {
        
        if( item.vehiculo.id === data.vehiculo.id && item.id !== id ){
            error += `El vehículo con placa <b>${data.vehiculo.placa}</b> ya fue registrado en la salída: <b>${item.codigo}</b><br>`
        }
        
        if( item.conductor.id === data.conductor.id && item.id !== id){
            error += `El coductor: <b>${data.conductor.nombre} ${data.conductor.apellido}</b> con cédula: <b>${data.conductor.rif}</b> ya fue registrado en la salída: <b>${item.codigo}</b><br>`
        }
        
        if( item.ayudante.id === data.conductor.id && item.id !== id){
            error += `El coductor: <b>${data.conductor.nombre} ${data.conductor.apellido}</b> con cédula: <b>${data.conductor.rif}</b> fue registrado como ayudante en la salída: <b>${item.codigo}</b><br>`
        }
        
        if( item.ayudante.id === data.ayudante.id && item.id !== id){
            error += `El ayudante: <b>${data.ayudante.nombre} ${data.ayudante.apellido}</b> con cédula: <b>${data.conductor.rif}</b> ya fue registrado en la salída: <b>${item.codigo}</b><br>`
        }
        
        if( item.conductor.id === data.ayudante.id && item.id !== id){
            error += `El ayudante: <b>${data.ayudante.nombre} ${data.ayudante.apellido}</b> con cédula: <b>${data.conductor.rif}</b> fue registrado como conductor en la salída: <b>${item.codigo}</b><br>`
        }
    });

    return error
}

export const validateOutputs = ( outputs, company, data, id) => {
    if(!validateLimit( outputs, company, id )){
        return "Err 001"
    } 

    let error = validateDuplicated( outputs, data, id )

    if(error !== ""){
        return error
    }

    return "Success"
}
