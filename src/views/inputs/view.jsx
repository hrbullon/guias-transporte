import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import DataTable from 'react-data-table-component'

import { startLoadingItem } from '../../actions/inputs';
import { Company } from '../../components/company/company';
import { Person } from '../../components/person/person';

export const View = () => {
    
    let { id } = useParams();
    const dispatch = useDispatch()
    
    const { model } = useSelector(state => state.inputs)

    const columns = [
        {
            name: 'Item',
            selector: 'i',
        },
        {
            name: 'Producto',
            selector: 'producto.nombre',
        },
        {
            name: 'Presentación',
            selector: 'presentacion.presentacion',
        },
        {
            name: 'Contenido',
            selector: 'presentacion.contenido',
        },
        {
            name: 'Unidad',
            selector: 'presentacion.unidad_medida',
        },
        {
            name: 'Cantidad',
            selector: 'cantidad',
        },
        {
            name: 'Total',
            selector: 'subtotal',
        },
    ]

    useEffect(() => {
        dispatch( startLoadingItem(id) )
    }, [])

    return (
        <>
            <div className="card">
                <div className="card-body">
                <div className="row">
                <div className="col-lg-12 mb-4">
                    <button className="btn btn-primary pull-right">Imprimir</button>
                    <button className="btn btn-primary pull-right">Descargar PDF</button>
                    <Link to="/inputs" className="btn btn-primary pull-right">
                        <i className="mdi mdi-list"></i>Ir al listado
                    </Link>
                </div>
                <div className="col-lg-12">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Numero</th>
                                <th>Origen</th>
                                <th>Retorno de Vehiculo</th>
                                <th>Fecha</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>IN0032</td>
                                <td>PARAGUACHON</td>
                                <td>MARACAIBO</td>
                                <td>11/07/2021</td>
                            </tr>
                            <Company titulo="Datos del Importador" model={model?.importador} representante={model?.importador.representante} />    
                            <Company titulo="Datos del Cliente/Receptor" model={model?.cliente} representante={model?.cliente.representante_comercio} />    
                        </tbody>
                    </table>
                    <table className="table">
                        <tbody>
                            <tr>
                                <th className="text-center table-secondary" colSpan="8">
                                    Datos del Vehículo/Conductor/Ayudante
                                </th>
                            </tr>
                            <tr>
                                <th>Marca</th>
                                <td>{ model?.vehiculo.marca }</td>
                                <th>Modelo</th>
                                <td>{ model?.vehiculo.modelo }</td>
                                <th>Placa</th>
                                <td>{ model?.vehiculo.placa }</td>
                                <th>Color</th>
                                <td>{ model?.vehiculo.color }</td>
                            </tr>
                        </tbody>
                    </table>
                    <table className="table">
                        <tbody>
                            <Person titulo="Nombre del Conductor" model={ model?.vehiculo.conductor} />
                            <Person titulo="Nombre del Ayudante" model={ model?.vehiculo.ayudante} />
                        </tbody>
                    </table>
                    <hr />
                    <DataTable
                        columns={columns}
                        subHeader={true}
                        data={ model?.items }
                        subHeaderAlign="center"
                        subHeaderComponent={<th>Datos de la Carga</th>}
                        noDataComponent="No hay datos para mostrar"
                    />
                </div>
            </div>
                </div>
            </div>
            
        </>
    )
}
