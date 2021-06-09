import React, { useState, useEffect } from 'react'
import { useForm } from "react-hook-form"

import Swal from 'sweetalert2'
import Select from 'react-select'

import { validatePlaca } from "../../helpers/checking"
import { getItem, getItemSelect, prepareOptionsSelect } from '../../helpers/dataArray'


export const Form = (props) => {

    const { register, formState: { errors }, handleSubmit, reset } = useForm();

    const [ idMarca, setIdMarca] = useState({
        value:'',
        label:''
    })
    
    const [ idModelo, setIdModelo] = useState({
        value:'',
        label:''
    })

    useEffect(() => {
        reset({...props.data})
    }, [props.data])
    
    useEffect(() => {
        
        if(props.customSelect.marca){
            let marca = getItemSelect(props.brands,props.customSelect.marca)
            setIdMarca(marca)

            let modelItems = props.categories.filter(category => category.tipo == marca.label);
            modelItems = prepareOptionsSelect( modelItems )
            props.setModels(modelItems)

        }
        
        if(props.customSelect.modelo !== ""){
            const modelo = getItemSelect(props.models,props.customSelect.modelo)
            setIdModelo(modelo)
        } 

    }, [props.customSelect])

    /***** 
     * Activa la llamada para filtrar los modelos
     * Dependiendo de la marca seleccionada
     * Es decir captura el evento onChange en el campo marca
     * *****/
    const handleChangingMarca = ( input ) => {
        setIdMarca(input)

        props.setCustomSelect({...props.customSelect, marca: input.value })

        let modelItems = props.categories.filter(category => category.tipo == input.label);
        modelItems = prepareOptionsSelect( modelItems )
        props.setModels(modelItems)

        setIdModelo({value:'', label: ''})
    }

    /***** 
     * Activa la llamada para establecer un modelo
     * *****/
     const handleChangingModelo = ( input ) => {
        const modelo = getItemSelect(props.models, input.value)
        setIdModelo(modelo)
        props.setCustomSelect({...props.customSelect, modelo: input.value })
    } 

    /***** 
     * Activa la llamada para verificar que la placa sea única
     * Se activa cuando el usuario saca el cursor del campo placa
     * Es decir captura el evento onBlur en placa
     * *****/
    const handleCheckingPlaca = async (placa) => {
        const validated = await validatePlaca(placa)
        
        if(!validated){
            reset({...props.data, placa:""})
            
            Swal.fire({
                title: 'Datos inválidos',
                html: `La placa <b>${placa}</b>, ya se encuentra registrada`,
                icon: 'warning'
            })
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
                <Select name="marca" isClearable={true} value={idMarca} onChange={ handleChangingMarca } options={props.brands} />
                { errors?.marca?.type &&  (<span className="text-danger">Este campo es requerido</span>) }
            </div>
            <div className="form-group">
                <label className="control-label">Modelo *</label>
                <Select name="modelo" isClearable={true} value={idModelo} onChange={ handleChangingModelo } options={props.models} />
                { errors?.modelo?.type &&  (<span className="text-danger">Este campo es requerido</span>) }
            </div>
            <div className="form-group">
                <label className="control-label">Placa *</label>
                <input type="text" name="placa" onBlurCapture={ (e) => handleCheckingPlaca(e.target.value) } autoComplete="off" className="form-control" {...register("placa", { required: true } )} placeholder="Ingrese una placa"/>
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
