import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form"
import Select from 'react-select'
import InputMask from 'react-input-mask';

import data from '../../data/municipios.json'
import { getItemSelect, prepareOptionsSelect, getItemMunicipio } from '../../helpers/dataArray'

export const Form = (props) => {
    
    const { register, formState: { errors }, handleSubmit, setError, setValue, reset } = useForm();
    
    let municipioItems = data.map(item => item.municipio);
    const municipios = prepareOptionsSelect(municipioItems)

    const [parroquias, setParroquias] = useState({})

    const [ idParroquia, setIdParroquia] = useState({
        value:'',
        label:'Seleccione una parroquia'
    })
    
    const [ idMunicipio, setIdMunicipio] = useState({
        value:'',
        label:'Seleccione un municipio'
    })

    useEffect(() => {

        setIdMunicipio({value:'',label:'Seleccione una municipio'})
        setIdParroquia({value:'',label:'Seleccione una parroquia'})

        reset({...props.data})
    }, [props.data])

    /*****
     * Cuando el usuario hace click en el botón
     * para editar del listado, entonces se 
     * deben cargar los datos en el formulario
     * 
     * Con este parámetro se establece el municipio
     * ================================
     * props.customSelect.municipio.id
     * 
     * Con este parámetro se establece la parroquia
     * ================================
     * props.customSelect.parroquia.id
     *****/
    useEffect(() => {
        
        if(props.data?.municipio?.id){
        
            const item = getItemSelect(municipios, props.data.municipio.id)
            setIdMunicipio(item)
            const { municipio } = getItemMunicipio(data, item.value)
            let itemsParroquias = prepareOptionsSelect(municipio.parroquias)
            setParroquias(itemsParroquias)
            
        } 

    }, [props.data?.municipio?.id])

    /*****
     * Se activa cuando el usuario 
     * selecciona un municipio o limpia el campo
     *****/
    useEffect(() => {
        
        let municipio = {}

        //Si ha se
        if(idMunicipio.value !== ""){
            municipio = {
                id: idMunicipio.value, 
                    nombre: idMunicipio.label 
            }

            //Para que no me muestre error 
            //aún cuando haya seleccionado un municipio
            //este problema es debido al paquete que se está 
            //usando para generar los campos de tipo select 
            setValue("municipio", idMunicipio)
            setError("municipio", "")
        
        }else{
            municipio = {
                id: "", 
                nombre: "" 
            }
        }

        props.setCustomSelect(
            {   ...props.customSelect, 
                municipio: { ...municipio }
            }
        )
        
        if(props.data?.parroquia?.id){
            setIdParroquia({
                value: props.data?.parroquia?.id,
                label: props.data?.parroquia?.nombre
            })
        }

    }, [idMunicipio])

    /*****
     * Se activa cuando el usuario 
     * selecciona una parroquia o limpia el campo
     *****/
    useEffect(() => {

        let parroquia = {}

        if(idParroquia.value !== ""){
            parroquia = {
                id: idParroquia.value, 
                nombre: idParroquia.label 
            }
        }else{
            parroquia = {
                id: "", 
                nombre: "" 
            }
        }

        props.setCustomSelect(
            {   ...props.customSelect, 
                parroquia: { ...parroquia }
            }
        )

    }, [idParroquia])

    /*****
     * Evento que se dispara al cambiar
     * el campo municipio
     *****/
    const handleChangingMunicipio = (input) => {
        
        if(input){
            setIdMunicipio(input)
           
            const { municipio } = getItemMunicipio(data, input.value)
            let itemsParroquias = prepareOptionsSelect(municipio.parroquias)
            setParroquias(itemsParroquias)
        }else{

            setIdMunicipio({value:'', label: 'Seleccione un municipio'}) 
            setIdParroquia({value:'', label: 'Seleccione una parroquia'})
            setParroquias([])

        }
    }

    /***** 
     * Activa la llamada para establecer una parroquia
     * *****/
    const handleChangingParroquia = (input) => {
        if(input){
            setIdParroquia(input)
        }else{
            setIdParroquia({value:"",label:"Seleccione una parroquia"})
        }
    }

    return (
        <form onSubmit={handleSubmit(props.onSubmit)}>
            <h4 className="card-title">Datos { props.title }</h4>
            <hr/>
            <div className="alert alert-info">
                <span>Los campos con el símbolo "*" son requeridos</span>
            </div>
            <div className="form-group">
                <label className="control-label">Nombre / Razón Social *</label>
                <input type="text" name="nombre" autoComplete="off" className="form-control" {...register("nombre", { required: true } )} placeholder="Ingrese Nombre/Razón Social"/>
                {errors.nombre?.type === 'required' && <span className="text-danger">Este campo es obligatorio</span>}
            </div>
            <div className="form-group">
                <label className="control-label">RIF/Cédula *</label>
                <input type="text" name="rif" autoComplete="off" className="form-control" {...register("rif", { required: true, pattern: /([V|J|G|E])\d{8,11}/g } )} placeholder="J12345678"/>
                {errors.rif?.type === 'required' && <span className="text-danger">Este campo es obligatorio</span>}
                {errors.rif?.type === 'pattern' && <span className="text-danger">El formato de RIF/Cédula no es válido</span>}

            </div>
            <div className="form-group">
                <label className="control-label">Municipio *</label>
                <Select name="municipio" isClearable={true} value={idMunicipio} {...register("municipio", { required: true } )} onChange={handleChangingMunicipio} options={municipios} />
                { errors.municipio?.type === 'required' && <span className="text-danger"> Este campo es obligatorio</span>}
            </div>
            <div className="form-group">
                <label className="control-label">Parroquia</label>
                <Select name="parroquia" isClearable={true} value={idParroquia} onChange={handleChangingParroquia} options={parroquias} />
            </div>
            <div className="form-group">
                <label className="control-label">Dirección *</label>
                <input type="text" name="direccion" autoComplete="off" className="form-control" {...register("direccion", { required: true } )} placeholder="Ingrese la dirección"/>
                {errors.direccion?.type === 'required' && <span className="text-danger">Este campo es obligatorio</span>}
            </div>
            <div className="form-group mb-5">
                <label className="control-label">Estado</label>
                <select className="form-control" {...register("estado", { required: true } )}>
                    <option value="Activo">Activo</option>
                    <option value="Inactivo">Inactivo</option>
                </select>
            </div>

            { /**** Datos del representante legal/encargado de la empresa****/}
            <h4 className="card-title">Datos Representante</h4>
            <hr/>
            <div className="form-group">
                <label className="control-label">Nombre / Razón Social *</label>
                <input type="text" name="representante_nombre" autoComplete="off" className="form-control" {...register("representante_nombre", { required: true } )} placeholder="Ingrese Nombre Representante"/>
                {errors.representante_nombre?.type === 'required' && <span className="text-danger">Este campo es obligatorio</span>}
            </div>
            <div className="form-group">
                <label className="control-label">RIF/Cédula *</label>
                <input type="text" name="representante_rif" autoComplete="off" className="form-control" {...register("representante_rif", { required: true, pattern: /([V|J|G|E])\d{8,11}/g } )} placeholder="J12345678"/>
                {errors.representante_rif?.type === 'required' && <span className="text-danger">Este campo es obligatorio</span>}
                {errors.representante_rif?.type === 'pattern' && <span className="text-danger">El formato de RIF/Cédula no es válido</span>}
            </div>
            <div className="form-group">
                <label className="control-label">Teléfono *</label>
                <InputMask mask="9999-9999999" name="representante_telefono" autoComplete="off" className="form-control" {...register("representante_telefono", { required: true } )} placeholder="9999-9999999"/>
                {errors.representante_telefono?.type === 'required' && <span className="text-danger">Este campo es obligatorio</span>}
            </div>
            { props.title == "Empresa" &&

                <>
                    <h4 className="card-title mt-5">Datos de Responsable</h4>
                    <hr/>
                    <div className="form-group">
                        <label className="control-label">Nombre / Razón Social *</label>
                        <input type="text" name="responsable_nombre" autoComplete="off" className="form-control" {...register("responsable_nombre", { required: true } )} placeholder="Ingrese Nombre Representante"/>
                        {errors.responsable_nombre?.type === 'required' && <span className="text-danger">Este campo es obligatorio</span>}
                    </div>
                    <div className="form-group">
                        <label className="control-label">RIF/Cédula *</label>
                        <input type="text" name="responsable_rif" autoComplete="off" className="form-control" {...register("responsable_rif", { required: true, pattern: /([V|J|G|E])\d{8,11}/g } )} placeholder="J12345678"/>
                        {errors.responsable_rif?.type === 'required' && <span className="text-danger">Este campo es obligatorio</span>}
                        {errors.responsable_rif?.type === 'pattern' && <span className="text-danger">El formato de RIF/Cédula no es válido</span>}
                    </div>
                    <div className="form-group">
                        <label className="control-label">Teléfono *</label>
                        <InputMask mask="9999-9999999" name="representante_telefono" autoComplete="off" className="form-control" {...register("representante_telefono", { required: true } )} placeholder="9999-9999999"/>
                        {errors.responsable_telefono?.type === 'required' && <span className="text-danger">Este campo es obligatorio</span>}
                    </div>

                    <h4 className="card-title mt-5">Límite de vehículos por jornada</h4>
                    <hr/>
                    <div className="form-group">
                        <label className="control-label">Cantidad de vehículos *</label>
                        <input type="number" name="limite_vehiculos" autoComplete="off" className="form-control" {...register("limite_vehiculos", { required: true } )} placeholder="Ingrese la cantidad de vehículos"/>
                        {errors.limite_vehiculos?.type === 'required' && <span className="text-danger">Este campo es obligatorio</span>}
                    </div>

                </>

            }

            <button type="button" className="btn btn-inverse pull-right">Cancelar</button>
            <button type="submit" className="btn btn-success pull-right mr-2"> <i className="fa fa-check"></i> Guardar</button>
        </form>
    )
}
