import { Fragment, useState, useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux'

import DataTable from 'react-data-table-component'
import DataTableExtensions from 'react-data-table-component-extensions'
import 'react-data-table-component-extensions/dist/index.css'


import { Form } from "./form"

import { startCreatingConversion, startDeletingConversion, startLoadingConversions, startUpdatingConversion } from '../../../actions/conversion'
import { addItem, updateItem, deleteItem, } from "../../../helpers/dataArray"

export const Forms = () => {

    const dispatch = useDispatch()
    //Aquí se almacena el listado de presentaciones de productos
    const [items, setItems] = useState([])
    //Estas son las variables del state que se modifican
    //Cuando se crea, edita o elimina un 
    const { loaded, created, updated, deleted } = useSelector(state => state.conversions)
    const [data, setData] = useState()

    /** Obtiene el listado de presentación de productos **/
    useEffect( async () => {
        dispatch( startLoadingConversions() )
    },[]) 

    useEffect(() => { 
        setItems(loaded)
    }, [loaded])

    
    //Está pendiente si cambia el valor de created
    //En caso de cambiar es porque se creó correctamente a la presentación
    useEffect(() => {

        const list = addItem(items, created)
        //Actualizo el listado de presentación de productos
        setItems(list)
        //Limpio el formulario
        setData({})

    }, [created])

    //Está pendiente si cambia el valor de updated
    //En caso de cambiar es porque se editó correctamente la presentación de productos
    useEffect(() => {
        
        const list = updateItem(items, updated)
        //Actualizo el listado de presentación de productos
        setItems(list)
        //Limpio el formulario
        setData({})

    }, [updated])

    //Está pendiente si cambia el valor de deleted
    //En caso de cambiar es porque se eliminó correctamente el vehículo
    useEffect(() => {
        
        const list = deleteItem(items, deleted)
        //Actualizo el listado de presentación de productos
        setItems(list)

    }, [deleted])
    
    //Envia los datos del formularioe
    const onSubmit = (data) => {
        
        let values = { ...data }
        values.unidad_medida = data.unidad_medida.label
        
        if( data.id ) {
            dispatch( startUpdatingConversion( {...values} ) )
        }else{
            dispatch( startCreatingConversion( {...values} ) )
        }
    };

    //Llena el state data con los datos del vehículo a editar
    const handleEdit = (item) => {
        setData(item)
    }
    
    //Dispara el evento que elimina un vehículo determinado
    const handleRemove = (item) => {
        dispatch( startDeletingConversion( item ) )
    }

    //Inicializo estructura de culumnas de la tabla
    const columns = [
        {
            name: 'Presentación',
            selector: 'presentacion',
            sortable: true,
        },
        {
            name: 'Contenidp',
            selector: 'contenido',
            sortable: true,
        },
        {
            name: 'Unidad Medida',
            selector: 'unidad_medida',
            sortable: true,
        },
        {
            name: 'Acciones',
            sortable: false,
            right: true,
            cell: row => (
                <div> 
                    { /****** Capturo el evento click en el botón editar de cada fila******/ }
                    <i title="Editar" onClick={ (e) => handleEdit(row)  } className="mdi mdi-grease-pencil pointer mr-2"></i>
                    { /****** Capturo el evento click en el botón eliminar de cada fila******/ }
                    <i title="Eliminar" onClick={ (e) => handleRemove(row)  } className="mdi mdi-delete pointer"></i>
                </div>)    
        }
    ]

    return (
        <Fragment>
            <div className="row">
                <div className="col-lg-5 col-xs-12 col-s-12">
                    <div className="card">
                        <div className="card-body">
                            <Form data={data} onSubmit={onSubmit}/>
                        </div>
                    </div>
                </div>
                <div className="col-lg-7 col-xs-12 col-sm-12">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">Listado de Presentaciones de Productos</h4>
                            <hr/>
                            <DataTableExtensions
                                columns={columns}
                                data={ items }>
                                <DataTable
                                    noHeader
                                    pagination={ true }
                                    filter={true}/>
                            </DataTableExtensions>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
        
    )
}
