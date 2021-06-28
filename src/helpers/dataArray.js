
export const getItem = (data, id) => {
    
    let item = ""
    Object.keys(data).map( (key) => {
        if(data[key].id === id){
            item = { ...data[key] }
        }
    })
    return item
}

export const addItem = (data,created) => {
    
    let updatedArray = []
    //Agrego el nuevo usuario al listado
    updatedArray.push({ ...created} )

    Object.keys(data).map( (key) => {
        updatedArray.push({ ...data[key] }) 
    })

    return updatedArray
}

export const updateItem = (data, updated) => {
    
    let updatedArray = []

    Object.keys(data).map( (key) => {
        if(data[key].id == updated.id){
            updatedArray.push({ ...updated }) 
        }else{
            updatedArray.push({ ...data[key] }) 
        }
    })

    return updatedArray
}

export const deleteItem = (data, deleted) => {

    let updatedArray = []

    Object.keys(data).map( (key) => {
        if(data[key].id !== deleted.id){
            updatedArray.push({ ...data[key] }) 
        }
    })

    return updatedArray
}

export const prepareOptionsRif = (data) => {
    let items = []
    
    Object.keys(data).map( (key) => {
        items.push({ value: data[key].id, label: data[key].rif }) 
    })

    return items
}

export const prepareOptionsPlaca = (data) => {
    let items = []
    
    Object.keys(data).map( (key) => {
        items.push({ value: data[key].id, label: data[key].placa }) 
    })

    return items
}

export const prepareOptionsSelect = (data) => {
    let items = []
    Object.keys(data).map( (key) => {
        items.push({ value: data[key].id, label: data[key].nombre }) 
    })

    return items
}

export const getItemSelect = (data, id) => {
    
    let item = ""
    Object.keys(data).map( (key) => {
        if(data[key].value === id){
            item = { ...data[key] }
        }
    })
    return item
}

export const getItemMunicipio = (data, id) => {
    
    let item = ""
    Object.keys(data).map( (key) => {
        if(data[key].municipio === id){
            item = { ...data[key].parroquias }
        }
    })
    return item
}

export const prepareOptionsItems = (data) => {
    let items = []
    Object.keys(data).map( (key) => {
        items.push({ value: data[key], label: data[key] }) 
    })

    return items
}


export const prepareOptionsConversion = (data) => {
    let items = []
    
    Object.keys(data).map( (key) => {
        const label = `${data[key].presentacion} ${data[key].contenido} ${data[key].unidad_medida}`
        items.push({ value: data[key].id, label }) 
    })

    return items
}

export const getInfoVehiculo = (outputs, placa) => {
    return outputs.filter( item => item.vehiculo.placa == placa )
}


