import { Fragment, useState, useEffect } from "react"

import { useSelector, useDispatch } from "react-redux"

import DataTable from 'react-data-table-component'
import DataTableExtensions from 'react-data-table-component-extensions'
import 'react-data-table-component-extensions/dist/index.css'

import { startCreatingCategory, startDeletingCategory, startLoadingCategories, startUpdatingCategory } from "../../actions/categories"
import { addItem, deleteItem, updateItem } from "../../helpers/dataArray"

import { Form } from "./form"

export const Categories = () => {

    const dispatch = useDispatch()

    //Aquí se almacena el listado de productos
    const [items, setItems] = useState([])
    //Estas son las variables del state que se modifican
    //Cuando se crea, edita o elimina un 
    const { loaded, created, updated, deleted } = useSelector(state => state.categories)
    const [data, setData] = useState()

    /** Obtiene el listado de categorias **/
    useEffect( async () => {
        
        dispatch( startLoadingCategories() )
        
    },[]) 

    //Está pendiente si cambia el valor de loaded
    //En caso de cambiar es porque se cargaron correctamente las categorias
    useEffect(() => {
        //Actualizo el listado de categorias
        setItems(loaded)
    }, [loaded])

    //Está pendiente si cambia el valor de created
    //En caso de cambiar es porque se creó correctamente la categoría
    useEffect(() => {
        const list = addItem(items, created)
        //Actualizo el listado de categorias
        setItems(list)
        //Limpio el formulario        
        setData({nombre:""})
    }, [created])

    //Está pendiente si cambia el valor de updated
    //En caso de cambiar es porque se editó correctamente la categoría
    useEffect(() => {
        
        const list = updateItem(items, updated)
        //Actualizo el listado de categorias
        setItems(list)
        //Limpio el formulario
        setData({nombre:""})

    }, [updated])

    //Está pendiente si cambia el valor de deleted
    //En caso de cambiar es porque se eliminó correctamente la categoría
    useEffect(() => {
        
        const list = deleteItem(items, deleted)
        //Actualizo el listado de categorías
        setItems(list)

    }, [deleted])

    //Envia los datos del formularioe
    const onSubmit = (data) => {
        if( data.id ) {
            dispatch( startUpdatingCategory( {...data} ) )
        }else{
            dispatch( startCreatingCategory( {...data} ) )
        }
    };
    
    //Llena el state data con los datos del vehículo a editar
    const handleEdit = (item) => {
        setData(item)
    }
    
    //Dispara el evento que elimina un vehículo determinado
    const handleRemove = (item) => {
        dispatch( startDeletingCategory( item ) )
    }

    //Inicializo estructura de culumnas de la tabla
    const columns = [
        {
            name: 'Tipo',
            selector: 'tipo',
            sortable: true,
        },
        {
            name: 'Nombre',
            selector: 'nombre',
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
                            <h4 className="card-title">Listado de Categorías</h4>
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
