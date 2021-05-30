import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form"

export const Form = (props) => {

    const { register, formState: { errors }, handleSubmit, reset } = useForm();
    
    const [validate, setValidate] = useState({
        required: props.password,
        minLength: 6
    })
    
    /** Está pendiente si el fomulario se está usando para 
     * editar datos de un usuario, en ese caso quita las validaciones
     * del campo contraseña, para que no sea requerido ni los 6 caracteres minimos
    */
    useEffect(() => {

        if(!props.password){
            setValidate({
                ...validate,
                required:false,
                minLength:0
            })
        }
    }, [props.password])

    useEffect(() => {
        reset({...props.data})
    }, [props.data])

    return (

        <form onSubmit={handleSubmit(props.onSubmit)}>
            <h4 className="card-title">Datos de Usuario</h4>
            <hr/>
            <div className="alert alert-info">
                <span>Los campos con el símbolo "*" son requeridos</span>
            </div>
            <div className="form-group">
                <label className="control-label">Nombre *</label>
                <input type="text" name="nombre" autoComplete="off" className="form-control" {...register("nombre", { required: true } )} placeholder="Ingrese nombre y apellido"/>
                { errors?.nombre?.type &&  (<span className="text-danger">Este campo es requerido</span>) }
            </div>
            <div className="form-group">
                <label className="control-label">Apellido *</label>
                <input type="text" name="apellido" autoComplete="off" className="form-control" {...register("apellido", { required: true } )} placeholder="Ingrese nombre y apellido"/>
                { errors?.apellido?.type &&  (<span className="text-danger">Este campo es requerido</span>) }
            </div>
            <div className="form-group">
                <label className="control-label">Correo electrónico *</label>
                <input type="text" disabled={!props.password} name="email" autoComplete="off" className="form-control" {...register("email", { required: true } )} placeholder="Ingrese correo electrónico"/>
                { errors?.email?.type &&  (<span className="text-danger">Ingrese un correo electrónico válido</span>) }
            </div>
            <div className="form-group">
                <label className="control-label">Contraseña *</label>
                <input type="password" disabled={!props.password} name="password" className="form-control" {...register("password", { ...validate } )} placeholder="Ingrese contraseña"/>
                { errors?.password?.type &&  (<span className="text-danger">La contraseña debe tener al menos 6 caracteres</span>) }
            </div>
            <div className="form-group">
                <label className="control-label">Rol *</label>
                <select name="rol" {...register("rol")} className="form-control custom-select">
                    <option value="">Seleccione una opción</option>
                    <option value="Admin_Role">Admin</option>
                    <option value="Comprador_Role">Comprador</option>
                    <option value="Supervisor_Role">Supervisor</option>
                </select>
                { errors?.rol?.type &&  (<span className="text-danger">Seleccione un rol</span>) }
            </div>
            <div className="form-group">
                <label className="control-label">Estado</label>
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
