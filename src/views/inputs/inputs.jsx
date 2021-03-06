import React, { useState,useEffect, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, Link } from 'react-router-dom'

import DataTable from 'react-data-table-component'
import DataTableExtensions from 'react-data-table-component-extensions'
import 'react-data-table-component-extensions/dist/index.css'

import { startCancelingInput, startLoadingInputs } from '../../actions/inputs'
import { startLoadingSigleWorkdays } from '../../actions/workdays'

export const Inputs = (props) => {

    const dispatch = useDispatch()

    const { role, sesionCompany } = useSelector(state => state.auth)
    const { model: workday } = useSelector(state => state.workdays)
    const { loaded: inputs, updated } = useSelector(state => state.inputs)
    const [ workDayId, setWorkDayId] = useState(null)

    //Inicializo estructura de culumnas de la tabla
    const columns = [
        {
            name: 'Código',
            selector: 'codigo',
            sortable: true,
        },
        {
            name: 'Importador',
            selector: 'importador.nombre',
            sortable: true,
        },
        {
            name: 'RIF',
            selector: 'importador.rif',
            sortable: true,
        },
        {
            name: 'Placa',
            selector: 'vehiculo.placa',
            sortable: true,
        },
        {
            name: 'Cliente',
            selector: 'cliente.nombre',
            sortable: true,
        },
        {
            name: 'RIF',
            selector: 'cliente.rif',
            sortable: true,
        },
        {
            name: 'Estado',
            sortable: true,
            cell: row => (
                <span className={ (row.estado == "Pendiente")? "waiting" : (row.estado == "Cancelada")? "closed" : "completed" }>{row.estado}</span>
            )
        },
        {
            name: 'Acciones',
            sortable: false,
            right: true,
            cell: row => (
                <div> 
                    <i title="Ver" onClick={ (e) => handleShow(row)  } className="mdi mdi-eye pointer mr-2"></i>
                    { role == "Super_Role" || role == "Administrador_Role" &&
                        <>
                            <Link to={`/inputs/update/${row.id}`}><i title="Editar" className="mdi mdi-pencil pointer mr-2"></i></Link>
                            <i title="Eliminar" onClick={ (e) => handleCancel(row)  } className="mdi mdi-delete pointer"></i>
                        </>
                    }
                </div>)    
        }
    ]

    /***** Effects *****/
    useEffect(() => {
        //Capturando manualmente el id de la url        
        var pathname = props.location.pathname
        var split = pathname.split("/")
        var workdayId = ""

        //Si es mayor a 2 es porque recibió el parámetro
        if(split.length > 2){
            workdayId = split[2]
            setWorkDayId(workdayId)
        }else{
            dispatch( startLoadingSigleWorkdays() )
        }
    }, [])

    useEffect(() => {
        if(workday){
            setWorkDayId(workday?.id)
        }
    }, [workday])

    useEffect(() => {
        if(workDayId && role){
            /****Dispara la función para obtener las entradas ****/
            dispatch( startLoadingInputs( sesionCompany?.id, workDayId, role ))
        }
    }, [workDayId, role])

    const handleShow = (item) => {
        window.open(`/inputs/view/${item.id}`,"ventana1","width=1024,height=820,scrollbars=NO") 
    }
    
    const handleCancel = (input) => {
        dispatch( startCancelingInput( input ) )
    }

    return (
        <div className="card">
            <div className="card-body">
                <div className="row">
                    <div className="col-12">
                        <Link to="/inputs/create" className="btn btn-primary pull-right mt-4" title="Registrar nueva guía">
                            <i className="fa fa-plus"></i> Nueva guía
                        </Link>
                    </div>
                    <div className="col-lg-12">
                        <h4 className="card-title">Listado de Entradas</h4>
                        <hr/>
                        <DataTableExtensions
                            columns={columns}
                            data={ inputs }>
                            <DataTable
                                pagination={ true }
                                filter={true}
                                noDataComponent="No hay datos para mostrar"/>
                        </DataTableExtensions>
                    </div>
                </div>
            </div>
        </div>
    )
}
