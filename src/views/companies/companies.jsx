import { Fragment, useState, useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { startCreatingCompany ,startUpdatingCompany, startDeletingCompany, startLoadingCompanies } from '../../actions/companies'

import Swal from "sweetalert2"
import DataTable from 'react-data-table-component'
import DataTableExtensions from 'react-data-table-component-extensions'
import 'react-data-table-component-extensions/dist/index.css'

import { Form } from "./form"
import { validatedCompany } from "../../helpers/checking"

export const Companies = () => {

    const dispatch = useDispatch()
    //Estas son las variables del state que se modifican
    //Cuando se crea, edita o elimina un 
    const { loaded: companies, created, updated, deleted } = useSelector(state => state.companies)
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

        dispatch( startLoadingCompanies(filter) )

    },[]) 

    //Está pendiente si cambia el valor de created
    //En caso de cambiar es porque se creó correctamente el empresa
    useEffect(() => {

        if(created){
            //Actualizo el listado de empresas
            setData({})
            setData({
                representante_telefono:'',
                responsable_telefono:''
            })
    
            dispatch( startLoadingCompanies(type) )
        }

    }, [created])

    //Está pendiente si cambia el valor de updated
    //En caso de cambiar es porque se editó correctamente el empresa
    useEffect(() => {

        if(updated){
            //Limpio el formulario
            setData({})
            setData({
                representante_telefono:'',
                responsable_telefono:''
            })
    
            dispatch( startLoadingCompanies(type) )
        }

    }, [updated])

    //Está pendiente si cambia el valor de deleted
    //En caso de cambiar es porque se eliminó correctamente el empresa
    useEffect(() => {
        if(deleted){
            dispatch( startLoadingCompanies(type) )
        }
    }, [deleted])
    
    //Envia los datos del formularioe
    const onSubmit = async (data) => {
        let { id, rif, nombre, direccion, estado, limite_vehiculos, municipio, parroquia } = data

        let values = { 
            id, rif, nombre, direccion, estado, limite_vehiculos, municipio, parroquia, type, 
            representante: { 
                rif: data.representante_rif,
                nombre: data.representante_nombre,
                telefono: data.representante_telefono
            },
            responsable: {
                rif: data.responsable_rif,
                nombre: data.responsable_nombre,
                telefono: data.responsable_telefono
            } 
        }

        const validate = await validatedCompany( data.rif, data.id )

        if(validate){
            if( data.id ) {
                dispatch( startUpdatingCompany( {type: type,...values} ) )
            }else{
                dispatch( startCreatingCompany( {type: type,...values} ) )
            }
        }else{
            Swal.fire({
                title: 'Error RIF/Cédula',
                html: `La Cédula/RIF: <b>${ data.rif }</b> ya se encuentra registrada `,
                icon: 'warning'
            }) 
        }
    };
    
    //Llena el state data con los datos del empresa a editar
    const handleEdit = (item) => {
        //setData(item)
        let responsable = {}

        if(item.type == "TYPE_COMPANY"){
            responsable = {
                responsable_rif: item.responsable.rif,
                responsable_nombre: item.responsable.nombre,
                responsable_telefono: item.responsable.telefono
            }
        }
        
        setData({
            ...item,
            representante_rif: item.representante.rif,
            representante_nombre: item.representante.nombre,
            representante_telefono: item.representante.telefono,
            ...responsable
        })
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
            selector: 'representante.telefono',
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
