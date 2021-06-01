import React, { useState,useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import DataTable from 'react-data-table-component'
import DataTableExtensions from 'react-data-table-component-extensions'
import 'react-data-table-component-extensions/dist/index.css'
import { startDeletingDocument, startLoadingDocuments, startClearDocument } from '../../actions/documents'
import { Link } from 'react-router-dom'
import { deleteItem } from '../../helpers/dataArray'
import { types } from '../../types/types'

export const Documents = (props) => {

    const dispatch = useDispatch()
    //Aquí se almacena el listado de guias
    const [documents, setDocuments] = useState({})
    //Capturo los datos de guias registradas
    const { loaded, updated, created, deleted } = useSelector(state => state.documents)

    const columns = [
        {
            name: 'Número',
            selector: 'numero',
            sortable: true,
        },
        {
            name: 'Fecha',
            selector: 'fecha',
            sortable: true,
        },
        {
            name: 'Vehículo',
            selector: 'vehiculo',
            sortable: true,
        },
        {
            name: 'Conductor',
            selector: 'conductor',
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

    const handleEdit = (item) => {
        dispatch( { type: types.document, payload: item } )
        props.history.push(`/documents/update/${ item.id }`);
    }

    /***** Función que dispara el evento eliminar guía *****/
    const handleRemove = (item) => {
        dispatch( startDeletingDocument( item ) )
    }

    useEffect(() => {
        dispatch( startLoadingDocuments() )
    }, [])

    useEffect(() => {
        setDocuments(loaded)
    }, [loaded])

    useEffect(() => {
        //Si estos states no están vacío es porque vienen
        //de disparar el evento create o update, así que se deben purgar estos objetos
        if(created || updated){
            dispatch( startClearDocument() )
        }
    }, [created, updated])


    //Está pendiente si cambia el valor de deleted
    //En caso de cambiar es porque se eliminó correctamente la guía
    useEffect(() => {
        
        const list = deleteItem(documents, deleted)
        //Actualizo el listado de guias
        setDocuments(list)

    }, [deleted])

    return (
        <div className="card">
            <div className="card-body">
                <div className="row">
                    <div className="col-12">
                        <Link to="/documents/create" className="btn btn-primary pull-right mt-4" title="Registrar nueva guía"><i className="fa fa-plus"></i> Nueva guía</Link>
                    </div>
                    <div className="col-12">
                        <DataTableExtensions
                            columns={columns}
                            data={ documents }>
                            <DataTable
                                noHeader
                                pagination={ true }
                                filter={true}/>
                        </DataTableExtensions>
                    </div>    
                </div>    
            </div>    
        </div>
    )
}
