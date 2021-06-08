import React, { useEffect } from 'react'
import { useForm } from "react-hook-form"

export const Form = (props) => {

    const { register, formState: { errors }, handleSubmit, reset } = useForm();

    useEffect(() => {
        reset({...props.data})
    }, [props.data])

    return (
        <form onSubmit={handleSubmit(props.onSubmit)}>
            <h4 class="card-title">Datos de la persona</h4>
            <hr/>
            <div className="alert alert-info">
                <span>Los campos con el símbolo "*" son requeridos</span>
            </div>
            <div class="form-group">
                <label class="control-label">Nombre *</label>
                <input type="text" name="nombre" autoComplete="off" class="form-control" {...register("nombre", { required: true } )} placeholder="Ingrese el Nombre"/>
                { errors?.nombre?.type &&  (<span className="text-danger">Este campo es requerido</span>) }
            </div>
            <div class="form-group">
                <label class="control-label">Apellido *</label>
                <input type="text" name="apellido" autoComplete="off" class="form-control" {...register("apellido", { required: true } )} placeholder="Ingrese el Apellido"/>
                { errors?.apellido?.type &&  (<span className="text-danger">Este campo es requerido</span>) }
            </div>
            <div class="form-group">
                <label class="control-label">Cédula *</label>
                <input type="text" name="rif" autoComplete="off" class="form-control" {...register("rif", { required: true } )} placeholder="Ingrese la cédula"/>
                { errors?.rif?.type &&  (<span className="text-danger">Este campo es requerido</span>) }
            </div>
            <div class="form-group">
                <label class="control-label">Dirección *</label>
                <input type="text" name="direccion" autoComplete="off" class="form-control" {...register("direccion", { required: true } )} placeholder="Ingrese la dirección"/>
                { errors?.direccion?.type &&  (<span className="text-danger">Este campo es requerido</span>) }
            </div>
            <div class="form-group">
                <label class="control-label">Teléfono *</label>
                <input type="text" name="telefono" autoComplete="off" class="form-control" {...register("telefono", { required: true } )} placeholder="Ingrese el número de teléfono"/>
                { errors?.telefono?.type &&  (<span className="text-danger">Este campo es requerido</span>) }
            </div>
            <div class="form-group">
                <label class="control-label">Tipo *</label>
                <select name="tipo" {...register("tipo", { required: true } )} class="form-control custom-select">
                    <option value="">Seleccione un tipo</option>
                    <option value="">Acompañante</option>
                    <option value="">Ayudante</option>
                    <option value="">Conductor</option>
                </select>
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
