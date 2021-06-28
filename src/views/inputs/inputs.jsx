import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import DataTable from 'react-data-table-component'
import Select from 'react-select'

import { startLoadingOutputs } from '../../actions/outputs'
import { startLoadingSigleWorkdays } from '../../actions/workdays'
import { startLoadingCompanies } from '../../actions/companies'
import { startLoadingProducts } from '../../actions/products'
import { startLoadingConversions } from '../../actions/conversion'

import { 
    getItem, 
    getInfoVehiculo, 
    prepareOptionsPlaca, 
    prepareOptionsSelect, 
    prepareOptionsConversion 
    } from '../../helpers/dataArray'

export const Inputs = () => {

    const dispatch = useDispatch()

    const [items, setItems] = useState([])

    const { sesionCompany } = useSelector(state => state.auth)
    const { model: workday } = useSelector(state => state.workdays)
    const { loaded: outputs } = useSelector(state => state.outputs)
    const { loaded: companies } = useSelector(state => state.companies)
    const { loaded: productsLoaded } = useSelector(state => state.products);
    const { loaded: conversionsLoaded } = useSelector(state => state.conversions);
    
    /*****States */
    const [ inputsItems, setInputsItems ] = useState({
        producto:"",
        presentacion:"",
        cantidad:"",
        subtotal:""
    })

    const [ infoCliente, setInfoCliente] = useState({
        nombre:"",
        municipio:"",
        parroquia:"",
        direccion:"",
        representante_comercio_nombre:"",
        representante_comercio_rif:"",
        representante_comercio_telefono:"",
    })

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
    const [ optionsCustomers, setOptionsCustomers] = useState({})
    const [ optionsProducts, setOptionsProducts] = useState({})
    const [ optionsConversions, setOptionsConversions] = useState({})

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

        /****Dispara la función para obtener clientes ****/
        dispatch( startLoadingCompanies("TYPE_CUSTOMER") )

        //Obtengo los datos de los conductores y productos
        dispatch( startLoadingProducts() )
        
        //Obtengo los datos de las presentaciones de los productos
        dispatch( startLoadingConversions() )


    }, [])
    
    useEffect(() => {
        if(outputs){
            let vehiculos = outputs.map( item => item.vehiculo )
            const options = prepareOptionsPlaca( vehiculos )
            setOptionsVehicles( options )
        }
    }, [outputs])
    
    useEffect(() => {
        if(companies){
            let items = []
            companies.map( item => {
                items.push({ value: item.id, label: `${item.rif} ${item.nombre}` }) 
            })
            setOptionsCustomers(items)
        }
    }, [companies])

    useEffect(() => {
        const options = prepareOptionsSelect( productsLoaded )
        setOptionsProducts( options )
    }, [productsLoaded])

    useEffect(() => {
        const options = prepareOptionsConversion( conversionsLoaded )
        setOptionsConversions( options )
    }, [conversionsLoaded])
    
    useEffect(() => {
        //Si el usuario seleccionó una presentación
        //Realiza el cálculo del subtotal
        if(inputsItems.presentacion !== ""){

            const presentation = getItem(conversionsLoaded, inputsItems.presentacion)
            const subtotal = inputsItems.cantidad * parseFloat(presentation.contenido)
            setInputsItems({
                ...inputsItems,
                subtotal
            })
        }

    }, [inputsItems.cantidad])


    const handleAddItem = () => {

        //Obtengo el  objeto con la información del productp
        const product = getItem(productsLoaded, inputsItems.producto)
        const presentation = getItem(conversionsLoaded, inputsItems.presentacion)
        
        let rows = [ ...items ]
        
        const item = {
            i: ( items.length + 1),
            producto: inputsItems.producto,
            producto_text: product.nombre,
            presentacion: inputsItems.presentacion,
            presentacion_text: presentation.presentacion,
            cantidad: inputsItems.cantidad,
            subtotal: inputsItems.subtotal,
            medida: presentation.unidad_medida
        }

        rows.push(item)
        setItems(rows)
    }

    /*****End Effects *****/
    const handleChangingCliente = (input) => {
        if(input){
            const item = getItem( companies, input.value )
            setIdCustomer(input)
            setInfoCliente({
                ...infoCliente,
                nombre: item.nombre,
                municipio: item.municipio,
                parroquia: item.parroquia,
                direccion: item.direccion,
                representante_comercio_nombre: item.representante.nombre,
                representante_comercio_rif: item.representante.rif,
                representante_comercio_telefono: item.representante.telefono
            })
        }
    }

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

    const handleChangingProducto = (input) => {
        if(input){
            setInputsItems({
                ...inputsItems,
                producto: input.value
            })
        }
    }

    const handleChangingPre = (input) => {
        if(input){
            setInputsItems({
                ...inputsItems,
                presentacion: input.value
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
                                <Select name="cliente" value={ idCustomer } onChange={handleChangingCliente} options={ optionsCustomers } />
                            </div>
                        </div>
                        <div className="col-lg-8">
                            <div class="form-group">
                                <label class="control-label">Nombre/Razón Social</label>
                                <input type="text" disabled value={ infoCliente.nombre } className="form-control"/>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-4">
                            <div class="form-group">
                                <label class="control-label">Municipio</label>
                                <input type="text" disabled value={ infoCliente.municipio } className="form-control"/>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div class="form-group">
                                <label class="control-label">Parroquia</label>
                                <input type="text" disabled value={ infoCliente.parroquia } className="form-control"/>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div class="form-group">
                                <label class="control-label">Dirección</label>
                                <input type="text" disabled value={ infoCliente.direccion } className="form-control"/>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-4">
                            <div class="form-group">
                                <label class="control-label">Representante - Comercio</label>
                                <input type="text" disabled value={ infoCliente.representante_comercio_nombre } className="form-control"/>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div class="form-group">
                                <label class="control-label">Cédula / Pasaporte</label>
                                <input type="text" disabled value={ infoCliente.representante_comercio_rif } className="form-control"/>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div class="form-group">
                                <label class="control-label">Teléfono</label>
                                <input type="text" disabled value={ infoCliente.representante_comercio_telefono } className="form-control"/>
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
                        <div className="col-lg-3">
                            <div class="form-group">
                                <label class="control-label">Producto</label>
                                <Select name="producto" onChange={handleChangingProducto} options={optionsProducts} />
                            </div>
                        </div>
                        <div className="col-lg-3">
                            <div class="form-group">
                                <label class="control-label">Presentación</label>
                                <Select name="presentacion" onChange={handleChangingPre} options={optionsConversions} />
                            </div>
                        </div>
                        <div className="col-lg-3">
                            <div class="form-group">
                                <label class="control-label">Cantidad</label>
                                <input type="number" name="cantidad" value={ inputsItems.cantidad } onChange={ (e) => setInputsItems({...inputsItems, cantidad: e.target.value }) } class="form-control"/>
                            </div>
                        </div>
                        <div className="col-lg-3">
                            <div class="form-group">
                                <label class="control-label">Subtotal</label>
                                <input type="number" name="subtotal" value={ inputsItems.subtotal } disabled class="form-control"/>
                            </div>
                        </div>
                        <div className="col-lg-12 pt-4">
                            <button type="button" onClick={ handleAddItem } className="btn btn-primary pull-right">AGREGAR AL LISTADO</button>
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
