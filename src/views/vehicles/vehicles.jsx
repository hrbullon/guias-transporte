import { Fragment, useState, useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux'

import { startLoadingCategories } from '../../actions/categories'

import { startCreatingVehicle,
         startUpdatingVehicle, 
         startDeletingVehicle, 
         startLoadingVehicles} from '../../actions/vehicles'

import DataTable from 'react-data-table-component'
import DataTableExtensions from 'react-data-table-component-extensions'
import 'react-data-table-component-extensions/dist/index.css'

import { Form } from "./form"
import { addItem, updateItem, deleteItem, prepareOptionsSelect, getItem, getItemSelect, } from "../../helpers/dataArray"

export const Vehicles = () => {

    const dispatch = useDispatch()
    //Aquí se almacena el listado de vehículos
    const [vehicles, setVehicles] = useState({})
    //Aquí se almacena el listado de marcas de vehículos
    const [brands, setBrands] = useState({})
    //Aquí se almacena el listado de modelos de vehículos
    const [models, setModels] = useState({})
    //Aquií se almacena el estado de validación del formulario
    const [validated, setValidated] = useState(true)

    //Estas son las variables del state que se modifican
    //Cuando se crea, edita o elimina un 
    const { loaded, created, updated, deleted } = useSelector(state => state.vehicles)
    const { loaded: categories } = useSelector(state => state.categories)
    const [data, setData] = useState()
    
    const [customSelect, setCustomSelect] = useState({
        marca:  { id:'', nombre:'' },
        modelo: { id:'', nombre:'' }
    })

    /** Obtiene el listado de vehiculos **/
    useEffect( async () => {
        
        dispatch( startLoadingVehicles() )
        
        dispatch( startLoadingCategories() )

    },[]) 

    //Está pendiente si cambia el valor de created
    //En caso de cambiar es porque se cargaron correctamente las categorias
    useEffect(() => {
        //Actualizo el listado de vehículos
        if(loaded){
            setVehicles(loaded)
        }
        
        if(categories){
            let brandsItems = categories.filter(category => category.tipo == "Marcas");
            brandsItems = prepareOptionsSelect(brandsItems)
            setBrands(brandsItems)
        }
    }, [loaded, categories])

    //Está pendiente si cambia el valor de created
    //En caso de cambiar es porque se creó correctamente el vehículo
    useEffect(() => {
        const list = addItem(vehicles, created)
        //Limpio el formulario        
        clearForm()
        //Actualizo el listado de vehículos
        setVehicles(list)
    }, [created])

    //Está pendiente si cambia el valor de updated
    //En caso de cambiar es porque se editó correctamente el vehículo
    useEffect(() => {
        
        const list = updateItem(vehicles, updated)
        //Actualizo el listado de vehículos
        setVehicles(list)
        //Limpio el formulario
        clearForm()

    }, [updated])

    //Está pendiente si cambia el valor de deleted
    //En caso de cambiar es porque se eliminó correctamente el vehículo
    useEffect(() => {
        
        const list = deleteItem(vehicles, deleted)
        //Actualizo el listado de vehículos
        setVehicles(list)

    }, [deleted])
    
    //Limpia el formualrio
    const clearForm = () => {
        setData({})
        setCustomSelect({
            marca:  { id:'', nombre:'' },
            modelo: { id:'', nombre:'' }
        })
    }

    //Envia los datos del formularioe
    const onSubmit = (data) => {
        
        const values = { ...data, ...customSelect }
        
        if(values.marca.id !== "" && values.modelo.id !== ""){

            setValidated(true)

            if( data.id ) {
                dispatch( startUpdatingVehicle( {...values} ) )
            }else{
                dispatch( startCreatingVehicle( {...values} ) )
            }

        }else{
            setValidated(false)
        }

    };
    
    //Llena el state data con los datos del vehículo a editar
    const handleEdit = (item) => {
        setData(item)
        setCustomSelect({
            marca: item.marca,
            modelo: item.modelo 
        })
    }
    
    //Dispara el evento que elimina un vehículo determinado
    const handleRemove = (item) => {
        dispatch( startDeletingVehicle( item ) )
    }

    //Inicializo estructura de culumnas de la tabla
    const columns = [
        {
            name: 'Placa',
            selector: 'placa',
            sortable: true,
        },
        {
            name: 'Marca',
            selector: 'marca.nombre',
            sortable: true,
            cell: row => (
                <div>
                    { row.marca.nombre }
                </div>
            )         
        },
        {
            name: 'Modelo',
            selector: 'modelo.nombre',
            sortable: true,
            cell: row => (
                <div>
                    { row.modelo.nombre }
                </div>
            ) 
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
                            <Form 
                                validated={validated}
                                data={data} 
                                brands={brands} 
                                categories={categories} 
                                models={models} 
                                setModels={setModels} 
                                onSubmit={onSubmit}
                                customSelect={customSelect} 
                                setCustomSelect={setCustomSelect}
                            /> 
                        </div>
                    </div>
                </div>
                <div className="col-lg-7 col-xs-12 col-sm-12">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">Listado de Vehículos</h4>
                            <hr/>
                            <DataTableExtensions
                                columns={columns}
                                data={ vehicles }>
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
