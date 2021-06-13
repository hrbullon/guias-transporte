import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { useForm } from "react-hook-form"
import Select from 'react-select'

import { startLoadingCategoriesFilter } from '../../../actions/categories'

export const Form = (props) => {

    const dispatch = useDispatch()

    const { register, formState: { errors }, handleSubmit, setValue, setError, reset } = useForm();

    //Aquí se almacena el listado de unidades de medida
    const [ items, setItems ] = useState([])
    const { loaded } = useSelector(state => state.categories)

    const [ idUnidad, setIdUnidad] = useState({
        value:'',
        label:'Seleccione unidad de medida'
    })

    useEffect(() => {
        dispatch( startLoadingCategoriesFilter( "Unidad medida" ) )
    }, [])

    useEffect(() => {
        setIdUnidad({value:"",label:"Seleccione unidad de medida"})
        reset({...props.data})
    }, [props.data])

    useEffect(() => {
        
        const unidadMedida = []
        loaded.forEach( item => {
            unidadMedida.push({ value: item.nombre, label: item.nombre })
        })
        
        setItems( unidadMedida )

    }, [loaded])

    useEffect(() => {
        
        if(props.data?.unidad_medida){
            setIdUnidad({ value: props.data.unidad_medida, label: props.data.unidad_medida })
        } 

    }, [props.data?.unidad_medida])

    useEffect(() => {
        if(idUnidad.value !== ""){
            setValue("unidad_medida",idUnidad)
            setError("unidad_medida","")
        }
    }, [idUnidad])

    const handleChangingUnidad = (input) => {
        setIdUnidad(input)
    }

    return (
        <form onSubmit={handleSubmit(props.onSubmit)}>
            <h4 class="card-title">Datos de la presentación</h4>
            <hr/>
            <div className="alert alert-info">
                <span>Los campos con el símbolo "*" son requeridos</span>
            </div>
            <div class="form-group">
                <label class="control-label">Presentación *</label>
                <input type="text" name="presentacion" autoComplete="off" class="form-control" {...register("presentacion", { required: true } )} placeholder="Ingrese Nombre de la presentación"/>
                { errors?.presentacion?.type &&  (<span className="text-danger">Este campo es requerido</span>) }
            </div>
            <div class="form-group">
                <label class="control-label">Contenido *</label>
                <input type="number" name="contenido" autoComplete="off" class="form-control" {...register("contenido", { required: true } )} placeholder="Ingrese Contenido"/>
                { errors?.contenido?.type &&  (<span className="text-danger">Este campo es requerido</span>) }
            </div>
            <div className="form-group">
                <label className="control-label">Uniad de medida *</label>
                <Select name="unidad_medida" value={idUnidad} {...register("unidad_medida", { required: true } )} onChange={handleChangingUnidad} options={items} />
                { errors?.unidad_medida?.type &&  (<span className="text-danger">Este campo es requerido</span>) }
            </div>
            <button type="button" class="btn btn-inverse pull-right">Cancelar</button>
            <button type="submit" class="btn btn-success pull-right mr-2"> <i class="fa fa-check"></i> Guardar</button>        </form>
    )
}
