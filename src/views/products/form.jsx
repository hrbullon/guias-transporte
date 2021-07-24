import React, { useEffect } from 'react'
import { useForm } from "react-hook-form"

export const Form = (props) => {

    const { register, formState: { errors }, handleSubmit, reset } = useForm();

    useEffect(() => {
        reset({...props.data})
    }, [props.data])

    return (
        <form onSubmit={handleSubmit(props.onSubmit)}>
            <h4 className="card-title">Datos de Producto</h4>
            <hr/>
            <div className="alert alert-info">
                <span>Los campos con el símbolo "*" son requeridos</span>
            </div>
            <div className="form-group">
                <label className="control-label">Categoría *</label>
                <select name="categoria" {...register("categoria", { required: true } )} className="form-control custom-select">
                    <option value="">Seleccione una categoría</option>
                    { Object.keys(props.categories).map( (index, value) => {
                        let selected = (props.data.categoria == props.categories[index].nombre)? "selected" : "";
                        return <option selected={selected} key={index} value={props.categories[index].nombre}>{ props.categories[index].nombre }</option>    
                    })}
                </select>
                { errors?.categoria?.type &&  (<span className="text-danger">Este campo es requerido</span>) }
            </div>
            <div className="form-group">
                <label className="control-label">Nombre *</label>
                <input type="text" name="nombre" autoComplete="off" className="form-control" {...register("nombre", { required: true } )} placeholder="Ingrese Nombre/Razón Social"/>
                { errors?.nombre?.type &&  (<span className="text-danger">Este campo es requerido</span>) }
            </div>
            <div className="form-group">
                <label className="control-label">Presentación *</label>
                <select name="presentacion" {...register("presentacion", { required: true } )} className="form-control custom-select">
                    <option value="">Seleccione una presentación</option>
                    { Object.keys(props.conversions).map( (index, value) => {
                        let selected = (props.data.presentacion == props.conversions[index].id)? "selected" : "";
                        return <option selected={selected} key={index} value={props.conversions[index].id}>
                            { `${props.conversions[index].presentacion} - ${props.conversions[index].contenido} ${props.conversions[index].unidad_medida}` }
                            </option>    
                    })}
                </select>
                { errors?.presentacion?.type &&  (<span className="text-danger">Este campo es requerido</span>) }
            </div>
            <div className="form-group">
                <label className="control-label">Estado *</label>
                <select name="estado" {...register("estado")} className="form-control custom-select">
                    <option value="Activo">Activo</option>
                    <option value="Inactivo">Inactivo</option>
                </select>
            </div>
            <button type="button" className="btn btn-inverse pull-right">Cancelar</button>
            <button type="submit" className="btn btn-success pull-right mr-2"> <i className="fa fa-check"></i> Guardar</button>        </form>
    )
}
