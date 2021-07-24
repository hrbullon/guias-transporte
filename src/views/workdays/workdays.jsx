import { Fragment, useState, useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { startUpdatingWorkdays, startCreatingWorkdays, startCloseWorkdays , startLoadingWorkdays } from '../../actions/workdays'

import { useForm } from "react-hook-form"
import moment from 'moment';
import Swal from "sweetalert2"
import DataTable from 'react-data-table-component'
import DataTableExtensions from 'react-data-table-component-extensions'

import 'moment/locale/es';
import 'react-data-table-component-extensions/dist/index.css'
import { addItem, updateItem, deleteItem, } from "../../helpers/dataArray"

export const Workdays = () => {

    const dispatch = useDispatch()

    const { register, formState: { errors }, handleSubmit, reset } = useForm();

    //Aquí se almacena el listado de jornadas
    const [workdays, setWorkdays] = useState([])
    //Estas son las variables del state que se modifican
    //Cuando se crea, edita o elimina un 
    const { loaded, created, updated, closed } = useSelector(state => state.workdays)
    const [fechaEntrada, setFechaEntrada] = useState("")
    const [entradas, setEntradas] = useState([])

    /** Obtiene el listado de jornadas **/
    useEffect(() => {
        dispatch( startLoadingWorkdays() )
    }, []) 

    //Está pendiente si cambia el valor de loaded
    //En caso de cambiar es porque se creó cargaron las jornadas
    useEffect(() => {
        setWorkdays(loaded)
    }, [loaded])

    //Está pendiente si cambia el valor de created
    //En caso de cambiar es porque se creó correctamente la jornada
    useEffect(() => {
        
        const list = addItem(workdays, created)
        //Actualizo el listado de jornadas
        setWorkdays(list)
        //Limpio el formulario
        reset({})
        setEntradas([])

    }, [created])

    //Está pendiente si cambia el valor de updated
    //En caso de cambiar es porque se editó correctamente la jornada
    useEffect(() => {
        
        const list = updateItem(workdays, updated)
        //Actualizo el listado de jornadas
        setWorkdays(list)
        //Limpio el formulario
        reset({})
        setEntradas([])

    }, [updated])

    //Está pendiente si cambia el valor de deleted
    //En caso de cambiar es porque se eliminó correctamente la jornada
    useEffect(() => {
        dispatch( startLoadingWorkdays() )
    }, [closed])
    
    //Envia los datos del formularioe
    const onSubmit = (data) => {

        if(entradas.length > 0){
            
            const values = { ...data, fecha_entradas: entradas }

            if( data.id ) {
                dispatch( startUpdatingWorkdays( {...values} ) )
            }else{
                dispatch( startCreatingWorkdays( {...values} ) )
            }

        }else{
            Swal.fire({
                title: 'Datos requeridos',
                text: "Registre almenos una fecha de entrada",
                icon: 'warning'
            })
        }
    };

    const handleClearForm = () => {
        reset({})
        setEntradas([])
    }
    
    //Llena el state data con los datos de la jornada a editar
    const handleEdit = (item) => {
        reset(item)
        setEntradas(item.fecha_entradas)
    }
    
    //Dispara el evento que elimina un jornadas determinado
    const handleClose = (item) => {
        dispatch( startCloseWorkdays( item ) )
    }

    /***** Función para remover el día de entrada de la lista *****/
    const handleRemoveItem = (position) => {
        let rows = entradas
        let copy = [...rows]
        setEntradas([])
        copy.splice(position, 1);
        setEntradas(copy)
    }

    /***** Función para agregar en día de entrada a la lista *****/
    const handleAddItem = () => {

        if(fechaEntrada !== ""){
            let rows = entradas
            rows.push(fechaEntrada)
            setEntradas(rows)
            setFechaEntrada("")
        }
    } 

    //Inicializo estructura de culumnas de la tabla
    const columns = [
        {
            name: 'Inicio',
            selector: 'fecha_inicio',
            sortable: true,
        },
        {
            name: 'Fin',
            selector: 'fecha_fin',
            sortable: true,
        },
        {
            name: 'Token',
            selector: 'token',
            sortable: false,
        },
        {
            name: 'Estado',
            sortable: true,
            cell: row => (
                <span className={ (row.estado == "Abierta")? "open" : "closed" }>{row.estado}</span>
            )
        },
        {
            name: 'Acciones',
            sortable: false,
            right: true,
            cell: row => (
                <div> 
                    { /****** Capturo el evento click en el botón editar de cada fila******/ }
                    <i title="Editar" onClick={ (e) => handleEdit(row)  } className="mdi mdi-grease-pencil pointer mr-2"></i>
                    { /****** Capturo el evento click en el botón eliminar de cada fila******/ }
                    <i title="Cerrar" onClick={ (e) => handleClose(row)  } className="mdi mdi-lock pointer"></i>
                </div>)    
        }
    ]

    return (
        <Fragment>
            <div className="row">
                <div className="col-lg-5 col-xs-12 col-s-12">
                    <div className="card">
                        <div className="card-body">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <h4 className="card-title">Datos de Jornada</h4>
                                <hr/>
                                <div className="alert alert-info">
                                    <span>Los campos con el símbolo "*" son requeridos</span>
                                </div>
                                <div className="form-group">
                                    <label className="control-label">Token *</label>
                                    <input type="text" name="token" autoComplete="off" {...register("token", { required: true } )} className="form-control"/>
                                    { errors?.token?.type &&  (<span className="text-danger">Este campo es requerido</span>) }
                                </div>
                                <div className="form-group">
                                    <label className="control-label">Fecha Inicio *</label>
                                    <input type="date" name="fecha_inicio" autoComplete="off" {...register("fecha_inicio", { required: true } )} className="form-control"/>
                                    { errors?.fecha_inicio?.type &&  (<span className="text-danger">Este campo es requerido</span>) }
                                </div>
                                <div className="form-group">
                                    <label className="control-label">Fecha Fin *</label>
                                    <input type="date" name="fecha_fin" autoComplete="off" {...register("fecha_fin", { required: true } )} className="form-control"/>
                                    { errors?.fecha_fin?.type &&  (<span className="text-danger">Este campo es requerido</span>) }
                                </div>
                                <div className="form-group">
                                    <label className="control-label">Fecha Salida *</label>
                                    <input type="date" name="fecha_salida" autoComplete="off" {...register("fecha_salida", { required: true } )} className="form-control"/>
                                    { errors?.fecha_salida?.type &&  (<span className="text-danger">Este campo es requerido</span>) }
                                </div>
                                <div className="alert alert-info">
                                    Los días que agregue en este listado serán los dias en que pueden entrar los vehículos
                                </div>
                                <hr />
                                <div className="form-group">
                                    <label className="control-label">Fecha</label>
                                    <input type="date" value={ fechaEntrada } name="fecha_entrada" onChange={ (e) => setFechaEntrada( e.target.value ) }  className="form-control"/>
                                    <button onClick={ handleAddItem } type="button" className="btn btn-primary btn-100">Agregar</button>
                                </div>
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>Fecha</th>
                                            <th>Día</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {   entradas.length == 0 &&
                                        <tr className="alert alert-warning text-center"><td colspan="3">Debe agregar al menos una fecha</td></tr>
                                    }
                                    {
                                        Object.keys(entradas).map(index => {
                                            return (<tr key={index}>
                                                        <td>{ moment(entradas[index]).format("L")}</td>
                                                        <td>{ moment(entradas[index]).format("dddd") }</td>
                                                        <td ><i onClick={ (e) => handleRemoveItem(index)  }className="fa fa-trash"></i></td>
                                                    </tr>)
                                        })
                                    }   
                                    </tbody>
                                </table>
                                <button type="button" onClick={handleClearForm} className="btn btn-inverse pull-right">Cancelar</button>
                                <button type="submit" className="btn btn-success pull-right mr-2"> <i className="fa fa-check"></i> Guardar</button>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="col-lg-7 col-xs-12 col-sm-12">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">Listado de Jornadas</h4>
                            <hr/>
                            <DataTableExtensions
                                columns={columns}
                                data={ workdays }>
                                <DataTable
                                    noHeader
                                    pagination={ true }
                                    filter={true}/>
                            </DataTableExtensions>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
        
    )
}