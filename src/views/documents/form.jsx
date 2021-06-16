import React, { Fragment, useEffect, useState } from 'react'

import { useParams } from 'react-router'
import DataTable from 'react-data-table-component'
import { useDispatch, useSelector } from "react-redux" 
import Swal from 'sweetalert2'

/*** Actions ***/
import { startLoadingPeople } from '../../actions/drivers'
import { startLoadingCompanies } from '../../actions/companies'
import { startLoadingVehicles } from '../../actions/vehicles'
import { startLoadingProducts } from '../../actions/products'
import { startLoadingConversions } from '../../actions/conversion'

import { 
    startLoadingSigleDocument,
    startCreatingDocument, 
    startUpdatingDocument } from '../../actions/documents'

/*** Custom Hook ***/
import { useCustomForm } from '../../hooks/useCustomForm'

/*** Helpers Array ****/
import { Basic } from './basic'
import { Company } from './company'
import { Vehicle } from './Vehicle'
import { Person } from './person'
import { FormItems } from './formItems'

import { prepareOptionsRif, prepareOptionsPlaca, prepareOptionsSelect, prepareOptionsConversion } from '../../helpers/dataArray'

export const Form = (props) => {

    let { id } = useParams();

    const dispatch = useDispatch()
    /***** Estas variables cambian cuando se cargan los datos de 
     * vehiculos, empresas, conductores y productos*****/
    const { loaded:companiesLoaded } = useSelector(state => state.companies )
    const { loaded:vehiclesLoaded } = useSelector(state => state.vehicles )
    const { loaded:driversLoaded } = useSelector(state => state.drivers )
    const { loaded:productsLoaded } = useSelector(state => state.products )
    const { loaded:conversionsLoaded } = useSelector(state => state.conversions )
    const { document } = useSelector(state => state.documents )

    //Estas son las variables del state que se modifican
    //Cuando se crea, edita o documento
    const { created, updated } = useSelector(state => state.documents)

    let [ formValues, handleInputChange ] = useCustomForm({
        numero: '',
        origen:'',
        retorno:'',
        fecha:''
    })

    /***** Si el formulario está validado este state será true sino será false*****/
    const [validated, setValidated] = useState(true)
    
    /***** Options Values ****/
    const [ optionsCompanies, setOptionsCompanies] = useState({})
    const [ optionsVehicles, setOptionsVehicles] = useState({})
    const [ optionsPeople, setOptionsPeople] = useState({})
    const [ optionsProducts, setOptionsProducts] = useState({})
    const [ optionsConversions, setOptionsConversions] = useState({})

    const [ customInputs, setCustomInputs] = useState({
        importador:'',
        cliente:'',
        vehiculo:'',
        conductor: '',
        ayudante: '',
        items:[]
    })

    //Inicializo estructura de culumnas de la tabla de productos
    const columns = [
        { name: '#', selector: 'i'},
        { name: 'Producto', selector: 'producto_text'},
        { name: 'Presentación', selector: 'presentacion_text'},
        { name: 'Cantidad', selector: 'cantidad'},
        { name: 'Subtotal', selector: 'subtotal'},
        { name: 'Medida', selector: 'medida'},
    ]

    useEffect(() => {
        
        //Obtengo los datos de las empresas
        dispatch( startLoadingCompanies() )

        //Obtengo los datos de los vehiclos
        dispatch( startLoadingVehicles() )

        //Obtengo los datos de los conductores y ayudantes
        dispatch( startLoadingPeople() )

        //Obtengo los datos de los conductores y productos
        dispatch( startLoadingProducts() )
        
        //Obtengo los datos de las presentaciones de los productos
        dispatch( startLoadingConversions() )

        if(id && !document){
            dispatch( startLoadingSigleDocument(id) )
        }

    }, [])

    /*****
     * 
     * Efectos para escuchar cambios cuando se cargan los datos  
     * de empresas, vehiculos, conductores, ayudante y productos
     * 
     *****/
    useEffect(() => {
        const options = prepareOptionsRif( companiesLoaded )
        setOptionsCompanies( options )
    }, [companiesLoaded])

    useEffect(() => {
        const options = prepareOptionsPlaca( vehiclesLoaded )
        setOptionsVehicles( options )
    }, [vehiclesLoaded])

    useEffect(() => {
        const options = prepareOptionsRif( driversLoaded )
        setOptionsPeople( options )
    }, [driversLoaded])

    useEffect(() => {
        const options = prepareOptionsSelect( productsLoaded )
        setOptionsProducts( options )
    }, [productsLoaded])

    useEffect(() => {
        const options = prepareOptionsConversion( conversionsLoaded )
        setOptionsConversions( options )
    }, [conversionsLoaded])

    useEffect(() => {
        if(document){
            
            formValues.numero = document.numero
            formValues.origen = document.origen
            formValues.retorno = document.retorno
            formValues.fecha = document.fecha

            setCustomInputs({
                ...customInputs,
                vehiculo: document.vehiculo,
                importador: document.importador,
                cliente: document.cliente,
                conductor: document.conductor,
                ayudante: document.ayudante,
                items: [...document.items]
            })
        }
    }, [document])


    //Está pendiente si cambia el valor de created o updated
    //En caso de cambiar es porque se creó o editó correctamente el docuemento
    useEffect(() => {

        if(created !== null || updated !== null){
            props.history.push('/documents')
        }

    }, [created,updated])

    //Verifica que los campos requeridos del formulario tengan información
    const formValidate = () => {

        let flagformValues = true
        let flagCustomInputs = true

        Object.keys(formValues).map( (key) => {
            if( formValues[key] === ""){
                flagformValues = false
            }
        })
        
        Object.keys(customInputs).map( (key) => {
            if( customInputs[key] === "" || customInputs[key].length == 0){
                flagCustomInputs = false
            }
        })

        let flag = (!flagformValues || !flagformValues)? false : true
        setValidated(flag)
        return flag
    }

    //Envia los datos del formularioe
    const onSubmit = (e) => {

        e.preventDefault();

        if(formValidate()){
            const { importador, cliente, conductor, ayudante, vehiculo, items } = customInputs
            const data = { ...formValues, id, importador, cliente, conductor, ayudante, vehiculo, items }
    
            if( id ) {
                dispatch( startUpdatingDocument( {...data} ) )
            }else{
                dispatch( startCreatingDocument( {...data} ) )
            }
        }else{
            Swal.fire({
                title: 'Datos inválidos',
                text: "Complete los datos del formulario",
                icon: 'warning'
            })
        }
    }
    
    return (
        <Fragment>
            <form onSubmit={onSubmit}>
                {/**** Datos básicos de la guía ****/}
                <Basic formState={ formValues } validated={validated} handleInputChange={ handleInputChange }/>

                {/**** Datos de importador y cliente receptor*/}
                <div className="row">
                    { /** Importador **/ }
                    <div className="col-lg-6">
                        {/** 
                         * Debido a que este componente se reutiliza se le debe pasar un parametro type
                         * Esto con la finalidad de saber si es un importador o cliente
                         * **/ }
                        <Company type="importador" validated={validated} selected={customInputs.importador} customInputs={ customInputs } setCustomInputs={ setCustomInputs } optionsCompanies={ optionsCompanies }/>
                    </div>
                    { /** Cliente**/ }
                    <div className="col-lg-6">
                        <Company type="cliente" validated={validated} selected={customInputs.cliente} customInputs={ customInputs } setCustomInputs={ setCustomInputs } optionsCompanies={ optionsCompanies }/>
                    </div>
                </div>
                <div className="card" >
                    <div className="card-header">
                        Datos Vehículo/Conductor/Ayudante
                    </div>
                    <div className="card-body">
                    </div>
                </div>
                <div className="card" >
                    <div className="card-header">
                        Datos de la carga
                    </div>
                    <div className="card-body">
                        {/**** Formulario de carga de productos ****/}
                        <FormItems customInputs={ customInputs } setCustomInputs={ setCustomInputs } optionsProducts={optionsProducts} optionsConversions={optionsConversions}/>
                        {/**** Listado de productos en la carga****/}
                        { customInputs.items.length == 0 && !validated &&
                            <div className="alert alert-danger text-center mt-4">
                                Debe registrar al menos un producto en la carga
                            </div> 
                        }
                        <DataTable
                            columns={columns}
                            data={ customInputs.items }
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="card" >
                            <div className="card-body">
                                <button type="button" className="btn btn-inverse pull-right">Cancelar</button>
                                <button type="submit" className="btn btn-success pull-right mr-2"> <i className="fa fa-check"></i> Guardar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </Fragment>
    )
}
