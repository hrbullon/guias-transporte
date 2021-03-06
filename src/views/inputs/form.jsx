import React, { useState, useEffect } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { useForm } from "react-hook-form"
import { useParams, Link } from 'react-router-dom'

import DataTable from 'react-data-table-component'
import Select from 'react-select'

import { startLoadingOutputs } from '../../actions/outputs'
import { 
    startCreatingInput, 
    startLoadingItem, 
    startUpdatingInput } from '../../actions/inputs'
import { startLoadingSigleWorkdays } from '../../actions/workdays'
import { startLoadingCompanies } from '../../actions/companies'
import { startLoadingProducts } from '../../actions/products'
import { startLoadingPeople } from '../../actions/people'
import { startLoadingConversions } from '../../actions/conversion'
import { startLoadingVehicles } from '../../actions/vehicles'

import { validatedVehiculoInputs } from '../../helpers/checking'

import { 
    getItem, 
    getInfoVehiculo, 
    getCompanyInfo,
    prepareOptionsPlaca, 
    prepareOptionsSelect, 
    prepareOptionsConversion, 
    prepareOptionsRif
} from '../../helpers/dataArray'
import Swal from 'sweetalert2'

export const Form = (props) => {

    let { id } = useParams()
    const dispatch = useDispatch()
    const { register, formState: { errors }, handleSubmit, setValue, setError, reset } = useForm();
    
    const { model, created, updated } = useSelector(state => state.inputs)

    const { role, sesionCompany } = useSelector(state => state.auth)
    const { model: workday } = useSelector(state => state.workdays)
    const { loaded: vehicles } = useSelector(state => state.vehicles)
    const { loaded: people } = useSelector(state => state.people)
    const { loaded: outputs } = useSelector(state => state.outputs)
    const { loaded: companies } = useSelector(state => state.companies)
    const { loaded: productsLoaded } = useSelector(state => state.products);
    const { loaded: conversionsLoaded } = useSelector(state => state.conversions);

    /****** Default Values *****/
    const defaultCustomer = {
        value:'',
        label:'Seleccione un cliente'
    }

    const customerStructure = {
        id:"",
        rif:"",
        nombre:"",
        municipio:"",
        parroquia:"",
        direccion:"",
        representante:{
            rif:"",
            nombre:"",
            telefono:""
        }
    }

    const defaultVehicle = {
        value:'',
        label:'Seleccione un vehiculo'
    }

    /******End Default Values ******/

    /*****States */
    const [items, setItems] = useState([])
    const [ itemsPeople, setItemsPeople] = useState([])

    const [ conductor, setConductor ] = useState({
        id:'',
        nombre:'',
        apellido:'',
        telefono:''
    })

    const [ inputsItems, setInputsItems ] = useState({
        producto:"",
        presentacion:"",
        cantidad:"",
        subtotal:""
    })

    const [ infoCliente, setInfoCliente] = useState(customerStructure)
    const [ infoClienteTwo, setInfoClienteTwo] = useState(customerStructure)
    const [ infoClienteThree, setInfoClienteThree] = useState(customerStructure)

    const [ infoVehiculo, setInfoVehiculo] = useState({
        id:"",
        marca:"",
        modelo:"",
        color:"",
        conductor: {
            rif:"",
            nombre:"",
            apellido:"",
            telefono:""
        },
        ayudante: {
            rif:"",
            nombre:"",
            apellido:"",
            telefono:""
        }
    })
    
    const [ infoVehiculoTras, setInfoVehiculoTras] = useState({
        id:"",
        marca:"",
        modelo:"",
        color:""
    })

    const [ optionsVehicles, setOptionsVehicles] = useState({})
    const [ optionsVehiclesTras, setOptionsVehiclesTras] = useState({})
    const [ optionsCustomers, setOptionsCustomers] = useState({})
    const [ optionsProducts, setOptionsProducts] = useState({})
    const [ optionsConversions, setOptionsConversions] = useState({})

    const [ idCustomer, setIdCustomer] = useState(defaultCustomer)
    const [ idCustomerTwo, setIdCustomerTwo] = useState(defaultCustomer)
    const [ idCustomerThree, setIdCustomerThree] = useState(defaultCustomer)
    
    const [ idVehiculo, setIdVehiculo] = useState(defaultVehicle)
    const [ idVehiculoTras, setIdVehiculoTras] = useState(defaultVehicle)
    
    const [ idConductor, setIdConductor] = useState({
        value:'',
        label:'Seleccione un conductor'
    })

    //Inicializo estructura de culumnas de la tabla de productos
    const columns = [
        { name: '#', cell: (row, index) => index+1 },
        { name: 'Producto', selector: 'producto.nombre'},
        { name: 'Presentaci??n', selector: 'presentacion.presentacion'},
        { name: 'Cantidad', selector: 'cantidad'},
        { name: 'Subtotal', selector: 'subtotal'},
        { name: 'Medida', selector: 'presentacion.unidad_medida'},
        { 
            name: 'Eliminar', cell: (row, index) => (
                <i title="Eliminar" onClick={ (e) => handleDelete(row,index)  } className="mdi mdi-delete pointer"></i>
            )
        },

    ]

    /***** Effects *****/
    useEffect(() => {
        
        /****Dispara la funci??n para obtener listado de veh??culos ****/
        dispatch( startLoadingVehicles() )

        /****Dispara la funci??n para obtener la jornada ****/
        dispatch( startLoadingSigleWorkdays() )

        /****Dispara la funci??n para obtener clientes ****/
        dispatch( startLoadingCompanies("TYPE_CUSTOMER") )

        //Obtengo los datos de los conductores y productos
        dispatch( startLoadingProducts() )

        /****Dispara la funci??n para obtener listado de personas ****/
        dispatch( startLoadingPeople() )
        
        //Obtengo los datos de las presentaciones de los productos
        dispatch( startLoadingConversions() )
            
    }, [])

    useEffect(() => {
        /****Dispara la funci??n para obtener las salidas ****/
        if(sesionCompany && workday){
            dispatch( startLoadingOutputs( sesionCompany?.id, workday.id, role ) )
        }
    }, [sesionCompany,workday])

    useEffect(() => {
        if(id !== undefined && role == "Super_Role" || role == "Administrador_Role"){
            dispatch( startLoadingItem( id ) );
        }
    }, [id,role])
 
    useEffect(() => {
        if(outputs.length > 0){
 
            let vehiculos = outputs.map( item => item.vehiculo)

            if( vehiculos.length > 0){
                const options = prepareOptionsPlaca( vehiculos )
                setOptionsVehicles( options )
            }

        }
    }, [outputs])

    /***** Cuando ya se tienen los veh??culos cargados *****/
    useEffect(() => {
        
        const options = prepareOptionsPlaca( vehicles )
        setOptionsVehiclesTras( options )

    }, [vehicles])

    useEffect(() => {
        
        const options = prepareOptionsRif( people )
        setItemsPeople( options )

    }, [people])

    useEffect(() => {
        
        if(model !== null && outputs.length > 0){
            reset({ fecha: model.fecha, retorno: model.retorno })
            setIdCustomer({ value: model?.cliente?.id, label: `${model?.cliente?.rif} ${model?.cliente?.nombre}` })
            
            if(model?.cliente_dos?.id !== ""){
                setIdCustomerTwo({ value: model?.cliente_dos?.id, label: `${model?.cliente_dos?.rif} ${model?.cliente_dos?.nombre}` })
            }
            
            if(model?.cliente_tres?.id !== ""){
                setIdCustomerThree({ value: model?.cliente_tres?.id, label: `${model?.cliente_tres?.rif} ${model?.cliente_tres?.nombre}` })
            }

            setIdVehiculo({ value: model?.vehiculo?.id, label: model?.vehiculo?.placa})
            setIdVehiculoTras({ value: model?.trasbordo?.vehiculo?.id, label: model?.trasbordo?.vehiculo?.placa})
            setIdConductor({ value: model?.trasbordo?.conductor.id, label: model?.trasbordo?.conductor?.rif })
            setItems(model.items)
        }        
    }, [model, outputs])

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
        //Si el usuario seleccion?? una presentaci??n
        //Realiza el c??lculo del subtotal
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
            const info = getCompanyInfo(item)

            if (idCustomer.value !== "") {
                setInfoCliente({
                    ...info,
                    id: idCustomer.value
                })
            }

            cliente = {
                id: idCustomer.value, 
                nombre: idCustomer.label 
            }

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

        let cliente = {}

        if(idCustomerTwo.value !== ""){
            
            const item = getItem( companies, idCustomerTwo.value )
            const info = getCompanyInfo(item)

            if (idCustomerTwo.value !== "") {
                setInfoClienteTwo({
                    ...info,
                    id: idCustomerTwo.value
                })
            }

            cliente = {
                id: idCustomerTwo.value, 
                nombre: idCustomerTwo.label 
            }

            setValue("cliente_dos", cliente)

        }else{
            cliente = {
                id: "", 
                nombre: "" 
            }
        }

    }, [idCustomerTwo])

    useEffect(() => {

        let cliente = {}

        if(idCustomerThree.value !== ""){
            
            const item = getItem( companies, idCustomerThree.value )
            const info = getCompanyInfo(item)

            if (idCustomerThree.value !== "") {
                setInfoClienteThree({
                    ...info,
                    id: idCustomerThree.value
                })
            }

            cliente = {
                id: idCustomerThree.value, 
                nombre: idCustomerThree.label 
            }

            setValue("cliente_tres", cliente)

        }else{
            cliente = {
                id: "", 
                nombre: "" 
            }
        }

    }, [idCustomerThree])

    useEffect(() => {
        
        let vehiculo = {}

        if(idVehiculo.value){
            
            const item = getInfoVehiculo( outputs, idVehiculo.label )
            
            if(item){

                setInfoVehiculo({
                    ...infoVehiculo,
                    id: idVehiculo.value,
                    placa: item[0]?.vehiculo?.placa,
                    marca: item[0]?.vehiculo?.marca?.nombre,
                    modelo: item[0]?.vehiculo?.modelo?.nombre, 
                    color: item[0]?.vehiculo?.color,
                    importador: item[0]?.importador,
                    conductor: {
                        rif: item[0]?.conductor?.rif,
                        nombre: item[0]?.conductor?.nombre,
                        apellido: item[0]?.conductor?.apellido,
                        telefono: item[0]?.conductor?.telefono,
                    },
                    ayudante: {
                        rif: item[0]?.ayudante?.rif,
                        nombre: item[0]?.ayudante?.nombre,
                        apellido:item[0]?.ayudante?.apellido,
                        telefono: item[0]?.ayudante?.telefono,
                    }
                })
    
                vehiculo = {
                    id: item[0]?.vehiculo?.id,
                    placa: item[0]?.vehiculo?.placa,
                }
    
                //Para que no me muestre error 
                //a??n cuando haya seleccionado un vehiculo
                //este problema es debido al paquete que se est?? 
                //usando para generar los campos de tipo select 
                setValue("vehiculo", vehiculo)
                setError("vehiculo", "")
            }

        }else{
            vehiculo = {
                id: "", 
                nombre: "" 
            }
        }

    }, [idVehiculo])

    useEffect(() => {
        
        let vehiculo = {}

        if(idVehiculoTras.value){
            
            const item = getItem( vehicles, idVehiculoTras.value )
            
            if(item){

                setInfoVehiculoTras({
                    ...infoVehiculoTras,
                    id: idVehiculoTras.value,
                    placa: item.placa,
                    marca: item.marca?.nombre,
                    modelo: item.modelo?.nombre, 
                    color: item.color
                })
    
                vehiculo = {
                    id: idVehiculoTras.value,
                    placa: item.placa,
                }
    
                //Para que no me muestre error 
                //a??n cuando haya seleccionado un vehiculo
                //este problema es debido al paquete que se est?? 
                //usando para generar los campos de tipo select 
                setValue("trasbordo_vehiculo", vehiculo)
                //setError("trasbordo_vehiculo", "")
            }

            

        }else{
            vehiculo = {
                id: "", 
                nombre: "" 
            }
        }

    }, [idVehiculoTras])

    useEffect(() => {
        
        if(idConductor.value){
            
            const { rif, nombre, apellido, telefono } = getItem(people, idConductor.value)

            setConductor({ 
                id: idConductor.value,
                rif,
                nombre, 
                apellido,
                telefono 
            })


            setValue("trasbordo_conductor", {
                id: idConductor.value,
                rif,
                nombre,
                apellido,
                telefono 
            })
        }

    }, [idConductor])

    const handleAddItem = () => {

        //Obtengo el  objeto con la informaci??n del productp
        const product = getItem(productsLoaded, inputsItems.producto)
        const presentation = getItem(conversionsLoaded, inputsItems.presentacion)
        
        let rows = [ ...items ]

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
    }

    const handleDelete = (item, index) => {
        let rows = items
        let copy = [...rows]
        setItems([])
        copy.splice(index, 1);
        setItems(copy)
    }

    /***** Cuando cambia el select de conductor *****/
    const handleChangingConductor = (input) => {
        if(input){
            setIdConductor(input)
        } else {
            setIdConductor({value:"", label: "Seleccione un conductor"})
        }
    }

    /*****End Effects *****/
    const handleChangingCliente = (input,e) => {
        
        var inputName = e.name

        switch (inputName) {
            case "cliente":
                    if(input){
                        setIdCustomer(input)
                    }else{
                        setIdCustomer(defaultCustomer)
                    }
                break;
            case "cliente_dos":
                    if(input){
                        setIdCustomerTwo(input)
                    }else{
                        setIdCustomerTwo(defaultCustomer)
                    }
                break;
            case "cliente_tres":
                    if(input){
                        setIdCustomerThree(input)
                    }else{
                        setIdCustomerThree(defaultCustomer)
                    }                
            break;
            default:
                break;
        }
    }
    
    const handleChangingPlaca = (input) => {
        if(input){
            setIdVehiculo(input)
        }else{
            setIdVehiculo({ value:"", label:"Seleccione un veh??culo"})
        }
    }
    
    const handleChangingPlacaTras = (input) => {
        if(input){
            setIdVehiculoTras(input)
        }else{
            setIdVehiculoTras({ value:"", label:"Seleccione un veh??culo"})
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

    const onSubmit = async (data) => {

        let { importador } = infoVehiculo
        let vehiculo = infoVehiculo
        let trasbordo = {
            vehiculo: infoVehiculoTras,
            conductor
        }

        delete vehiculo.importador

        let validateTras = true
        const validated = await validatedVehiculoInputs(workday.id, vehiculo.placa, importador)
        //Si hay un veh??culo de trasbordo
        /*if(trasbordo.vehiculo.id !== ""){
            validateTras = await validatedVehiculoInputs(workday.id, trasbordo.vehiculo.placa, importador)
        }*/

        if(validated && validateTras){

            let values = {
                fecha: data.fecha,
                retorno: data.retorno,
                jornada: workday,
                token: workday.token,
                importador,
                vehiculo,
                cliente: infoCliente,
                cliente_dos: infoClienteTwo,
                cliente_tres: infoClienteThree,
                trasbordo,
                items,
                estado:"Pendiente",
                id:(id)?id:""
            }
    
            if(id){
                dispatch( startUpdatingInput( {...values}, role ) )
            }else{
                dispatch( startCreatingInput( {...values} ) )
            }   

        }else{
            
            if(!validated){
                Swal.fire({
                    title: 'Error veh??culo',
                    html: `El veh??culo con placa: <b>${ data.vehiculo.placa }</b> fue registrados con otras empresas, elija otro veh??culo`,
                    icon: 'warning'
                }) 
            }
            
            if(!validateTras){
                Swal.fire({
                    title: 'Error veh??culo trasbordo',
                    html: `El veh??culo con placa: <b>${ data.trasbordo_vehiculo.placa }</b> fue registrados en otras entradas, elija otro veh??culo`,
                    icon: 'warning'
                }) 
            }
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="card">
                <div className="card-body">
                    <div className="col-12">
                        <Link to="/inputs" className="btn btn-primary pull-right mt-4" title="Registrar nueva gu??a">
                            <i className="fa fa-list"></i> Ir al listado                        </Link>
                    </div>
                    <div className="row">
                        <div className="col-lg-3">
                            <div className="form-group">
                                <label className="control-label">N??mero</label>
                                <input type="text" value={ model?.codigo } disabled className="form-control"/>
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
            {/*** Datos de veh??culo/conductor/ayudante */}
            <div className="card">
                <div className="card-body">
                    <div className="row">
                        <div className="col-lg-12">
                            <legend>Datos de Veh??culo/Conductor/Ayudante</legend>
                            <hr />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-3">
                            <div className="form-group">
                                <label className="control-label">Placa</label>
                                <Select name="vehiculo" value={ idVehiculo } {...register("vehiculo", { required: true } )} onChange={handleChangingPlaca} options={ optionsVehicles } />
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
                        <div className="col-lg-3">
                            <div className="form-group">
                                <label className="control-label">C??dula/Pasaporte</label>
                                <input type="text" disabled value={ infoVehiculo.conductor.rif } className="form-control"/>
                            </div>
                        </div>   
                        <div className="col-lg-3">
                            <div className="form-group">
                                <label className="control-label">Nombre del Conductor</label>
                                <input type="text" disabled value={ infoVehiculo.conductor.nombre } className="form-control"/>
                            </div>
                        </div>   
                        <div className="col-lg-3">
                            <div className="form-group">
                                <label className="control-label">Apellido del Conductor</label>
                                <input type="text" disabled value={ infoVehiculo.conductor.apellido } className="form-control"/>
                            </div>
                        </div>   
                        <div className="col-lg-3">
                            <div className="form-group">
                                <label className="control-label">Tel??fono</label>
                                <input type="text" disabled value={ infoVehiculo.conductor.telefono } className="form-control"/>
                            </div>
                        </div>   
                    </div>
                    <div className="row">
                        <div className="col-lg-3">
                            <label className="control-label">C??dula</label>
                            <input type="text" disabled value={ infoVehiculo.ayudante.rif } className="form-control"/>
                        </div>
                        <div className="col-lg-3">
                            <div className="form-group">
                                <label className="control-label">Nombre del Ayudante</label>
                                <input type="text" disabled value={ infoVehiculo.ayudante.nombre } className="form-control"/>
                            </div>
                        </div>   
                        <div className="col-lg-3">
                            <div className="form-group">
                                <label className="control-label">Apellido del Ayudante</label>
                                <input type="text" disabled value={ infoVehiculo.ayudante.apellido } className="form-control"/>
                            </div>
                        </div>   
                        <div className="col-lg-3">
                            <div className="form-group">
                                <label className="control-label">Tel??fono</label>
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
                            <legend>Datos de Cliente(s)/Receptor(es)</legend>
                            <hr />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-4">
                            <div className="form-group">
                                <label className="control-label">Cliente #1</label>
                                <Select name="cliente" value={ idCustomer } {...register("cliente", { required: true } )} onChange={handleChangingCliente} options={ optionsCustomers } />
                                { errors?.cliente?.type &&  (<span className="text-danger">Este campo es requerido</span>) }
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="form-group">
                                <label className="control-label">Cliente #2</label>
                                <Select name="cliente_dos" value={ idCustomerTwo } {...register("cliente_dos")} onChange={handleChangingCliente} options={ optionsCustomers } />
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="form-group">
                                <label className="control-label">Cliente #3</label>
                                <Select name="cliente_tres" value={ idCustomerThree } {...register("cliente_tres")} onChange={handleChangingCliente} options={ optionsCustomers } />
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
            {/*** Datos de veh??culo/conductor/ayudante Trasbordo*/}
            { model?.id &&
                <div className="card">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-lg-12">
                                <legend>Datos de Veh??culo/Conductor (Trasbordo)</legend>
                                <hr />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-3">
                                <div className="form-group">
                                    <label className="control-label">Placa</label>
                                    <Select name="trasbordo_vehiculo" value={ idVehiculoTras } {...register("trasbordo_vehiculo" )} onChange={ handleChangingPlacaTras } options={ optionsVehiclesTras } />
                                    { errors?.trasbordo_vehiculo &&  (<span className="text-danger">Este campo es requerido { console.log(errors.trasbordo_vehiculo) }</span>) }                             
                                </div>
                            </div>    
                            <div className="col-lg-3">
                                <div className="form-group">
                                    <label className="control-label">Marca</label>
                                    <input type="text" value={ infoVehiculoTras.marca } disabled className="form-control"/>
                                </div>
                            </div>
                            <div className="col-lg-3">
                                <div className="form-group">
                                    <label className="control-label">Modelo</label>
                                    <input type="text" value={ infoVehiculoTras.modelo } disabled className="form-control"/>
                                </div>
                            </div>
                            <div className="col-lg-3">
                                <div className="form-group">
                                    <label className="control-label">Color</label>
                                    <input type="text" value={ infoVehiculoTras.color } disabled className="form-control"/>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-3">
                                <label className="control-label">C??dula</label>
                                <Select name="trasbordo_conductor" value={ idConductor } {...register("trasbordo_conductor" )} onChange={ handleChangingConductor } options={ itemsPeople } />
                                { errors?.trasbordo_conductor?.type === 'required' &&  (<span className="text-danger">Este campo es requerido</span>) }
                            </div>   
                            <div className="col-lg-3">
                                <div className="form-group">
                                    <label className="control-label">Nombre del Conductor</label>
                                    <input value={ conductor.nombre } type="text" disabled className="form-control"/>
                                </div>
                            </div>   
                            <div className="col-lg-3">
                                <div className="form-group">
                                    <label className="control-label">Apellido del Conductor</label>
                                    <input value={ conductor.apellido } type="text" disabled className="form-control"/>
                                </div>
                            </div>   
                            <div className="col-lg-3">
                                <div className="form-group">
                                    <label className="control-label">Tel??fono</label>
                                    <input value={ conductor.telefono } type="text" disabled className="form-control"/>
                                </div>
                            </div>   
                        </div>
                    </div>
                </div>
            }
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
                                <label className="control-label">Presentaci??n</label>
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
