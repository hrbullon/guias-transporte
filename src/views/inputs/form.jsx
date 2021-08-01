import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { useSelector, useDispatch } from 'react-redux'
import { useForm } from "react-hook-form"

import DataTable from 'react-data-table-component'
import Select from 'react-select'
import Swal from 'sweetalert2'

import { startLoadingOutputs } from '../../actions/outputs'
import { startCreatingInput } from '../../actions/inputs'
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

export const Form = (props) => {

    const dispatch = useDispatch()
    const { register, formState: { errors }, handleSubmit, setValue, setError, reset } = useForm();
    
    const [items, setItems] = useState([])
    const { created, updated } = useSelector(state => state.inputs)

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
        rif:"",
        nombre:"",
        municipio:"",
        parroquia:"",
        direccion:"",
        representante_comercio:{
            rif:"",
            nombre:"",
            telefono:""
        }
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
        { name: 'Producto', selector: 'producto.nombre'},
        { name: 'Presentación', selector: 'presentacion.presentacion'},
        { name: 'Cantidad', selector: 'cantidad'},
        { name: 'Subtotal', selector: 'subtotal'},
        { name: 'Medida', selector: 'presentacion.unidad_medida'},
        { 
            name: 'Eliminar', cell: row => (
                <i title="Eliminar" onClick={ (e) => handleDelete(row)  } className="mdi mdi-delete pointer"></i>
            )
        },

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
            console.log(outputs);
            let vehiculos = outputs.map( item => item.vehiculo )
            const options = prepareOptionsPlaca( vehiculos )
            setOptionsVehicles( options )
        }
    }, [outputs])
    
    //Está pendiente si cambia el valor de created o updated
    //En caso de cambiar es porque se creó o editó correctamente la entrada
    useEffect(() => {

        if(created !== null || updated !== null){
            props.history.push('/inputs')
        }

    }, [created,updated])

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

    useEffect(() => {

        let cliente = {}

        if(idCustomer.value !== ""){
            
            const item = getItem( companies, idCustomer.value )

            setInfoCliente({
                ...infoCliente,
                rif: item.rif,
                nombre: item.nombre,
                municipio: item.municipio,
                parroquia: item.parroquia,
                direccion: item.direccion,
                representante_comercio: { 
                    nombre:item.representante.nombre,
                    rif: item.representante.rif,
                    telefono: item.representante.telefono
                }
            })

            cliente = {
                id: idCustomer.value, 
                nombre: idCustomer.label 
            }

            //Para que no me muestre error 
            //aún cuando haya seleccionado un cliente
            //este problema es debido al paquete que se está 
            //usando para generar los campos de tipo select 
            setValue("cliente", cliente)
            setError("cliente", "")

        }else{
            cliente = {
                id: "", 
                nombre: "" 
            }
        }

    }, [idCustomer])

    useEffect(() => {
        
        let vehiculo = {}

        if(idVehiculo.value !== ""){
            
            const item = getInfoVehiculo( outputs, idVehiculo.label )
            
            setInfoVehiculo({
                ...infoVehiculo,
                placa: item[0].vehiculo.placa,
                marca: item[0].vehiculo.marca.nombre,
                modelo: item[0].vehiculo.modelo.nombre, 
                color: item[0].vehiculo.color,
                importador: item[0].importador,
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

            vehiculo = {
                id: item[0].vehiculo.id,
                placa: item[0].vehiculo.placa,
            } 

            //Para que no me muestre error 
            //aún cuando haya seleccionado un vehiculo
            //este problema es debido al paquete que se está 
            //usando para generar los campos de tipo select 
            setValue("vehiculo", vehiculo)
            setError("vehiculo", "")

        }else{
            vehiculo = {
                id: "", 
                nombre: "" 
            }
        }

    }, [idVehiculo])

    const handleAddItem = () => {

        //Obtengo el  objeto con la información del productp
        const product = getItem(productsLoaded, inputsItems.producto)
        const presentation = getItem(conversionsLoaded, inputsItems.presentacion)
        
        let rows = [ ...items ]

        let filter = rows.filter( row => row.producto.id === inputsItems.producto)
        
        if(filter.length == 0){
            const item = {
                producto: {
                    id: inputsItems.producto,
                    nombre: product.nombre
                },
                presentacion: {
                    id: inputsItems.presentacion,
                    ...presentation
                },
                cantidad: inputsItems.cantidad,
                subtotal: inputsItems.subtotal,
            }
    
            rows.push(item)
            setItems(rows)
        }else{
            Swal.fire('Error', 'No puede agregar un producto varias veces','warning')
        }
    }

    const handleDelete = (item) => {
        let rows = items
        let copy = [...rows]
        
        let filter = copy.filter( row => row.id !== item.id )
        setItems([])
        setItems(filter)
    }

    /*****End Effects *****/
    const handleChangingCliente = (input) => {
        if(input){
            setIdCustomer(input)
        }else{
            setIdCustomer({value:'',label:'Seleccione un cliente'})
        }
    }

    const handleChangingPlaca = (input) => {
        if(input){
            setIdVehiculo(input)
        }else{
            setIdVehiculo({ value:"", label:"Seleccione un vehículo"})
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

    const onSubmit = (data) => {

        let { importador } = infoVehiculo
        let vehiculo = infoVehiculo
        delete vehiculo.importador
        
        let params = {
            fecha: data.fecha,
            retorno: data.retorno,
            jornada: workday,
            token: workday.token,
            importador,
            vehiculo,
            cliente: infoCliente,
            items,
            estado:"Pendiente",

        }

        dispatch( startCreatingInput( {...params} ) )

    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="card">
                <div className="card-body">
                    <div className="col-12">
                        <Link to="/inputs" className="btn btn-primary pull-right mt-4" title="Registrar nueva guía">
                            <i className="fa fa-list"></i> Ir al listado                        </Link>
                    </div>
                    <div className="row">
                        <div className="col-lg-3">
                            <div className="form-group">
                                <label className="control-label">Número</label>
                                <input type="text" disabled className="form-control"/>
                            </div>
                        </div>
                        <div className="col-lg-3">
                            <div className="form-group">
                                <label className="control-label">Fecha</label>
                                <input name="fecha" type="date" {...register("fecha", { required: true } )} className="form-control"/>
                                { errors?.fecha?.type &&  (<span className="text-danger">Este campo es requerido</span>) }
                            </div>
                        </div>
                        <div className="col-lg-3">
                            <div className="form-group">
                                <label className="control-label">Retorno</label>
                                <input name="retorno" type="text" {...register("retorno", { required: true } )} className="form-control" />
                                { errors?.retorno?.type &&  (<span className="text-danger">Este campo es requerido</span>) }
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
                            <div className="form-group">
                                <label className="control-label">Placa</label>
                                <Select name="cliente" value={ idVehiculo } {...register("vehiculo", { required: true } )} onChange={handleChangingPlaca} options={ optionsVehicles } />
                                { errors?.vehiculo?.type &&  (<span className="text-danger">Este campo es requerido</span>) }
                            </div>
                        </div>    
                        <div className="col-lg-3">
                            <div className="form-group">
                                <label className="control-label">Marca</label>
                                <input type="text" disabled value={ infoVehiculo.marca } className="form-control"/>
                            </div>
                        </div>
                        <div className="col-lg-3">
                            <div className="form-group">
                                <label className="control-label">Modelo</label>
                                <input type="text" disabled value={ infoVehiculo.modelo } className="form-control"/>
                            </div>
                        </div>
                        <div className="col-lg-3">
                            <div className="form-group">
                                <label className="control-label">Color</label>
                                <input type="text" disabled value={ infoVehiculo.color } className="form-control"/>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-4">
                            <div className="form-group">
                                <label className="control-label">Cédula/Pasaporte</label>
                                <input type="text" disabled value={ infoVehiculo.conductor.rif } className="form-control"/>
                            </div>
                        </div>   
                        <div className="col-lg-4">
                            <div className="form-group">
                                <label className="control-label">Nombre del Conductor</label>
                                <input type="text" disabled value={ infoVehiculo.conductor.nombre } className="form-control"/>
                            </div>
                        </div>   
                        <div className="col-lg-4">
                            <div className="form-group">
                                <label className="control-label">Teléfono</label>
                                <input type="text" disabled value={ infoVehiculo.conductor.telefono } className="form-control"/>
                            </div>
                        </div>   
                    </div>
                    <div className="row">
                        <div className="col-lg-4">
                            <div className="form-group">
                                <label className="control-label">Cédula/Pasaporte</label>
                                <input type="text" disabled value={ infoVehiculo.ayudante.rif } className="form-control"/>
                            </div>
                        </div>   
                        <div className="col-lg-4">
                            <div className="form-group">
                                <label className="control-label">Nombre del Ayudante</label>
                                <input type="text" disabled value={ infoVehiculo.ayudante.nombre } className="form-control"/>
                            </div>
                        </div>   
                        <div className="col-lg-4">
                            <div className="form-group">
                                <label className="control-label">Teléfono</label>
                                <input type="text" disabled value={ infoVehiculo.ayudante.telefono } className="form-control"/>
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
                            <div className="form-group">
                                <label className="control-label">RIF</label>
                                <Select name="cliente" value={ idCustomer } {...register("cliente", { required: true } )} onChange={handleChangingCliente} options={ optionsCustomers } />
                                { errors?.cliente?.type &&  (<span className="text-danger">Este campo es requerido</span>) }
                            </div>
                        </div>
                        <div className="col-lg-8">
                            <div className="form-group">
                                <label className="control-label">Nombre/Razón Social</label>
                                <input type="text" disabled value={ infoCliente.nombre } className="form-control"/>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-4">
                            <div className="form-group">
                                <label className="control-label">Municipio</label>
                                <input type="text" disabled value={ infoCliente.municipio } className="form-control"/>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="form-group">
                                <label className="control-label">Parroquia</label>
                                <input type="text" disabled value={ infoCliente.parroquia } className="form-control"/>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="form-group">
                                <label className="control-label">Dirección</label>
                                <input type="text" disabled value={ infoCliente.direccion } className="form-control"/>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-4">
                            <div className="form-group">
                                <label className="control-label">Representante - Comercio</label>
                                <input type="text" disabled value={ infoCliente.representante_comercio.nombre } className="form-control"/>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="form-group">
                                <label className="control-label">Cédula / Pasaporte</label>
                                <input type="text" disabled value={ infoCliente.representante_comercio.rif } className="form-control"/>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="form-group">
                                <label className="control-label">Teléfono</label>
                                <input type="text" disabled value={ infoCliente.representante_comercio.telefono } className="form-control"/>
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
                            <div className="form-group">
                                <label className="control-label">Producto</label>
                                <Select name="producto" onChange={handleChangingProducto} options={optionsProducts} />
                            </div>
                        </div>
                        <div className="col-lg-3">
                            <div className="form-group">
                                <label className="control-label">Presentación</label>
                                <Select name="presentacion" onChange={handleChangingPre} options={optionsConversions} />
                            </div>
                        </div>
                        <div className="col-lg-3">
                            <div className="form-group">
                                <label className="control-label">Cantidad</label>
                                <input type="number" name="cantidad" value={ inputsItems.cantidad } onChange={ (e) => setInputsItems({...inputsItems, cantidad: e.target.value }) } className="form-control"/>
                            </div>
                        </div>
                        <div className="col-lg-3">
                            <div className="form-group">
                                <label className="control-label">Subtotal</label>
                                <input type="number" name="subtotal" value={ inputsItems.subtotal } disabled className="form-control"/>
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
            <div className="card" >
                <div className="card-body">
                    <div className="row">
                        <div className="col-lg-12">
                            <button type="button" className="btn btn-inverse pull-right">Cancelar</button>
                            <button type="submit" className="btn btn-success pull-right mr-2"> <i className="fa fa-check"></i> Guardar</button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}
