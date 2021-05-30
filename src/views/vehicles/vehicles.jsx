import { Fragment, useState, useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { startCreatingVehicle ,startUpdatingVehicle, startDeletingVehicle } from '../../actions/vehicles'

import DataTable from 'react-data-table-component'
import DataTableExtensions from 'react-data-table-component-extensions'
import 'react-data-table-component-extensions/dist/index.css'

import { Form } from "./form"
import { addItem, updateItem, deleteItem, } from "../../helpers/dataArray"
import { db } from "../../firebase/firebase-config"

export const Vehicles = () => {

    const dispatch = useDispatch()
    //Aquí se almacena el listado de vehículos
    const [vehicles, setVehicles] = useState({})
    //Estas son las variables del state que se modifican
    //Cuando se crea, edita o elimina un 
    const { created, updated, deleted } = useSelector(state => state.vehicles)
    const [data, setData] = useState()

    /** Obtiene el listado de vehiculos **/
    useEffect( async () => {

        const vehiclesSnap = await db.collection(`vehicles`).get()
        const vehicles = []

        vehiclesSnap.forEach( snap => {
            vehicles.push({
                id: snap.id,
                ...snap.data()
            })
        })

        setVehicles(vehicles)
    },[]) 

    //Está pendiente si cambia el valor de created
    //En caso de cambiar es porque se creó correctamente el vehículo
    useEffect(() => {

        const list = addItem(vehicles, created)
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
        setData({})

    }, [updated])

    //Está pendiente si cambia el valor de deleted
    //En caso de cambiar es porque se eliminó correctamente el vehículo
    useEffect(() => {
        
        const list = deleteItem(vehicles, deleted)
        //Actualizo el listado de vehículos
        setVehicles(list)

    }, [deleted])
    
    //Envia los datos del formularioe
    const onSubmit = (data) => {

        if( data.id ) {
            dispatch( startUpdatingVehicle( {...data} ) )
        }else{
            dispatch( startCreatingVehicle( {...data} ) )
        }
    };
    
    //Llena el state data con los datos del vehículo a editar
    const handleEdit = (item) => {
        setData(item)
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
            selector: 'marca',
            sortable: true,
        },
        {
            name: 'Modelo',
            selector: 'modelo',
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
