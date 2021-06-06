import React, { useState, useEffect } from 'react'

import { useForm } from "react-hook-form"
import DataTable from 'react-data-table-component'
import 'react-data-table-component-extensions/dist/index.css'

export const Form = (props) => {

    const { register, formState: { errors }, handleSubmit, reset } = useForm();

    useEffect(() => {
        reset({...props.data})
    }, [props.data])
    
    const [fechaEntrada, setFechaEntrada] = useState()

    const columnsDays = [
        {
            name: 'Fecha',
            selector: 'entrada',
        },
        {
            name: 'Día',
            selector: 'dia',
        },
        {
            name: 'Eliminar',
            sortable: false,
            right: true,
            cell: row => (
                <div> 
                    { /****** Capturo el evento click en el botón eliminar de cada fila******/ }
                    <i title="Eliminar" onClick={ (e) => handleRemoveItem(row)  } className="mdi mdi-delete pointer"></i>
                </div>)    
        }
    ]

    /***** Función para remover el día de entrada de la lista *****/
    const handleRemoveItem = (item) => {

    }

    /***** Función para agregar en día de entrada a la lista *****/
    const handleAddItem = () => {
        
        let items = [ ...props.entradas.items ]
        const item = {
            entrada: fechaEntrada
        }

        items.push(item)

        props.setEntradas({
            ...props.entradas,
            items
        })
    } 

    return (
        <form onSubmit={handleSubmit(props.onSubmit)}>
            <h4 className="card-title">Datos de Jornada</h4>
            <hr/>
            <div className="alert alert-info">
                <span>Los campos con el símbolo "*" son requeridos</span>
            </div>
            <div class="form-group">
                <label className="control-label">Código de Jornada</label>
                <input type="text" autoComplete="off" className="form-control" disabled/>
                <span></span>
            </div>
            <div class="form-group">
                <label className="control-label">Token *</label>
                <input type="text" name="token" autoComplete="off" {...register("token", { required: true } )} className="form-control"/>
                { errors?.token?.type &&  (<span className="text-danger">Este campo es requerido</span>) }
            </div>
            <div class="form-group">
                <label className="control-label">Fecha Inicio *</label>
                <input type="date" name="fecha_inicio" autoComplete="off" {...register("fecha_inicio", { required: true } )} className="form-control"/>
                { errors?.fecha_inicio?.type &&  (<span className="text-danger">Este campo es requerido</span>) }
            </div>
            <div class="form-group">
                <label className="control-label">Fecha Fin *</label>
                <input type="date" name="fecha_fin" autoComplete="off" {...register("fecha_fin", { required: true } )} className="form-control"/>
                { errors?.fecha_fin?.type &&  (<span className="text-danger">Este campo es requerido</span>) }
            </div>
            <div className="alert alert-info">
                Los días que agregue en este listado serán los dias en que pueden entrar los vehículos
            </div>
            <hr />
            <div class="form-group">
                <label class="control-label">Fecha</label>
                <input type="date" name="fecha_entrada" value={ fechaEntrada } onChange={ (e) => setFechaEntrada( e.target.value ) }  class="form-control"/>
                <button onClick={ handleAddItem } type="button" className="btn btn-primary btn-100">Agregar</button>
            </div>
            { props.entradas.items.length == 0 &&
                <div className="alert alert-danger text-center mt-4">
                    Debe registrar al menos una fecha de entrada
                </div> 
            }
            <DataTable
                noHeader
                pagination={ false }
                columns={columnsDays}
                data={ props.entradas.items }/>
            <button type="button" className="btn btn-inverse pull-right">Cancelar</button>
            <button type="submit" className="btn btn-success pull-right mr-2"> <i className="fa fa-check"></i> Guardar</button>
        </form>
    )
}
