import { Fragment, useState, useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux'

import DataTable from 'react-data-table-component'
import DataTableExtensions from 'react-data-table-component-extensions'
import 'react-data-table-component-extensions/dist/index.css'

import { Form } from "./form"
import { addItem, updateItem, deleteItem, } from "../../helpers/dataArray"

import { startLoadingCategories } from '../../actions/categories'
import { startLoadingConversions } from '../../actions/conversion'

import { startCreatingProduct, 
         startUpdatingProduct, 
         startDeletingProduct, 
         startLoadingProducts } from '../../actions/products'

export const Products = () => {

    const dispatch = useDispatch()
    //Aquí se almacena el listado de productos
    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState({})
    //Aquí se almacena el listado de presentaciones de productos
    const [conversions, setConversions] = useState({})

    const { loaded: categoriesLoaded } = useSelector(state => state.categories)
    const { loaded: conversionsLoaded } = useSelector(state => state.conversions)
    //Estas son las variables del state que se modifican
    //Cuando se crea, edita o elimina un 
    const { loaded, created, updated, deleted } = useSelector(state => state.products)
    const [data, setData] = useState()

    /** Obtiene el listado de productos, categorias y presentaciones**/
    useEffect( async () => {
        dispatch( startLoadingProducts() )

        dispatch( startLoadingCategories() )

        dispatch( startLoadingConversions() )
    },[]) 

    //Está pendiente si cambia el valor de loaded
    //En caso de cambiar es porque se cargaron los productos
    useEffect(() => {
        if(loaded){
            setProducts(loaded)
        }

        if(categoriesLoaded){
            const categories = categoriesLoaded.filter(category => category.tipo == "Productos");
            setCategories(categories)
        }
        
        if(conversionsLoaded){
            setConversions(conversionsLoaded)
        }
    }, [loaded, categoriesLoaded, conversionsLoaded])

    //Está pendiente si cambia el valor de created
    //En caso de cambiar es porque se creó correctamente el producto
    useEffect(() => {

        const list = addItem(products, created)
        //Actualizo el listado de productos
        setProducts(list)

    }, [created])

    //Está pendiente si cambia el valor de updated
    //En caso de cambiar es porque se editó correctamente el vehículo
    useEffect(() => {
        
        const list = updateItem(products, updated)
        //Actualizo el listado de productos
        setProducts(list)
        //Limpio el formulario
        setData({})

    }, [updated])

    //Está pendiente si cambia el valor de deleted
    //En caso de cambiar es porque se eliminó correctamente el vehículo
    useEffect(() => {
        
        const list = deleteItem(products, deleted)
        //Actualizo el listado de productos
        setProducts(list)

    }, [deleted])
    
    //Envia los datos del formularioe
    const onSubmit = (data) => {
        if( data.id ) {
            dispatch( startUpdatingProduct( {...data} ) )
        }else{
            dispatch( startCreatingProduct( {...data} ) )
        }
    };
    
    //Llena el state data con los datos del vehículo a editar
    const handleEdit = (item) => {
        setData(item)
    }
    
    //Dispara el evento que elimina un vehículo determinado
    const handleRemove = (item) => {
        dispatch( startDeletingProduct( item ) )
    }

    //Inicializo estructura de culumnas de la tabla
    const columns = [
        {
            name: 'Nombre',
            selector: 'nombre',
            sortable: true,
        },
        {
            name: 'Categoría',
            selector: 'categoria',
            sortable: true,
        },
        {
            name: 'Estado',
            selector: 'estado',
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
                            <Form data={data} categories={categories} conversions={conversions} onSubmit={onSubmit}/>
                        </div>
                    </div>
                </div>
                <div className="col-lg-7 col-xs-12 col-sm-12">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">Listado de Productos</h4>
                            <hr/>
                            <DataTableExtensions
                                columns={columns}
                                data={ products }>
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
