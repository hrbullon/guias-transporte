import React, { useState,useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import DataTable from 'react-data-table-component'
import DataTableExtensions from 'react-data-table-component-extensions'
import 'react-data-table-component-extensions/dist/index.css'

import { startCancelingInput, startLoadingInputs } from '../../actions/inputs'
import { startLoadingSigleWorkdays } from '../../actions/workdays'

export const Inputs = (props) => {

    const dispatch = useDispatch()

    const { sesionCompany } = useSelector(state => state.auth)
    const { model: workday } = useSelector(state => state.workdays)
    const { loaded: inputs, updated } = useSelector(state => state.inputs)

    //Inicializo estructura de culumnas de la tabla
    const columns = [
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
            selector: 'estado',
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
                    { /****** Capturo el evento click en el botón eliminar de cada fila******/ }
                    <i title="Eliminar" onClick={ (e) => handleCancel(row)  } className="mdi mdi-delete pointer"></i>
                </div>)    
        }
    ]

    /***** Effects *****/
    useEffect(() => {
        /****Dispara la función para obtener las salidas ****/
        if(sesionCompany && workday){
            dispatch( startLoadingInputs( sesionCompany.id, workday.id ) )
        }
    }, [sesionCompany,workday])

    useEffect(() => {
        
        /****Dispara la función para obtener la jornada ****/
        dispatch( startLoadingSigleWorkdays() )

    }, [])

    
    useEffect(() => {
        
        //Actualizo el listado de vehículos
        if(updated){
            dispatch( startLoadingInputs(sesionCompany.id, workday.id) )
        }

    }, [updated])

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
                                noHeader
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
