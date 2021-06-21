import React, { useState, useEffect } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { useForm } from "react-hook-form"
import Select from 'react-select'
import moment from 'moment';

import data from '../../data/municipios.json'

import { startLoadingVehicles } from '../../actions/vehicles'
import { startLoadingPeople } from '../../actions/people'
import { startLoadingSigleWorkdays } from '../../actions/workdays'
import { 
    getItem, 
    prepareOptionsItems, 
    prepareOptionsPlaca, 
    prepareOptionsRif } from '../../helpers/dataArray'

let municipioItems = data.municipios.map(item => item.municipio);

export const Outputs = () => {
    
    moment.lang('es', {
        months: 'Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre'.split('_'),
        monthsShort: 'Enero._Feb._Mar_Abr._May_Jun_Jul._Ago_Sept._Oct._Nov._Dec.'.split('_'),
        weekdays: 'Domingo_Lunes_Martes_Miercoles_Jueves_Viernes_Sabado'.split('_'),
        weekdaysShort: 'Dom._Lun._Mar._Mier._Jue._Vier._Sab.'.split('_'),
        weekdaysMin: 'Do_Lu_Ma_Mi_Ju_Vi_Sa'.split('_')
      });
    const dispatch = useDispatch()

    const { company } = useSelector(state => state.auth)
    const { loaded: vehicles } = useSelector(state => state.vehicles)
    const { loaded: people } = useSelector(state => state.people)
    const { model: workday } = useSelector(state => state.workdays)

    const [ itemsVehicles, setItemsVehicles] = useState([])
    const [ itemsPeople, setItemsPeople] = useState([])

    const municipios = prepareOptionsItems(municipioItems)

    /**** States ****/
    const [data, setData] = useState()

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

    /***** Effects *****/
    useEffect(() => {
        console.log(workday)
    }, [workday])

    useEffect(() => {
        
        /****Dispara la función para obtener listado de vehículos ****/
        dispatch( startLoadingVehicles() )

        /****Dispara la función para obtener listado de personas ****/
        dispatch( startLoadingPeople() )

        /****Dispara la función para obtener la jornada ****/
        dispatch( startLoadingSigleWorkdays() )

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
                marca: info.marca.nombre, 
                modelo: info.modelo.nombre,
                color: info.color 
            })

            setValue("vehiculo", {
                id: info.id,
                placa: info.placa,
                marca: { id: info.marca.id, nombre: info.marca.nombre }, 
                modelo: { id: info.modelo.id, nombre: info.modelo.nombre }, 
                color: info.color 
            })

            setError("vehiculo","")
        }

    }, [idVehicle])

    useEffect(() => {
        
        if(idConductor.value){

            const { rif, nombre, apellido, telefono } = getItem(people, idConductor.value)
            
            setConductor({ 
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

    /***** Cuando cambia el select de origen */
    const handleChangingMunicipio = (input) => {
        if(input){
            setIdMunicipio(input)
        }else{
            setIdMunicipio({value:'', label: 'Seleccione un origen'}) 
        }
    }

    /***** Fin Eventos *****/

    const { register, formState: { errors }, handleSubmit, setValue, setError, reset } = useForm();

    //Envia los datos del formularioe
    const onSubmit = (data) => {

        let values = { 
                //jornada: { fecha_inicio: "", fecha_fin: "" }, 
                ...data, importador: company }

        console.log(values)

        /* if( data.id ) {
            dispatch( startUpdatingPeople( {...data} ) )
        }else{
            dispatch( startCreatingPeople( {...data} ) )
        } */
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
            { workday !== null && workday.estado == "Abierta" &&
                    <>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="card">
                                <div className="card-body">
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
                                                    <td>
                                                        Lunes
                                                    </td>
                                                </tr>                            
                                                <tr>
                                                    <td> Días de entrada</td>
                                                    <td>
                                                        { workday.entradas.map( item => {
                                                            return moment(item.entrada).format("dddd") +","
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
                                    <div class="form-group">
                                        <label class="control-label">Fecha</label>
                                        <input name="fecha" type="date" {...register("fecha", { required: true } )}  className="form-control"/>
                                        { errors?.fecha?.type === 'required' &&  (<span className="text-danger">Este campo es requerido</span>) }
                                    </div>
                                </div>
                                <div className="col-lg-4">
                                    <div class="form-group">
                                        <label class="control-label">Origen</label>
                                        <Select name="origen" value={idMunicipio} {...register("origen", { required: true } )} onChange={handleChangingMunicipio} options={municipios} />
                                        { errors.origen?.type === 'required' && <span className="text-danger"> Este campo es obligatorio</span>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        {/***** Div Vehiculo*****/}
                        <div className="col-lg-4">
                            <div className="card">
                                <div className="card-body">
                                <legend>Datos de Vehículo</legend>
                                <hr />
                                    <div class="form-group">
                                        <label class="control-label">Placa</label>
                                        <Select name="vehiculo" value={ idVehicle } {...register("vehiculo", { required: true } )} onChange={ handleChangingPlaca } options={itemsVehicles} />
                                        { errors?.vehiculo?.type === 'required' &&  (<span className="text-danger">Este campo es requerido</span>) }
                                    </div>
                                    <div class="form-group">
                                        <label class="control-label">Marca</label>
                                        <input type="text" value={ inputs.marca } disabled className="form-control"/>
                                    </div>
                                    <div class="form-group">
                                        <label class="control-label">Modelo</label>
                                        <input value={ inputs.modelo } type="text" disabled className="form-control"/>
                                    </div>
                                    <div class="form-group">
                                        <label class="control-label">Color</label>
                                        <input value={ inputs.color } type="text" disabled className="form-control"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/***** Fin Div Vehiculo*****/}
                        {/***** Div Conductor*****/}
                        <div className="col-lg-4">
                            <div className="card">
                                <div className="card-body">
                                <legend>Datos de conductor</legend>
                                    <hr />
                                    <div class="form-group">
                                        <label class="control-label">Cédula</label>
                                        <Select name="conductor" value={ idConductor } {...register("conductor", { required: true } )} onChange={ handleChangingConductor } options={ itemsPeople } />
                                        { errors?.conductor?.type === 'required' &&  (<span className="text-danger">Este campo es requerido</span>) }
                                    </div>
                                    <div class="form-group">
                                        <label class="control-label">Nombre</label>
                                        <input value={ conductor.nombre } type="text" disabled className="form-control"/>
                                    </div>
                                    <div class="form-group">
                                        <label class="control-label">Apellido</label>
                                        <input value={ conductor.apellido } type="text" disabled className="form-control"/>
                                    </div>
                                    <div class="form-group">
                                        <label class="control-label">Teléfono</label>
                                        <input value={ conductor.telefono } type="text" disabled className="form-control"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/***** Fin Div Conductor*****/}
                        {/***** Div Ayudante*****/}
                        <div className="col-lg-4">
                            <div className="card">
                                <div className="card-body">
                                <legend>Datos de Ayudante</legend>
                                    <hr />
                                    <div class="form-group">
                                        <label class="control-label">Cédula</label>
                                        <Select name="ayudante" value={ idAyudante } {...register("ayudante", { required: true } )} onChange={ handleChangingAyudante } options={ itemsPeople } />
                                        { errors?.ayudante?.type === 'required' &&  (<span className="text-danger">Este campo es requerido</span>) }
                                    </div>
                                    <div class="form-group">
                                        <label class="control-label">Nombre</label>
                                        <input value={ ayudante.nombre } type="text" disabled className="form-control"/>
                                    </div>
                                    <div class="form-group">
                                        <label class="control-label">Apellido</label>
                                        <input value={ ayudante.apellido } type="text" disabled className="form-control"/>
                                    </div>
                                    <div class="form-group">
                                        <label class="control-label">Teléfono</label>
                                        <input value={ ayudante.telefono } type="text" disabled className="form-control"/>
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
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="card">
                                <div className="card-body">
                                    <legend>Listado de salidas</legend>
                                    <div className="table-responsive">
                                        <table className="table table-striped table-hover table-">
                                            <thead>
                                                <tr>
                                                    <th colSpan="3" className="text-center">Vehículo</th>
                                                    <th colSpan="3" className="text-center">Conductor</th>
                                                    <th colSpan="3" className="text-center">Ayudante</th>
                                                </tr>
                                                <tr>
                                                    <th>Placa</th>
                                                    <th>Marca</th>
                                                    <th className="border-right">Modelo</th>
                                                    
                                                    <th>Cedula</th>
                                                    <th>Nombre</th>
                                                    <th className="border-right">Apellido</th>
                                                    
                                                    <th>Cedula</th>
                                                    <th>Nombre</th>
                                                    <th>Apellido</th>

                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>VX32652</td>    
                                                    <td>Ford</td>    
                                                    <td className="border-right">750</td>

                                                    <td>V2190389</td>    
                                                    <td>José </td>    
                                                    <td className="border-right">Ruiz</td>    
                                                    
                                                    <td>V1232122</td>    
                                                    <td>Carlos</td>    
                                                    <td>Gonzalez</td>    
                                                </tr>                            
                                            </tbody>
                                        </table>
                                    </div>
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
        </>
    )
}
