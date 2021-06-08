import React, { useEffect } from 'react'
import { useForm } from "react-hook-form"

export const Form = (props) => {

    const { register, formState: { errors }, handleSubmit, reset } = useForm();

    useEffect(() => {
        reset({...props.data})
    }, [props.data])

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
                <select name="unidad_medida" {...register("unidad_medida")} className="form-control custom-select">
                    <option value="">Seleccione una unidad de medida</option>
                </select>
            </div>
            <button type="button" class="btn btn-inverse pull-right">Cancelar</button>
            <button type="submit" class="btn btn-success pull-right mr-2"> <i class="fa fa-check"></i> Guardar</button>        </form>
    )
}
