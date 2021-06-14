import { Fragment, useState, useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { startCreatingCompany ,startUpdatingCompany, startDeletingCompany } from '../../actions/companies'

import DataTable from 'react-data-table-component'
import DataTableExtensions from 'react-data-table-component-extensions'
import 'react-data-table-component-extensions/dist/index.css'

import { Form } from "./form"
import { addItem, updateItem, deleteItem, } from "../../helpers/dataArray"
import { db } from "../../firebase/firebase-config"

export const Companies = () => {

    const dispatch = useDispatch()
    //Aquí se almacena el listado de empresas
    const [companies, setCompanies] = useState({})
    //Estas son las variables del state que se modifican
    //Cuando se crea, edita o elimina un 
    const { created, updated, deleted } = useSelector(state => state.companies)
    const [data, setData] = useState()
    const [type, setType] = useState("")
    const [title, setTitle] = useState("")

    /** Obtiene el listado de empresas **/
    useEffect( async () => {

        const path = window.location.href
        let filter = "TYPE_COMPANY"

        if(/companies/.test(path)){
            setType("TYPE_COMPANY")
            setTitle("Empresa")
        }else{
            setType("TYPE_CUSTOMER")
            setTitle("Cliente")
            filter = "TYPE_CUSTOMER"
        }

        const companiesSnap = await db.collection(`companies`).where("type","==",filter).get()
        const companies = []

        companiesSnap.forEach( snap => {
            companies.push({
                id: snap.id,
                ...snap.data()
            })
        })

        setCompanies(companies)
    },[]) 

    //Está pendiente si cambia el valor de created
    //En caso de cambiar es porque se creó correctamente el empresa
    useEffect(() => {

        const list = addItem(companies, created)
        //Actualizo el listado de empresas
        setCompanies(list)
        setData({})
        setData({
            representante_telefono:'',
            responsable_telefono:''
        })
    }, [created])

    //Está pendiente si cambia el valor de updated
    //En caso de cambiar es porque se editó correctamente el empresa
    useEffect(() => {
        
        const list = updateItem(companies, updated)
        //Actualizo el listado de empresas
        setCompanies(list)
        //Limpio el formulario
        setData({})
        setData({
            representante_telefono:'',
            responsable_telefono:''
        })

    }, [updated])

    //Está pendiente si cambia el valor de deleted
    //En caso de cambiar es porque se eliminó correctamente el empresa
    useEffect(() => {
        
        const list = deleteItem(companies, deleted)
        //Actualizo el listado de empresas
        setCompanies(list)

    }, [deleted])
    
    //Envia los datos del formularioe
    const onSubmit = (data) => {
        
        if( data.id ) {
            dispatch( startUpdatingCompany( {type: type,...data} ) )
        }else{
            dispatch( startCreatingCompany( {type: type,...data} ) )
        }
    };
    
    //Llena el state data con los datos del empresa a editar
    const handleEdit = (item) => {
        setData(item)
    }
    
    //Dispara el evento que elimina un empresa determinado
    const handleRemove = (item) => {
        setData({})
        dispatch( startDeletingCompany( item ) )
    }

    //Inicializo estructura de culumnas de la tabla
    const columns = [
        {
            name: 'Nombre/R. Social',
            selector: 'nombre',
            sortable: true,
        },
        {
            name: 'Rif',
            selector: 'rif',
            sortable: true,
        },
        {
            name: 'Teléfono',
            selector: 'representante_telefono',
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
                            <Form 
                                title={title} 
                                data={data}
                                onSubmit={onSubmit}/>
                        </div>
                    </div>
                </div>
                <div className="col-lg-7 col-xs-12 col-sm-12">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">Listado de { title }s</h4>
                            <hr/>
                            <DataTableExtensions
                                columns={columns}
                                data={ companies }>
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
