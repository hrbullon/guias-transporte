import { Fragment, useState, useEffect } from "react"

import { useSelector, useDispatch } from "react-redux"

import Swal from "sweetalert2"
import DataTable from 'react-data-table-component'
import DataTableExtensions from 'react-data-table-component-extensions'
import 'react-data-table-component-extensions/dist/index.css'

import { startCreatingPeople, startDeletingPeople, startLoadingPeople, startUpdatingPeople } from "../../actions/people"
import { addItem, deleteItem, updateItem } from "../../helpers/dataArray"

import { Form } from "./form"
import { validatedPeople } from "../../helpers/checking"

const tipos = ["","Acompañante","Ayudante","Conductor"]

export const People = () => {

    const dispatch = useDispatch()
    //Aquí se almacena el listado de personas
    const [people, setPeople] = useState([])
    //Estas son las variables del state que se modifican
    //Cuando se crea, edita o elimina un 
    const { loaded, created, updated, deleted } = useSelector(state => state.people)
    const [data, setData] = useState()

    /** Obtiene el listado de personas **/
    useEffect( async () => {
        
        dispatch( startLoadingPeople() )
        
    },[]) 

    //Está pendiente si cambia el valor de loaded
    //En caso de cambiar es porque se cargaron correctamente las personas
    useEffect(() => {
        //Actualizo el listado de personas
        setPeople(loaded)
    }, [loaded])

    //Está pendiente si cambia el valor de created
    //En caso de cambiar es porque se creó correctamente el persona
    useEffect(() => {
        const list = addItem(people, created)
        //Limpio el formulario        
        setData({})
        setData({
            telefono:""
        })  
        //Actualizo el listado de personas
        setPeople(list)
    }, [created])

    //Está pendiente si cambia el valor de updated
    //En caso de cambiar es porque se editó correctamente el persona
    useEffect(() => {
        
        const list = updateItem(people, updated)
        //Actualizo el listado de personas
        setPeople(list)
        //Limpio el formulario
        setData({})
        setData({
            telefono:""
        })        
    }, [updated])

    //Está pendiente si cambia el valor de deleted
    //En caso de cambiar es porque se eliminó correctamente la persona
    useEffect(() => {
        
        const list = deleteItem(people, deleted)
        //Actualizo el listado de personas
        setPeople(list)

    }, [deleted])
    

    //Envia los datos del formularioe
    const onSubmit = async (data) => {

        const validated = await validatedPeople( data.rif, data.id)
        
        if(validated){
            if( data.id ) {
                dispatch( startUpdatingPeople( {...data} ) )
            }else{
                dispatch( startCreatingPeople( {...data} ) )
            }
        }else{
            Swal.fire({
                title: 'Error Cédula',
                html: `La cédula: <b>${ data.rif }</b> ya se encuentra registrada `,
                icon: 'warning'
            }) 
        }

    };
    
    //Llena el state data con los datos del persona a editar
    const handleEdit = (item) => {
        setData(item)
    }
    
    //Dispara el evento que elimina una persona determinado
    const handleRemove = (item) => {
        dispatch( startDeletingPeople( item ) )
    }

    //Inicializo estructura de culumnas de la tabla
    const columns = [
        {
            name: 'Nombre',
            selector: 'nombre',
            sortable: true,
        },
        {
            name: 'Apellido',
            selector: 'apellido',
            sortable: true,
        },
        {
            name: 'Cédula',
            selector: 'rif',
            sortable: true,
        },
        
        {
            name: 'Tipo',
            selector: 'tipo',
            sortable: true
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
                    <i title="Eliminar" onClick={ (e) => handleRemove(row)  } className="mdi mdi-delete pointer"></i>
                </div>)    
        }
    ]

    return (
        <Fragment>
            <div className="row">
                <div className="col-lg-5 col-xs-12 col-s-12">
                    <div className="card">
                        <div className="card-body">
                            <Form data={data} onSubmit={onSubmit}/>
                        </div>
                    </div>
                </div>
                <div className="col-lg-7 col-xs-12 col-sm-12">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">Listado de Personas</h4>
                            <hr/>
                            <DataTableExtensions
                                columns={columns}
                                data={ people }>
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
