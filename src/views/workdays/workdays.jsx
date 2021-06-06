import { Fragment, useState, useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { startUpdatingWorkdays, startCreatingWorkdays, startDeletingWorkdays, startLoadingWorkdays } from '../../actions/workdays'

import Swal from "sweetalert2"
import DataTable from 'react-data-table-component'
import DataTableExtensions from 'react-data-table-component-extensions'
import 'react-data-table-component-extensions/dist/index.css'

import { Form } from "./form"
import { addItem, updateItem, deleteItem, } from "../../helpers/dataArray"

export const Workdays = () => {

    const dispatch = useDispatch()
    //Aquí se almacena el listado de jornadas
    const [workdays, setWorkdays] = useState({})
    //Estas son las variables del state que se modifican
    //Cuando se crea, edita o elimina un 
    const { loaded, created, updated, deleted } = useSelector(state => state.workdays)
    const [data, setData] = useState()
    const [entradas, setEntradas] = useState({
        items:[]
    })

    /** Obtiene el listado de jornadas **/
    useEffect(() => {
        dispatch( startLoadingWorkdays() )
    }, []) 

    //Está pendiente si cambia el valor de loaded
    //En caso de cambiar es porque se creó cargaron las jornadas
    useEffect(() => {
        setWorkdays(loaded)
    }, [loaded])

    //Está pendiente si cambia el valor de created
    //En caso de cambiar es porque se creó correctamente la jornada
    useEffect(() => {

        const list = addItem(workdays, created)
        //Actualizo el listado de jornadas
        setWorkdays(list)

    }, [created])

    //Está pendiente si cambia el valor de updated
    //En caso de cambiar es porque se editó correctamente la jornada
    useEffect(() => {
        
        const list = updateItem(workdays, updated)
        //Actualizo el listado de jornadas
        setWorkdays(list)
        //Limpio el formulario
        setData({})

    }, [updated])

    //Está pendiente si cambia el valor de deleted
    //En caso de cambiar es porque se eliminó correctamente la jornada
    useEffect(() => {
        
        const list = deleteItem(workdays, deleted)
        //Actualizo el listado de jornadas
        setWorkdays(list)

    }, [deleted])
    
    //Envia los datos del formularioe
    const onSubmit = (data) => {

        if(entradas.items.length > 0){
            
            const values = { ...data, entradas: entradas.items }

            if( data.id ) {
                dispatch( startUpdatingWorkdays( {...values} ) )
            }else{
                dispatch( startCreatingWorkdays( {...values} ) )
            }

        }else{
            Swal.fire({
                title: 'Datos requeridos',
                text: "Registre almenos una fecha de entrada",
                icon: 'warning'
            })
        }
    };
    
    //Llena el state data con los datos de la jornada a editar
    const handleEdit = (item) => {
        setData(item)
    }
    
    //Dispara el evento que elimina un jornadas determinado
    const handleRemove = (item) => {
        dispatch( startDeletingWorkdays( item ) )
    }

    //Inicializo estructura de culumnas de la tabla
    const columns = [
        {
            name: 'Inicio',
            selector: 'fecha_inicio',
            sortable: true,
        },
        {
            name: 'Fin',
            selector: 'fecha_fin',
            sortable: true,
        },
        {
            name: 'Token',
            selector: 'token',
            sortable: false,
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
                            <Form data={data} entradas={entradas} setEntradas={setEntradas} onSubmit={onSubmit}/>
                        </div>
                    </div>
                </div>
                <div className="col-lg-7 col-xs-12 col-sm-12">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">Listado de Jornadas</h4>
                            <hr/>
                            <DataTableExtensions
                                columns={columns}
                                data={ workdays }>
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