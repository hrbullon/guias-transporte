import { Fragment, useState, useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { startCreatingUser ,startUpdatingUser, startResetingPassword, startDeletingUser } from '../../actions/users'

import DataTable from 'react-data-table-component'
import DataTableExtensions from 'react-data-table-component-extensions'
import 'react-data-table-component-extensions/dist/index.css'

import { Form } from "./form"
import { addItem, updateItem, deleteItem, } from "../../helpers/dataArray"
import { db } from "../../firebase/firebase-config"

export const Users = () => {

    const dispatch = useDispatch()
    //Aquí se almacena el listado de usuarios
    const [users, setUsers] = useState([])
    //Estas son las variables del state que se modifican
    //Cuando se crea, edita o elimina un usuario
    const { created, updated, deleted } = useSelector(state => state.users)
    const [data, setData] = useState()
    const [password, setPassword] = useState(true)

    /** Obtiene el listado de usuarios **/
    useEffect( async () => {
        
        const usersSnap = await db.collection(`users`).get()
        const users = []

        usersSnap.forEach( snap => {
            users.push({
                id: snap.id,
                ...snap.data()
            })
        })

        setUsers(users)
    },[]) 

    //Está pendiente si cambia el valor de created
    //En caso de cambiar es porque se creó correctamente el usuario
    useEffect(() => {

        const list = addItem(users, created)
        //Actualizo el listado de usuarios
        setUsers(list)
        setData({})

    }, [created])

    //Está pendiente si cambia el valor de updated
    //En caso de cambiar es porque se editó correctamente el usuario
    useEffect(() => {
        
        const list = updateItem(users, updated)
        //Actualizo el listado de usuarios
        setUsers(list)
        //Limpio el formulario
        setData({})
        setData({ empresa: "" })
        setPassword(true)

    }, [updated])

    //Está pendiente si cambia el valor de deleted
    //En caso de cambiar es porque se eliminó correctamente el usuario
    useEffect(() => {
        
        const list = deleteItem(users, deleted)
        //Actualizo el listado de usuarios
        setUsers(list)

    }, [deleted])
    
    //Envia los datos del formularioe
    const onSubmit = (data) => {
       
        if( data.id ) {
            dispatch( startUpdatingUser( {...data} ) )
        }else{
            dispatch( startCreatingUser( {...data} ) )
        }
    };
    
    //Llena el state data con los datos del usuario a editar
    const handleEdit = (item) => {
        setPassword(false)
        setData(item)
    }

    //Enviar link de restablecer contaseña
    const handleResetPassword = (item) => {
        dispatch( startResetingPassword(item.email) )
    }
    
    //Dispara el evento que elimina un usuario determinado
    const handleRemove = (item) => {
        //Limpio el formulario
        setData({})
        dispatch( startDeletingUser( item ) )
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
            name: 'Correo Electrónico',
            selector: 'email',
            sortable: true,
        },
        {
            name: 'Acciones',
            sortable: false,
            right: true,
            cell: row => (
                <div> 
                    { /****** Capturo el evento click en el botón editar de cada fila******/ }
                    <i title="Editar" onClick={ (e) => handleEdit(row)  } className="mdi mdi-grease-pencil pointer mr-2"></i>
                    <i title="Restablecer Contraseña" onClick={ (e) => handleResetPassword(row)  } className="mdi mdi-email pointer mr-2"></i>
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
                            <Form password={password} data={data} onSubmit={onSubmit}/>
                        </div>
                    </div>
                </div>
                <div className="col-lg-7 col-xs-12 col-sm-12">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">Listado de Usuarios</h4>
                            <hr/>
                            <DataTableExtensions
                                columns={columns}
                                data={ users }>
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
