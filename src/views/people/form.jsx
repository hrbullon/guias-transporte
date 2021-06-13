import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { useForm } from "react-hook-form"
import InputMask from 'react-input-mask';
import Select from 'react-select';

import { startLoadingCategoriesFilter } from '../../actions/categories';

export const Form = (props) => {

    const dispatch = useDispatch()

    const { register, formState: { errors }, handleSubmit, setValue, setError, reset } = useForm();

    //Aquí se almacena el listado de tipos de personas
    const [ items, setItems ] = useState([])
    const { loaded } = useSelector(state => state.categories)

    const [ idTipo, setIdTipo] = useState({
        value:'',
        label:'Seleccione una opción'
    })

    useEffect(() => {
        dispatch( startLoadingCategoriesFilter( "Tipo persona" ) )
    }, [])

    useEffect(() => {
        setIdTipo({value:"",label:"Seleccione una opción"})
        reset({...props.data})
    }, [props.data])

    useEffect(() => {
        
        const tipos = []
        loaded.forEach( item => {
            tipos.push({ value: item.nombre, label: item.nombre })
        })
        
        setItems( tipos )

    }, [loaded])

    useEffect(() => {
        reset({...props.data})
    }, [props.data])

    useEffect(() => {
        
        if(props.data?.tipo){
            setIdTipo({ value: props.data.tipo, label: props.data.tipo })
        } 

    }, [props.data?.tipo])

    useEffect(() => {
        if(idTipo.value !== ""){
            setValue("tipo",idTipo.value)
            setError("tipo","")
        }
    }, [idTipo])

    const handleChangingTipo = (input) => {
        setIdTipo(input)
    }

    return (
        <form onSubmit={handleSubmit(props.onSubmit)}>
            <h4 class="card-title">Datos de la persona</h4>
            <hr/>
            <div className="alert alert-info">
                <span>Los campos con el símbolo "*" son requeridos</span>
            </div>
            <div class="form-group">
                <label class="control-label">Nombre *</label>
                <input type="text" name="nombre" autoComplete="off" class="form-control" {...register("nombre", { required: true, pattern: /^[A-Z a-z]+$/i } )} placeholder="Ingrese el Nombre"/>
                { errors?.nombre?.type === "required" &&  (<span className="text-danger">Este campo es requerido</span>) }
                { errors?.nombre?.type === "pattern" &&  (<span className="text-danger">Sólo se permiten letras en el Nombre</span>) }
            </div>
            <div class="form-group">
                <label class="control-label">Apellido *</label>
                <input type="text" name="apellido" autoComplete="off" class="form-control" {...register("apellido", { required: true, pattern: /^[A-Z a-z]+$/i } )} placeholder="Ingrese el Apellido"/>
                { errors?.apellido?.type &&  (<span className="text-danger">Este campo es requerido</span>) }
                { errors?.apellido?.type === "pattern" &&  (<span className="text-danger">Sólo se permiten letras en el Nombre</span>) }
            </div>
            <div class="form-group">
                <label class="control-label">Cédula *</label>
                <input type="text" name="rif" autoComplete="off" class="form-control" {...register("rif", { required: true, pattern: /([V|E])\d{8,9}/g } )} placeholder="Ej:. V12345678"/>
                { errors?.rif?.type === 'required' &&  (<span className="text-danger">Este campo es requerido</span>) }
                { errors?.rif?.type === 'pattern' && <span className="text-danger">El formato de RIF/Cédula no es válido</span>}
            </div>
            <div class="form-group">
                <label class="control-label">Dirección *</label>
                <input type="text" name="direccion" autoComplete="off" class="form-control" {...register("direccion", { required: true } )} placeholder="Ingrese la dirección"/>
                { errors?.direccion?.type &&  (<span className="text-danger">Este campo es requerido</span>) }
            </div>
            <div class="form-group">
                <label class="control-label">Teléfono *</label>
                <InputMask mask="9999-9999999" type="text" name="telefono" autoComplete="off" class="form-control" {...register("telefono", { required: true } )} placeholder="9999-9999999"/>
                { errors?.telefono?.type &&  (<span className="text-danger">Este campo es requerido</span>) }
            </div>
            <div class="form-group">
                <label class="control-label">Tipo *</label>
                <Select name="tipo" value={idTipo} {...register("tipo", { required: true } )} onChange={handleChangingTipo} options={items}/>
                { errors?.tipo?.type &&  (<span className="text-danger">Este campo es requerido</span>) }
            </div>
            <div className="form-group">
                <label className="control-label">Estado *</label>
                <select name="estado" {...register("estado")} className="form-control custom-select">
                    <option value="Activo">Activo</option>
                    <option value="Inactivo">Inactivo</option>
                </select>
                { errors?.estado?.type &&  (<span className="text-danger">Este campo es requerido</span>) }
            </div>
            <button type="button" class="btn btn-inverse pull-right">Cancelar</button>
            <button type="submit" class="btn btn-success pull-right mr-2"> <i class="fa fa-check"></i> Guardar</button>        </form>
    )
}
