import React, { useState } from 'react'
import DataTable from 'react-data-table-component'
import { FormItems } from './formItems'

export const Inputs = () => {

    const [items, setItems] = useState([])

    //Inicializo estructura de culumnas de la tabla de productos
    const columns = [
        { name: '#', selector: 'i'},
        { name: 'Producto', selector: 'producto_text'},
        { name: 'Presentación', selector: 'presentacion_text'},
        { name: 'Cantidad', selector: 'cantidad'},
        { name: 'Subtotal', selector: 'subtotal'},
        { name: 'Medida', selector: 'medida'},
    ]

    return (
        <>
            <div className="card">
                <div className="card-body">
                    <div className="row">
                        <div className="col-lg-3">
                            <div class="form-group">
                                <label class="control-label">Número</label>
                                <input name="numero" type="text" className="form-control"/>
                            </div>
                        </div>
                        <div className="col-lg-3">
                            <div class="form-group">
                                <label class="control-label">Fecha</label>
                                <input name="fecha" type="text" className="form-control"/>
                            </div>
                        </div>
                        <div className="col-lg-3">
                            <div class="form-group">
                                <label class="control-label">Origen</label>
                                <input name="origen" type="text" className="form-control"/>
                            </div>
                        </div>
                        <div className="col-lg-3">
                            <div class="form-group">
                                <label class="control-label">Retorno</label>
                                <input name="retorno" type="text" className="form-control"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/*** Datos Cliente/Receptor */}
            <div className="card">
                <div className="card-body">
                    <div className="row">
                        <div className="col-lg-12">
                            <legend>Datos de Cliente/Receptor</legend>
                            <hr />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-4">
                            <div class="form-group">
                                <label class="control-label">RIF</label>
                                <input name="numero" type="text" className="form-control"/>
                            </div>
                        </div>
                        <div className="col-lg-8">
                            <div class="form-group">
                                <label class="control-label">Nombre/Razón Social</label>
                                <input type="text" className="form-control"/>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-4">
                            <div class="form-group">
                                <label class="control-label">Municipio</label>
                                <input type="text" className="form-control"/>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div class="form-group">
                                <label class="control-label">Parroquia</label>
                                <input type="text" className="form-control"/>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div class="form-group">
                                <label class="control-label">Dirección</label>
                                <input type="text" className="form-control"/>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-4">
                            <div class="form-group">
                                <label class="control-label">Representante - Comercio</label>
                                <input type="text" className="form-control"/>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div class="form-group">
                                <label class="control-label">Cédula / Pasaporte</label>
                                <input type="text" className="form-control"/>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div class="form-group">
                                <label class="control-label">Teléfono</label>
                                <input type="text" className="form-control"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/*** Datos de vehículo/conductor/ayudante */}
            <div className="card">
                <div className="card-body">
                    <div className="row">
                        <div className="col-lg-12">
                            <legend>Datos de Vehículo/Conductor/Ayudante</legend>
                            <hr />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-3">
                            <div class="form-group">
                                <label class="control-label">Placa</label>
                                <input type="text" className="form-control"/>
                            </div>
                        </div>    
                        <div className="col-lg-3">
                            <div class="form-group">
                                <label class="control-label">Marca</label>
                                <input type="text" className="form-control"/>
                            </div>
                        </div>
                        <div className="col-lg-3">
                            <div class="form-group">
                                <label class="control-label">Modelo</label>
                                <input type="text" className="form-control"/>
                            </div>
                        </div>
                        <div className="col-lg-3">
                            <div class="form-group">
                                <label class="control-label">Color</label>
                                <input type="text" className="form-control"/>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-4">
                            <div class="form-group">
                                <label class="control-label">Cédula/Pasaporte</label>
                                <input type="text" className="form-control"/>
                            </div>
                        </div>   
                        <div className="col-lg-4">
                            <div class="form-group">
                                <label class="control-label">Nombre del Conductor</label>
                                <input type="text" className="form-control"/>
                            </div>
                        </div>   
                        <div className="col-lg-4">
                            <div class="form-group">
                                <label class="control-label">Teléfono</label>
                                <input type="text" className="form-control"/>
                            </div>
                        </div>   
                    </div>
                    <div className="row">
                        <div className="col-lg-4">
                            <div class="form-group">
                                <label class="control-label">Cédula/Pasaporte</label>
                                <input type="text" className="form-control"/>
                            </div>
                        </div>   
                        <div className="col-lg-4">
                            <div class="form-group">
                                <label class="control-label">Nombre del Ayudante</label>
                                <input type="text" className="form-control"/>
                            </div>
                        </div>   
                        <div className="col-lg-4">
                            <div class="form-group">
                                <label class="control-label">Teléfono</label>
                                <input type="text" className="form-control"/>
                            </div>
                        </div>   
                    </div>
                </div>
            </div>
            {/**** Datos de Carga */}
            <div className="card">
                <div className="card-body">
                    <div className="row">
                        <div className="col-lg-12">
                            <FormItems/>
                         </div>   
                    </div>   
                    <div className="row">
                        <div className="col-lg-12">
                            <DataTable
                                columns={columns}
                                data={ items }/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
