import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import DataTable from 'react-data-table-component'
import Select from 'react-select'

import { FormItems } from './formItems'
import { useEffect } from 'react'

import { startLoadingOutputs } from '../../actions/outputs'
import { startLoadingSigleWorkdays } from '../../actions/workdays'

import { getInfoVehiculo, prepareOptionsPlaca } from '../../helpers/dataArray'

export const Inputs = () => {

    const dispatch = useDispatch()

    const [items, setItems] = useState([])
    const clientes = []

    const { sesionCompany } = useSelector(state => state.auth)
    const { model: workday } = useSelector(state => state.workdays)
    const { loaded: outputs } = useSelector(state => state.outputs)

    /*****States */
    const [ infoVehiculo, setInfoVehiculo] = useState({
        marca:"",
        modelo:"",
        color:"",
        conductor: {
            rif:"",
            nombre:"",
            telefono:""
        },
        ayudante: {
            rif:"",
            nombre:"",
            telefono:""
        }
    })

    const [ optionsVehicles, setOptionsVehicles] = useState({})

    const [ idCustomer, setIdCustomer] = useState({
        value:'',
        label:'Seleccione un cliente'
    })
    
    const [ idVehiculo, setIdVehiculo] = useState({
        value:'',
        label:'Seleccione un vehiculo'
    })

    //Inicializo estructura de culumnas de la tabla de productos
    const columns = [
        { name: '#', selector: 'i'},
        { name: 'Producto', selector: 'producto_text'},
        { name: 'Presentación', selector: 'presentacion_text'},
        { name: 'Cantidad', selector: 'cantidad'},
        { name: 'Subtotal', selector: 'subtotal'},
        { name: 'Medida', selector: 'medida'},
    ]

    /***** Effects *****/
    useEffect(() => {
        /****Dispara la función para obtener las salidas ****/
        if(sesionCompany && workday){
            dispatch( startLoadingOutputs( sesionCompany.id, workday.id ) )
        }
    }, [sesionCompany,workday])

    useEffect(() => {
        
        /****Dispara la función para obtener la jornada ****/
        dispatch( startLoadingSigleWorkdays() )

    }, [])
    
    useEffect(() => {
        let vehiculos = outputs.map( item => item.vehiculo )
        const options = prepareOptionsPlaca( vehiculos )
        setOptionsVehicles( options )
    }, [outputs])

    const handleChangingPlaca = (input) => {
        if(input){
            const item = getInfoVehiculo( outputs, input.label )
            setIdVehiculo(input)

            setInfoVehiculo({
                ...infoVehiculo,
                marca: item[0].vehiculo.marca.nombre,
                modelo: item[0].vehiculo.modelo.nombre, 
                color: item[0].vehiculo.color,
                conductor: {
                    rif: item[0].conductor.rif,
                    nombre: item[0].conductor.nombre + " " + item[0].conductor.apellido,
                    telefono: item[0].conductor.telefono,
                },
                ayudante: {
                    rif: item[0].ayudante.rif,
                    nombre: item[0].ayudante.nombre + " " + item[0].ayudante.apellido,
                    telefono: item[0].ayudante.telefono,
                }
            })
        }
    }

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
                                <input name="fecha" type="date" className="form-control"/>
                            </div>
                        </div>
                        <div className="col-lg-3">
                            <div class="form-group">
                                <label class="control-label">Retorno</label>
                                <input name="retorno" type="text" className="form-control" />
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
                                <Select name="cliente" value={ idCustomer } options={ clientes } />
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
                                <Select name="vehiculo" onChange={handleChangingPlaca} value={ idVehiculo } options={ optionsVehicles } />
                            </div>
                        </div>    
                        <div className="col-lg-3">
                            <div class="form-group">
                                <label class="control-label">Marca</label>
                                <input type="text" disabled value={ infoVehiculo.marca } className="form-control"/>
                            </div>
                        </div>
                        <div className="col-lg-3">
                            <div class="form-group">
                                <label class="control-label">Modelo</label>
                                <input type="text" disabled value={ infoVehiculo.modelo } className="form-control"/>
                            </div>
                        </div>
                        <div className="col-lg-3">
                            <div class="form-group">
                                <label class="control-label">Color</label>
                                <input type="text" disabled value={ infoVehiculo.color } className="form-control"/>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-4">
                            <div class="form-group">
                                <label class="control-label">Cédula/Pasaporte</label>
                                <input type="text" disabled value={ infoVehiculo.conductor.rif } className="form-control"/>
                            </div>
                        </div>   
                        <div className="col-lg-4">
                            <div class="form-group">
                                <label class="control-label">Nombre del Conductor</label>
                                <input type="text" disabled value={ infoVehiculo.conductor.nombre } className="form-control"/>
                            </div>
                        </div>   
                        <div className="col-lg-4">
                            <div class="form-group">
                                <label class="control-label">Teléfono</label>
                                <input type="text" disabled value={ infoVehiculo.conductor.telefono } className="form-control"/>
                            </div>
                        </div>   
                    </div>
                    <div className="row">
                        <div className="col-lg-4">
                            <div class="form-group">
                                <label class="control-label">Cédula/Pasaporte</label>
                                <input type="text" disabled value={ infoVehiculo.ayudante.rif } className="form-control"/>
                            </div>
                        </div>   
                        <div className="col-lg-4">
                            <div class="form-group">
                                <label class="control-label">Nombre del Ayudante</label>
                                <input type="text" disabled value={ infoVehiculo.ayudante.nombre } className="form-control"/>
                            </div>
                        </div>   
                        <div className="col-lg-4">
                            <div class="form-group">
                                <label class="control-label">Teléfono</label>
                                <input type="text" disabled value={ infoVehiculo.ayudante.telefono } className="form-control"/>
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
