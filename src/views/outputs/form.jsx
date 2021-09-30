import React, { useState, useEffect } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { useForm } from "react-hook-form"
import { Link, useParams } from 'react-router-dom'
import Select from 'react-select'
import moment from 'moment';
import 'moment/locale/es';
import Swal from 'sweetalert2'

import data from '../../data/municipios.json'

import { startLoadingVehicles } from '../../actions/vehicles'
import { startLoadingPeople } from '../../actions/people'
import { startLoadingSigleWorkdays } from '../../actions/workdays'
import { startCreatingOutput, startLoadingOutputs, startLoadingItem, startUpdatingOutput } from '../../actions/outputs'
import { 
    getItem,
    prepareOptionsItems, 
    prepareOptionsPlaca, 
    prepareOptionsRif } from '../../helpers/dataArray'
import { validatedVehiculo, validateOutputs } from '../../helpers/checking';
import { ucFirstString } from '../../helpers/common';

let municipioItems = data.municipios.map(item => item.municipio);

export const Form = (props) => {
    
    let { id } = useParams()
    const dispatch = useDispatch()

    const { role, sesionCompany } = useSelector(state => state.auth)
    const { loaded: vehicles } = useSelector(state => state.vehicles)
    const { loaded: people } = useSelector(state => state.people)
    const { model: workday } = useSelector(state => state.workdays)
    const { model, loaded: outputs, created, updated } = useSelector(state => state.outputs)

    const [ itemsVehicles, setItemsVehicles] = useState([])
    const [ itemsPeople, setItemsPeople] = useState([])

    const municipios = prepareOptionsItems(municipioItems)

    /**** States ****/
    const [ inputs, setInputs ] = useState({
        marca:'',
        modelo:'',
        color:''
    })
    
    const [ conductor, setConductor ] = useState({
        id:'',
        nombre:'',
        apellido:'',
        telefono:''
    })
    
    const [ ayudante, setAyudante ] = useState({
        id:'',
        nombre:'',
        apellido:'',
        telefono:''
    })
    
    const [ responsable, setResponsable ] = useState({
        id:'',
        nombre:'',
        apellido:'',
        telefono:''
    })

    const [ idMunicipio, setIdMunicipio] = useState({
        value:'',
        label:'Seleccione un origen'
    })

    const [ idVehicle, setIdVehicle] = useState({
        value:'',
        label:'Seleccione un vehículo'
    })
    
    const [ idConductor, setIdConductor] = useState({
        value:'',
        label:'Seleccione un conductor'
    })
    
    const [ idAyudante, setIdAyudante] = useState({
        value:'',
        label:'Seleccione un ayudante'
    })
 
    const [ idResponsable, setIdResponsable] = useState({
        value:'',
        label:'Seleccione un responsable'
    })

    /***** Effects *****/
    useEffect(() => {
        /****Dispara la función para obtener las salidas ****/
        if(sesionCompany && workday){
            dispatch( startLoadingOutputs( sesionCompany.id, workday.id ) )
        }
    }, [sesionCompany,workday])
    
    useEffect(() => {
        
        if(model !== null){
            setIdMunicipio({ value: model?.origen?.id, label: model?.origen?.nombre})
            setIdConductor({ value: model?.conductor?.id, label: model?.conductor?.rif})
            setIdAyudante({ value: model?.ayudante?.id, label: model?.ayudante?.rif})
            setIdResponsable({ value: model?.responsable?.id, label: model?.responsable?.rif})
            setIdVehicle({ value: model?.vehiculo?.id, label: model?.vehiculo?.placa})
        }
    }, [model])

    useEffect(() => {
        
        /****Dispara la función para obtener listado de vehículos ****/
        dispatch( startLoadingVehicles() )

        /****Dispara la función para obtener listado de personas ****/
        dispatch( startLoadingPeople() )

        /****Dispara la función para obtener la jornada ****/
        dispatch( startLoadingSigleWorkdays() )

        if(id !== undefined && role == "Super_Role"){
            dispatch( startLoadingItem( id ) );
        }else if(id !== undefined){
            Swal.fire('Error', 'Salida no encontrada','error')
            props.history.push('/outputs')
        }

    }, [])

    /***** Cuando ya se tienen los vehículos cargados *****/
    useEffect(() => {
        
        const options = prepareOptionsPlaca( vehicles )
        setItemsVehicles( options )

    }, [vehicles])
    
    useEffect(() => {
        
        const options = prepareOptionsRif( people )
        setItemsPeople( options )

    }, [people])

    /***** Cuando  ay se ha seleccionado un vehículos *****/
    useEffect(() => {

        if(idMunicipio.value !== ""){
            setValue("origen", {
                id: idMunicipio.value,
                nombre: idMunicipio.label
            })
            setError("origen", "")
        }

    }, [idMunicipio])

    useEffect(() => {

        if(idVehicle.value !== ""){

            const info = getItem(vehicles, idVehicle.value)    
            setInputs({ 
                marca: info?.marca?.nombre, 
                modelo: info?.modelo?.nombre,
                color: info?.color 
            })

            setValue("vehiculo", {
                id: info.id,
                placa: info.placa,
                marca: { id: info?.marca?.id, nombre: info.marca?.nombre }, 
                modelo: { id: info?.modelo?.id, nombre: info.modelo?.nombre }, 
                color: info.color 
            })

            setError("vehiculo","")
        }

    }, [idVehicle])

    useEffect(() => {
        
        if(idConductor.value){
            
            const { rif, nombre, apellido, telefono } = getItem(people, idConductor.value)

            setConductor({ 
                id: idConductor.value,
                nombre, 
                apellido,
                telefono 
            })

            setValue("conductor", {
                id: idConductor.value,
                rif,
                nombre,
                apellido,
                telefono 
            })

            setError("conductor","")
        }

    }, [idConductor])

    useEffect(() => {
        
        if(idAyudante.value){

            const { rif, nombre, apellido, telefono } = getItem(people, idAyudante.value)
            
            setAyudante({ 
                nombre, 
                apellido,
                telefono 
            })

            setValue("ayudante", {
                id: idAyudante.value,
                rif,
                nombre,
                apellido,
                telefono 
            })

            setError("ayudante","")
        }

    }, [idAyudante])
    
    useEffect(() => {
        
        if(idResponsable.value){

            const { rif, nombre, apellido, telefono } = getItem(people, idResponsable.value)
            
            setResponsable({ 
                nombre, 
                apellido,
                telefono 
            })

            setValue("responsable", {
                id: idResponsable.value,
                rif,
                nombre,
                apellido,
                telefono 
            })

            setError("responsable","")
        }

    }, [idResponsable])

    useEffect(() => {
        
        if(created){
            //Limpio el formulario        
            clearForm()
            //Actualizo el listado de vehículos
            dispatch( startLoadingOutputs(sesionCompany.id, workday.id) )
        }

    }, [created])
    
    useEffect(() => {
        
        //Actualizo el listado de vehículos
        if(updated){
            dispatch( startLoadingOutputs(sesionCompany.id, workday.id) )
        }

    }, [updated])

    /***** Fin Effects *****/

    /***** Eventos *****/
    /***** Cuando cambia el select de vehículo *****/
    const handleChangingPlaca = (input) => {
        
        if(input){
            setIdVehicle(input)            
        }else{
            setIdVehicle({ value:"", label:"Seleccione un vehículo"})            
        }
    }
    /***** Cuando cambia el select de conductor *****/
    const handleChangingConductor = (input) => {
        if(input){
            setIdConductor(input)
        } else {
            setIdConductor({value:"", label: "Seleccione un conductor"})
        }
    }
    
    /***** Cuando cambia el select de ayudante *****/
    const handleChangingAyudante = (input) => {
        if(input){
            setIdAyudante(input)
        } else {
            setIdAyudante({value:"", label: "Seleccione un ayudante"})
        }
    }
   
    /***** Cuando cambia el select de resposanble *****/
    const handleChangingResponsable = (input) => {
        if(input){
            setIdResponsable(input)
        } else {
            setIdResponsable({value:"", label: "Seleccione un responsable"})
        }
    }

    /***** Cuando cambia el select de origen */
    const handleChangingMunicipio = (input) => {
        if(input){
            setIdMunicipio(input)
        }else{
            setIdMunicipio({value:'', label: 'Seleccione un origen'}) 
        }
    }

    /*****Funcion para limpiar el  formulario *****/
    const clearForm = () => {
        /****Limipa los campos de tipo select */
        setIdMunicipio({ value:"", label:"Seleccione un origen" })
        setIdVehicle({ value:"", label:"Seleccione un vehiculo" })
        setIdConductor({ value:"", label:"Seleccione un conductor" })
        setIdAyudante({ value:"", label:"Seleccione un ayudante" })
        setIdResponsable({ value:"", label:"Seleccione un responsable" })
        
        /****Limpia los campos de tipo text */
        setInputs({ 
            marca: "",
            modelo: "",
            color: ""
        })
        
        setConductor({ 
            nombre: "",
            apellido: "",
            telefono: ""
        })
        
        setAyudante({ 
            nombre: "",
            apellido: "",
            telefono: ""
        })
        
        setResponsable({ 
            nombre: "",
            apellido: "",
            telefono: ""
        })
    }
    
    /***** Fin Eventos *****/

    const { register, formState: { errors }, handleSubmit, setValue, setError, reset } = useForm();

    //Envia los datos del formularioe
    const onSubmit = async (data) => {
        
        let output = new Date(workday.fecha_salida)
        let today = new Date()
        
        let anio = today.getFullYear()
        let month = today.getMonth() + 1
        let day = today.getDate()

        month = (month < 10)? "0"+month:month
        day = (day < 10)? "0"+day:day

        let date = anio +"-"+ month+"-"+day
        
        if(date <= workday.fecha_salida){
            //Validar que el  vehiculo no haya sido registrado
            //mas de 2 veces en esta jornada
            const validated = await validatedVehiculo(workday.id, data.vehiculo.placa, id)
            
            if(validated){
                if(data.conductor.id !== data.ayudante.id){
                    
                    let values = { 
                        jornada: workday,
                        importador: sesionCompany,
                        estado: "Activa",
                        fecha: new Date(),
                        ...data,
                        id:(id)?id:""
                    }
                    
                    const validated = validateOutputs( outputs, sesionCompany, data, id )
                    
                    if(validated == "Success"){
                        if(id){
                            dispatch( startUpdatingOutput( {...values}, role ) )
                        }else{
                            dispatch( startCreatingOutput( {...values} ) )
                        }
                    }else{

                        let msg = ""
                        if(validated == "Err 001"){
                            msg = "Su empresa ha alcanzado el limite de vehiculos permitidos"
                        } else {
                            msg = validated
                        }

                        Swal.fire({
                            title: 'Error',
                            html: msg,
                            icon: 'warning'
                        })
                    }    
                }else{
                    Swal.fire({
                        title: 'Datos duplicados',
                        html: `El conductor y ayudante no pueden ser los mismos`,
                        icon: 'warning'
                    })
                }
            }else{
                Swal.fire({
                    title: 'Error vehículo',
                    html: `El vehículo con placa: <b>${ data.vehiculo.placa }</b> fue registrados dos veces con otras empresas, elija otro vehículo`,
                    icon: 'warning'
                })
            }
        }else{
            Swal.fire({
                title: 'Fecha Inválida',
                html: `La fecha válida para registrar la salida es: <b>${ moment(workday.fecha_salida).format("L") }</b>`,
                icon: 'warning'
            })
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            { workday !== null && workday.estado == "Abierta" &&
                <>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="card">
                            <div className="card-body">
                                <Link to="/outputs" className="btn btn-primary pull-right mt-4" title="Ir al listado de guias">
                                    <i className="fa fa-list"></i> Ir al listado                        
                                </Link>
                    
                                <legend>Datos de Jornada</legend>
                                <div className="table-responsive">
                                    <table className="table">
                                        <tbody>
                                            <tr>
                                                <td> Inicio </td>
                                                <td>  { moment(workday.fecha_inicio).format("DD-MM-YYYY") }</td>
                                            </tr> 
                                            <tr>
                                                <td> Fin </td>
                                                <td> { moment(workday.fecha_fin).format("DD-MM-YYYY") } </td>
                                            </tr>
                                            <tr>
                                                <td> Días de salida</td>
                                                <td> { ucFirstString(moment(workday.fecha_salida).format("dddd")) } </td>
                                            </tr>                            
                                            <tr>
                                                <td> Días de entrada</td>
                                                <td>
                                                    { workday.fecha_entradas.map( item => {
                                                        return ucFirstString(moment(item).format("dddd")) +","
                                                    }) }
                                                </td>
                                            </tr>                            
                                        </tbody>
                                    </table>
                                </div>
                            </div>    
                        </div>    
                    </div>
                </div>
                <div className="card">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-lg-4">
                                <div className="form-group">
                                    <label className="control-label">Origen</label>
                                    <Select name="origen" value={idMunicipio} {...register("origen", { required: true } )} onChange={handleChangingMunicipio} options={municipios} />
                                    { errors.origen?.type === 'required' && <span className="text-danger"> Este campo es obligatorio</span>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    {/***** Div Vehiculo*****/}
                    <div className="col-lg-12">
                        <div className="card">
                            <div className="card-body">
                                <legend>Datos de Vehículo</legend>
                                <hr />
                                <div className="row">
                                    <div className="col col-lg-3">
                                        <label className="control-label">Placa</label>
                                        <Select name="vehiculo" value={ idVehicle } {...register("vehiculo", { required: true } )} onChange={ handleChangingPlaca } options={itemsVehicles} />
                                        { errors?.vehiculo?.type === 'required' &&  (<span className="text-danger">Este campo es requerido</span>) }
                                    </div>
                                    <div className="col col-lg-3">
                                        <label className="control-label">Marca</label>
                                        <input type="text" value={ inputs.marca } disabled className="form-control"/>
                                    </div>
                                    <div className="col col-lg-3">
                                        <label className="control-label">Modelo</label>
                                        <input value={ inputs.modelo } type="text" disabled className="form-control"/>
                                    </div>
                                    <div className="col col-lg-3">
                                        <label className="control-label">Color</label>
                                        <input value={ inputs.color } type="text" disabled className="form-control"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/***** Fin Div Vehiculo*****/}
                    {/***** Div Conductor*****/}
                    <div className="col-lg-12">
                        <div className="card">
                            <div className="card-body">
                                <legend>Datos de Conductor</legend>
                                <hr />
                                <div className="row">
                                    <div className="col-lg-3">
                                        <label className="control-label">Cédula</label>
                                        <Select name="conductor" value={ idConductor } {...register("conductor", { required: true } )} onChange={ handleChangingConductor } options={ itemsPeople } />
                                        { errors?.conductor?.type === 'required' &&  (<span className="text-danger">Este campo es requerido</span>) }
                                    </div>
                                    <div className="col-lg-3">
                                        <label className="control-label">Nombre</label>
                                        <input value={ conductor.nombre } type="text" disabled className="form-control"/>
                                    </div>
                                    <div className="col-lg-3">
                                        <label className="control-label">Apellido</label>
                                        <input value={ conductor.apellido } type="text" disabled className="form-control"/>
                                    </div>
                                    <div className="col-lg-3">
                                    <label className="control-label">Teléfono</label>
                                    <input value={ conductor.telefono } type="text" disabled className="form-control"/>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/***** Fin Div Conductor*****/}
                    {/***** Div Ayudante*****/}
                    <div className="col-lg-12">
                        <div className="card">
                            <div className="card-body">
                                <legend>Datos de Ayudante</legend>
                                <hr />
                                <div className="row">
                                    <div className="col-lg-3">
                                        <label className="control-label">Cédula</label>
                                        <Select name="ayudante" value={ idAyudante } {...register("ayudante", { required: true } )} onChange={ handleChangingAyudante } options={ itemsPeople } />
                                        { errors?.ayudante?.type === 'required' &&  (<span className="text-danger">Este campo es requerido</span>) }
                                    </div>
                                    <div className="col-lg-3">
                                        <label className="control-label">Nombre</label>
                                        <input value={ ayudante.nombre } type="text" disabled className="form-control"/>
                                    </div>
                                    <div className="col-lg-3">
                                        <label className="control-label">Apellido</label>
                                        <input value={ ayudante.apellido } type="text" disabled className="form-control"/>
                                    </div>
                                    <div className="col-lg-3">
                                        <label className="control-label">Teléfono</label>
                                        <input value={ ayudante.telefono } type="text" disabled className="form-control"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/***** Fin Div Ayudante*****/}
                    {/***** Div Responsable*****/}
                    <div className="col-lg-12">
                        <div className="card">
                            <div className="card-body">
                                <legend>Datos de Responsable</legend>
                                <hr />
                                <div className="row">
                                    <div className="col-lg-3">
                                        <label className="control-label">Cédula</label>
                                        <Select name="responsable" value={ idResponsable } {...register("responsable", { required: true } )} onChange={ handleChangingResponsable } options={ itemsPeople } />
                                        { errors?.responsable?.type === 'required' &&  (<span className="text-danger">Este campo es requerido</span>) }
                                    </div>
                                    <div className="col-lg-3">
                                        <label className="control-label">Nombre</label>
                                        <input value={ responsable.nombre } type="text" disabled className="form-control"/>
                                    </div>
                                    <div className="col-lg-3">
                                        <label className="control-label">Apellido</label>
                                        <input value={ responsable.apellido } type="text" disabled className="form-control"/>
                                    </div>
                                    <div className="col-lg-3">
                                        <label className="control-label">Teléfono</label>
                                        <input value={ responsable.telefono } type="text" disabled className="form-control"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/***** Fin Div Ayudante*****/}
                </div>
                <div className="row">
                    <div className="col-lg-12 mb-4">
                        <div className="card">
                            <div className="card-body">
                                <button className="btn btn-default pull-right">Cancelar</button>
                                <button type="submit" className="btn btn-primary pull-right">Guardar</button>
                            </div>   
                        </div>   
                    </div>
                </div>
                </>
            }
            { !workday || workday.estado !== "Abierta" && 
                <div className="row">
                    <div className="col-lg-12">
                        <div className="alert alert-warning text-center"> Todavía no está disponible la jornada para el registro de salídas</div>
                    </div>
                </div>
            }
        </form>
    )
}
