import React, { useEffect } from 'react'
import { useForm } from "react-hook-form"
import Select from 'react-select'

import data from '../../data/municipios.json'
import { prepareOptionsSelect } from '../../helpers/dataArray'

export const Form = (props) => {
    
    const { register, formState: { errors }, handleSubmit, reset } = useForm();

    let parroquias = []

    let municipioItems = data.map(item => item.municipio);
    const municipios = prepareOptionsSelect(municipioItems)

    useEffect(() => {

        reset({...props.data})
    }, [props.data])

    return (
        <form onSubmit={handleSubmit(props.onSubmit)}>
            <h4 className="card-title">Datos { props.title }</h4>
            <hr/>
            <div className="alert alert-info">
                <span>Los campos con el símbolo "*" son requeridos</span>
            </div>
            <div className="form-group">
                <label className="control-label">Nombre / Razón Social *</label>
                <input type="text" name="nombre" autoComplete="off" className="form-control" {...register("nombre", { required: true } )} placeholder="Ingrese Nombre/Razón Social"/>
                {errors.nombre?.type === 'required' && <span className="text-danger">Este campo es obligatorio</span>}
            </div>
            <div className="form-group">
                <label className="control-label">RIF/Cédula *</label>
                <input type="text" name="rif" autoComplete="off" className="form-control" {...register("rif", { required: true } )} placeholder="Ingrese el RIF/Cédula"/>
                {errors.rif?.type === 'required' && <span className="text-danger">Este campo es obligatorio</span>}
            </div>
            <div className="form-group">
                <label className="control-label">Municipio *</label>
                <Select name="municipio" isClearable={true} options={municipios} />
            </div>
            <div className="form-group">
                <label className="control-label">Parroquia</label>
                <Select name="parroquia" isClearable={true} options={parroquias} />
            </div>
            <div className="form-group">
                <label className="control-label">Dirección *</label>
                <input type="text" name="direccion" autoComplete="off" className="form-control" {...register("direccion", { required: true } )} placeholder="Ingrese la dirección"/>
                {errors.direccion?.type === 'required' && <span className="text-danger">Este campo es obligatorio</span>}
            </div>
            <div className="form-group mb-5">
                <label className="control-label">Estado</label>
                <select className="form-control" {...register("estado", { required: true } )}>
                    <option value="Activo">Activo</option>
                    <option value="Inactivo">Inactivo</option>
                </select>
            </div>

            { /**** Datos del representante legal/encargado de la empresa****/}
            <h4 className="card-title">Datos Representante</h4>
            <hr/>
            <div className="form-group">
                <label className="control-label">Nombre / Razón Social *</label>
                <input type="text" name="representante_nombre" autoComplete="off" className="form-control" {...register("representante_nombre", { required: true } )} placeholder="Ingrese Nombre Representante"/>
                {errors.representante_nombre?.type === 'required' && <span className="text-danger">Este campo es obligatorio</span>}
            </div>
            <div className="form-group">
                <label className="control-label">RIF/Cédula *</label>
                <input type="text" name="representante_rif" autoComplete="off" className="form-control" {...register("representante_rif", { required: true } )} placeholder="Ingrese RIF/Cédula"/>
                {errors.representante_rif?.type === 'required' && <span className="text-danger">Este campo es obligatorio</span>}
            </div>
            <div className="form-group">
                <label className="control-label">Teléfono *</label>
                <input type="text" name="representante_telefono" autoComplete="off" className="form-control" {...register("representante_telefono", { required: true } )} placeholder="Ingrese la dirección"/>
                {errors.representante_telefono?.type === 'required' && <span className="text-danger">Este campo es obligatorio</span>}
            </div>
            { props.title == "Empresa" &&

                <>
                    <h4 className="card-title mt-5">Datos de Responsable</h4>
                    <hr/>
                    <div className="form-group">
                        <label className="control-label">Nombre / Razón Social *</label>
                        <input type="text" name="responsable_nombre" autoComplete="off" className="form-control" {...register("representante_nombre", { required: true } )} placeholder="Ingrese Nombre Representante"/>
                        {errors.responsable_nombre?.type === 'required' && <span className="text-danger">Este campo es obligatorio</span>}
                    </div>
                    <div className="form-group">
                        <label className="control-label">RIF/Cédula *</label>
                        <input type="text" name="responsable_rif" autoComplete="off" className="form-control" {...register("representante_rif", { required: true } )} placeholder="Ingrese RIF/Cédula"/>
                        {errors.responsable_rif?.type === 'required' && <span className="text-danger">Este campo es obligatorio</span>}
                    </div>
                    <div className="form-group">
                        <label className="control-label">Teléfono *</label>
                        <input type="text" name="responsable_telefono" autoComplete="off" className="form-control" {...register("representante_telefono", { required: true } )} placeholder="Ingrese la dirección"/>
                        {errors.responsable_telefono?.type === 'required' && <span className="text-danger">Este campo es obligatorio</span>}
                    </div>

                    <h4 className="card-title mt-5">Límite de vehículos por jornada</h4>
                    <hr/>
                    <div className="form-group">
                        <label className="control-label">Cantidad de vehículos *</label>
                        <input type="number" name="limite_vehiculos" autoComplete="off" className="form-control" {...register("limite_vehiculos", { required: true } )} placeholder="Ingrese la cantidad de vehículos"/>
                        {errors.limite_vehiculos?.type === 'required' && <span className="text-danger">Este campo es obligatorio</span>}
                    </div>

                </>

            }

            <button type="button" className="btn btn-inverse pull-right">Cancelar</button>
            <button type="submit" className="btn btn-success pull-right mr-2"> <i className="fa fa-check"></i> Guardar</button>
        </form>
    )
}
