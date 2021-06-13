import React, { useEffect, useState } from 'react'
import { useSelector } from "react-redux"
import { useForm } from "react-hook-form"
import Select from 'react-select';

export const Form = (props) => {

    const { register, formState: { errors }, handleSubmit, setValue, setError, reset } = useForm();

    const { loaded } = useSelector(state => state.categories)
    
    let options = []
    
    let items   = loaded.filter( item => item.tipo == "Principal" )
    let modelos = loaded.filter( item => item.tipo == "Marcas" )
    
    items.forEach( item => {
        options.push( { value: item.nombre, label: item.nombre } )
    })
    
    modelos.forEach( item => {
        options.push( { value: item.nombre, label: item.nombre } )
    })

    const [ idTipo, setIdTipo] = useState({
        value:'',
        label:'Seleccione una opción'
    })

    useEffect(() => {
        setIdTipo({value:'',label:'Seleccione una opción'})
        reset({...props.data})
    }, [props.data])

    useEffect(() => {
        
        if(props.data?.tipo){
            setIdTipo({ value: props.data.tipo, label: props.data.tipo })
        } 

    }, [props.data?.tipo])

    useEffect(() => {
        setValue("tipo",idTipo)
        setError("tipo","")
        reset({...props.data, tipo: idTipo.value})
    }, [idTipo])

    const handleChangingTipo = (input) => {
        if(input){
            setIdTipo(input)
        }
    }

    return (
        <form onSubmit={handleSubmit(props.onSubmit)}>
            <h4 class="card-title">Datos de la categoría</h4>
            <hr/>
            <div className="alert alert-info">
                <span>Los campos con el símbolo "*" son requeridos</span>
            </div>
            <div class="form-group">
                <label class="control-label">Tipo *</label>
                <Select name="tipo" value={idTipo} {...register("tipo", { required: true } )}   onChange={handleChangingTipo}  options={options}/>
                { errors?.tipo?.type &&  (<span className="text-danger">Este campo es requerido</span>) }
            </div>
            <div class="form-group">
                <label class="control-label">Nombre *</label>
                <input type="text" name="nombre" autoComplete="off" class="form-control" {...register("nombre", { required: true } )} placeholder="Ingrese el Nombre"/>
                { errors?.nombre?.type &&  (<span className="text-danger">Este campo es requerido</span>) }
            </div>
           <div className="form-group">
                <label className="control-label">Estado *</label>
                <select name="estado" {...register("estado")} className="form-control custom-select">
                    <option value="Activo">Activo</option>
                    <option value="Inactivo">Inactivo</option>
                </select>
            </div>
            <button type="button" class="btn btn-inverse pull-right">Cancelar</button>
            <button type="submit" class="btn btn-success pull-right mr-2"> <i class="fa fa-check"></i> Guardar</button>        </form>
    )
}
