
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

export const prepareOptionsConversion = (data) => {
    let items = []
    
    Object.keys(data).map( (key) => {
        const label = `${data[key].presentacion} ${data[key].contenido} ${data[key].unidad_medida_text}`
        items.push({ value: data[key].id, label }) 
    })

    return items
}




