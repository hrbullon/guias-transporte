import React, { useState, useEffect } from 'react'
import { useForm } from "react-hook-form"

import Select from 'react-select'

import { getItemSelect, prepareOptionsSelect } from '../../helpers/dataArray'

export const Form = (props) => {

    const { register, formState: { errors }, handleSubmit, setValue, setError, reset } = useForm();

    const [ idMarca, setIdMarca] = useState({
        value:'',
        label:'Seleccione una marca'
    })
    
    const [ idModelo, setIdModelo] = useState({
        value:'',
        label:'Seleccione un modelo'
    })

    useEffect(() => {
        
        setIdMarca({value:'',label:'Seleccione una marca'})
        setIdModelo({value:'',label:'Seleccione un modelo'})

        reset({...props.data})
    }, [props.data])
    
    /*****
     * Cuando el usuario hace click en el botón
     * para editar del listado, entonces se 
     * deben cargar los datos en el formulario
     * 
     * Con este parámetro se establece la marca
     * ================================
     * props.customSelect.marca.id
     * 
     * Con este parámetro se establece el modelo
     * ================================
     * props.customSelect.modelo.id
     *****/
    useEffect(() => {
        
        if(props.data?.marca?.id){
            const item = getItemSelect(props.brands, props.data.marca.id)
            setIdMarca(item)
            
            let modeloItems = props.categories.filter( modelo => modelo.tipo == item.label )
            modeloItems = prepareOptionsSelect(modeloItems)
            props.setModels(modeloItems)
        } 

    }, [props.data?.marca?.id])

    useEffect(() => {

        let marca = {}

        if(idMarca.value !== ""){
            marca = {
                id: idMarca.value, 
                nombre: idMarca.label 
            }

            //Para que no me muestre error 
            //aún cuando haya seleccionado una marca
            //este problema es debido al paquete que se está 
            //usando para generar los campos de tipo select 
            setValue("marca", idMarca)
            setError("marca", "")
        
        }else{
            marca = {
                id: "", 
                nombre: "" 
            }
        }

        props.setCustomSelect(
            {   ...props.customSelect, 
                marca: { ...marca }
            }
        )
        
        if(props.data?.modelo?.id){
            setIdModelo({
                value: props.data?.modelo?.id,
                label: props.data?.modelo?.nombre
            })
        }

    }, [idMarca])

    useEffect(() => {

        let modelo = {}

        if(idModelo.value !== ""){
            modelo = {
                id: idModelo.value, 
                nombre: idModelo.label 
            }

            //Para que no me muestre error 
            //aún cuando haya seleccionado un modelo
            //este problema es debido al paquete que se está 
            //usando para generar los campos de tipo select 
            setValue("modelo", idModelo)
            setError("modelo", "")

        }else{
            modelo = {
                id: "", 
                nombre: "" 
            }
        }

        props.setCustomSelect(
            {   ...props.customSelect, 
                modelo: { ...modelo }
            }
        )

    }, [idModelo])

    /***** 
     * Activa la llamada para filtrar los modelos
     * Dependiendo de la marca seleccionada
     * Es decir captura el evento onChange en el campo marca
     * *****/
    const handleChangingMarca = ( input ) => {
        
        if(input){
            
            setIdMarca(input)
            
            let modeloItems = props.categories.filter( item => item.tipo == input.label )
            modeloItems = prepareOptionsSelect(modeloItems)
            props.setModels(modeloItems)

        }else{

            setIdMarca({value:'', label: 'Seleccione una marca'}) 
            setIdModelo({value:'', label: 'Seleccione un modelo'})
            props.setModels([])

        }
        
    }

    /***** 
     * Activa la llamada para establecer un modelo
     * *****/
     const handleChangingModelo = ( input ) => {
        if(input){
            setIdModelo(input)
        }else{
            setIdModelo({value:'',label:'Seleccione un modelo'})
        }
    } 

    return (
        <form onSubmit={handleSubmit(props.onSubmit)}>
            <h4 className="card-title">Datos de Vehículo</h4>
            <hr/>
            <div className="alert alert-info">
                <span>Los campos con el símbolo "*" son requeridos</span>
            </div>
            <div className="form-group">
                <label className="control-label">Marca *</label>
                <Select name="marca" isClearable={true} value={idMarca} {...register("marca", { required: true } )}  onChange={handleChangingMarca} options={props.brands} />
                { errors?.marca?.type &&  (<span className="text-danger">Este campo es requerido</span>) }
            </div>
            <div className="form-group">
                <label className="control-label">Modelo *</label>
                <Select name="modelo" isClearable={true} value={idModelo} {...register("modelo", { required: true } )}  onChange={ handleChangingModelo } options={props.models} />
                { errors?.modelo?.type &&  (<span className="text-danger">Este campo es requerido</span>) }
            </div>
            <div className="form-group">
                <label className="control-label">Placa *</label>
                <input type="text" name="placa" autoComplete="off" className="form-control" {...register("placa", { required: true } )} placeholder="Ingrese una placa"/>
                { errors?.placa?.type &&  (<span className="text-danger">Este campo es requerido</span>) }
            </div>
            <div className="form-group">
                <label className="control-label">Color *</label>
                <input type="text" name="color" autoComplete="off" className="form-control" {...register("color", { required: true } )} placeholder="Ingrese un color"/>
                { errors?.color?.type &&  (<span className="text-danger">Este campo es requerido</span>) }
            </div>
            <div className="form-group">
                <label className="control-label">Estado *</label>
                <select name="estado" {...register("estado")} className="form-control custom-select">
                    <option value="Activo">Activo</option>
                    <option value="Inactivo">Inactivo</option>
                </select>
            </div>
            <button type="button" className="btn btn-inverse pull-right">Cancelar</button>
            <button type="submit" className="btn btn-success pull-right mr-2"> <i className="fa fa-check"></i> Guardar</button>
        </form>
    )
}
