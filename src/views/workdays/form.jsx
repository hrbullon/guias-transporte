import React from 'react'

import DataTable from 'react-data-table-component'
import 'react-data-table-component-extensions/dist/index.css'

export const Form = (props) => {


    const columnsDays = [
        {
            name: 'Fecha',
            selector: 'entrada',
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

    const onSubmit = (e) => {

        e.preventDefault();
    
        console.log(formValues);
    }    


    /***** Función para remover el día de entrada de la lista *****/
    const handleRemoveItem = (item) => {

    }

    /***** Función para agregar en día de entrada a la lista *****/
    const handleAddItem = () => {
        
        let items = [ ...formValues.entradas ]
        items.push({ entrada: formValues.fecha_entrada })

        reset({
            ...formValues.entradas,
            entradas: {...items}
        })

        console.log(items);
    } 

    return (
        <form onSubmit={onSubmit}>
            <h4 className="card-title">Datos de Jornada</h4>
            <hr/>
            <div className="alert alert-info">
                <span>Los campos con el símbolo "*" son requeridos</span>
            </div>
            <div class="form-group">
                <label className="control-label">Fecha Inicio *</label>
                <input type="date" name="fecha_inicio" autoComplete="off" className="form-control"/>
            </div>
            <div class="form-group">
                <label className="control-label">Fecha Fin *</label>
                <input type="date" name="fecha_fin" autoComplete="off" className="form-control"/>
            </div>
            <div className="alert alert-info">
                Los días que agregue en este listado serán los dias en que pueden entrar los vehículos
            </div>
            <hr />
            <div class="form-group">
                <label class="control-label">Fecha</label>
                <input type="date" name="fecha_entrada" class="form-control"/>
                <button onClick={ handleAddItem } type="button" className="btn btn-primary btn-100">Agregar</button>
            </div>
            <DataTable
                noHeader
                pagination={ false }
                columns={columnsDays}
                data={ props.entradas }/>
            <button type="button" className="btn btn-inverse pull-right">Cancelar</button>
            <button type="submit" className="btn btn-success pull-right mr-2"> <i className="fa fa-check"></i> Guardar</button>
        </form>
    )
}
