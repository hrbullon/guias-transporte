import React, { useEffect } from 'react'
import { useForm } from "react-hook-form"

import Swal from 'sweetalert2'
import Select from 'react-select'

import { validatePlaca } from "../../helpers/checking"


export const Form = (props) => {

    const { register, formState: { errors }, handleSubmit, reset } = useForm();

    useEffect(() => {
        reset({...props.data})
    }, [props.data])

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
                <Select name="marca" isClearable={true} options={props.brands} />
                { errors?.marca?.type &&  (<span className="text-danger">Este campo es requerido</span>) }
            </div>
            <div className="form-group">
                <label className="control-label">Modelo *</label>
                <Select name="modelo" isClearable={true} options={props.models} />
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
