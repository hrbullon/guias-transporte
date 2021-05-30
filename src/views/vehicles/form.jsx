import React, { useEffect } from 'react'
import { useForm } from "react-hook-form"

export const Form = (props) => {

    const { register, formState: { errors }, handleSubmit, reset } = useForm();

    useEffect(() => {
        reset({...props.data})
    }, [props.data])

    return (
        <form onSubmit={handleSubmit(props.onSubmit)}>
            <h4 className="card-title">Datos de Vehículo</h4>
            <hr/>
            <div className="alert alert-info">
                <span>Los campos con el símbolo "*" son requeridos</span>
            </div>
            <div className="form-group">
                <label className="control-label">Marca *</label>
                <input type="text" name="marca" autoComplete="off" className="form-control" {...register("marca", { required: true } )} placeholder="Ingrese una marca"/>
                { errors?.marca?.type &&  (<span className="text-danger">Este campo es requerido</span>) }
            </div>
            <div className="form-group">
                <label className="control-label">Modelo *</label>
                <input type="text" name="modelo" autoComplete="off" className="form-control" {...register("modelo", { required: true } )} placeholder="Ingrese un modelo"/>
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
