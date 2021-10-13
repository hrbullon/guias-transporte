import React, { useState,useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import DataTable from 'react-data-table-component'
import DataTableExtensions from 'react-data-table-component-extensions'
import 'react-data-table-component-extensions/dist/index.css'

import { startLoadingSigleWorkdays } from '../../actions/workdays'
import { startLoadingOutputs, startCancelingOutput } from '../../actions/outputs'

export const Outputs = (props) => {

    const dispatch = useDispatch()

    const { role, sesionCompany } = useSelector(state => state.auth)
    const { model: workday } = useSelector(state => state.workdays)
    const { loaded: outputs, updated } = useSelector(state => state.outputs)

    //Inicializo estructura de culumnas de la tabla
    const columns = [
        {
            name: 'Código',
            selector: 'codigo',
            sortable: true,
        },
        {
            name: 'Placa',
            selector: 'vehiculo.placa',
            sortable: true,
        },
        {
            name: 'Marca',
            selector: 'vehiculo.marca.nombre',
            sortable: true,
        },
        ,
        {
            name: 'Modelo',
            selector: 'vehiculo.modelo.nombre',
            sortable: true,
        },
        {
            name: 'Cédula',
            selector: 'conductor.rif',
            sortable: true,
        },
        {
            name: 'Nombre',
            sortable: true,
            cell: row => {
                return ( row.conductor.nombre + " " + row.conductor.apellido )
            }
        },
        {
            name: 'Teléfono',
            selector: 'conductor.telefono',
            sortable: true,
        },
        {
            name: 'Importador',
            selector: 'importador.nombre',
            sortable: true,
        },
        {
            name: 'Acciones',
            sortable: false,
            right: true,
            cell: row => (
                <div> 
                    { /****** Capturo el evento click en el botón ver detalle de cada fila******/ }
                    <i title="Ver" onClick={ (e) => handleShow(row)  } className="mdi mdi-eye pointer mr-2"></i>
                    { role == "Super_Role" || role == "Administrador_Role" &&
                        <>
                        <Link to={`/outputs/update/${row.id}`}><i title="Editar" className="mdi mdi-pencil pointer mr-2"></i></Link>
                        <i title="Eliminar" onClick={ (e) => handleCancel(row)  } className="mdi mdi-delete pointer"></i>
                        </>
                    }
                </div>)    
        }
    ]

    /***** Effects *****/
    useEffect(() => {
        /****Dispara la función para obtener las salidas ****/
        if(sesionCompany && workday){
            dispatch( startLoadingOutputs( sesionCompany.id, workday.id, role ) )
        }
    }, [sesionCompany,workday])

    useEffect(() => {
        
        /****Dispara la función para obtener la jornada ****/
        dispatch( startLoadingSigleWorkdays() )

    }, [])

    useEffect(() => {
        
        //Actualizo el listado de vehículos
        if(updated){
            dispatch( startLoadingOutputs(sesionCompany.id, workday.id, role) )
        }

    }, [updated])

    const handleShow = (item) => {
        window.open(`/outputs/view/${item.id}`,"ventana1","width=1024,height=820,scrollbars=NO") 
    }
    
    const handleCancel = (output) => {
        dispatch( startCancelingOutput( output ) )
    }

    return (
        <div className="card">
            <div className="card-body">
                <div className="row">
                    <div className="col-12">
                        <Link to="/outputs/create" className="btn btn-primary pull-right mt-4" title="Registrar nueva guía">
                            <i className="fa fa-plus"></i> Nueva guía
                        </Link>
                    </div>
                    <div className="col-lg-12">
                        <h4 className="card-title">Listado de Salídas</h4>
                        <hr/>
                        <DataTableExtensions
                            columns={columns}
                            data={ outputs }>
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
