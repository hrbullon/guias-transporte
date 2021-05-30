import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux" 
import DataTable from 'react-data-table-component'

/*** Actions ***/
import { startLoadingPeople } from '../../actions/drivers'
import { startLoadingCompanies } from '../../actions/companies'
import { startLoadingVehicles } from '../../actions/vehicles'
import { startLoadingProducts } from '../../actions/products'

/*** Custom Hook ***/
import { useCustomForm } from '../../hooks/useCustomForm'

/*** Helpers Array ****/
import { prepareOptionsRif, prepareOptionsPlaca, prepareOptionsProduct } from '../../helpers/dataArray'
import { Basic } from './basic'
import { Company } from './company'
import { Vehicle } from './Vehicle'
import { Person } from './person'
import { FormItems } from './formItems'

export const Form = () => {

    const dispatch = useDispatch()
    const { loaded:companiesLoaded } = useSelector(state => state.companies )
    const { loaded:vehiclesLoaded } = useSelector(state => state.vehicles )
    const { loaded:driversLoaded } = useSelector(state => state.drivers )
    const { loaded:productsLoaded } = useSelector(state => state.products )

    const [ formValues, handleInputChange, reset ] = useCustomForm()
    
    /***** Options Values ****/
    const [ optionsCompanies, setOptionsCompanies] = useState({})
    const [ optionsVehicles, setOptionsVehicles] = useState({})
    const [ optionsPeople, setOptionsPeople] = useState({})
    const [ optionsProducts, setOptionsProducts] = useState({})

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
        { name: 'Producto', selector: 'producto'},
        { name: 'Presentación', selector: 'presentacion'},
        { name: 'Cantidad', selector: 'cantidad'},
        { name: 'Total', selector: 'total'},
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
        const options = prepareOptionsProduct( productsLoaded )
        setOptionsProducts( options )
    }, [productsLoaded])


    useEffect(() => {
        console.log(customInputs)
    }, [customInputs])

    //Envia los datos del formularioe
    const onSubmit = (data) => { 
        console.log(data);
    }
    
    return (
        <Fragment>
            <form onSubmit={onSubmit}>
                {/**** Datos básicos de la guía ****/}
                <Basic formState={ formValues } handleInputChange={ handleInputChange }/>

                {/**** Datos de importador y cliente receptor*/}
                <div className="row">
                    { /** Importador **/ }
                    <div className="col-lg-6">
                        {/** 
                         * Debido a que este componente se reutiliza se le debe pasar un parametro type
                         * Esto con la finalidad de saber si es un importador o cliente
                         * **/ }
                        <Company type="importador" customInputs={ customInputs } setCustomInputs={ setCustomInputs } optionsCompanies={ optionsCompanies }/>
                    </div>
                    { /** Cliente**/ }
                    <div className="col-lg-6">
                        <Company type="cliente" customInputs={ customInputs } setCustomInputs={ setCustomInputs } optionsCompanies={ optionsCompanies }/>
                    </div>
                </div>
                <div className="card" >
                    <div className="card-header">
                        Datos Vehículo/Conductor/Ayudante
                    </div>
                    <div className="card-body">
                        {/**** Datos del vehículo ****/}
                        <Vehicle customInputs={ customInputs } setCustomInputs={ setCustomInputs } optionsVehicles={ optionsVehicles }/>
                        
                        {/**** Datos del conductor****/}
                        <Person type="conductor" customInputs={ customInputs } setCustomInputs={ setCustomInputs } optionsPeople={ optionsPeople }/>
                    
                        {/**** Datos del ayudante****/}
                        <Person type="ayudante" customInputs={ customInputs } setCustomInputs={ setCustomInputs } optionsPeople={ optionsPeople }/>
                    </div>
                </div>
                <div className="card" >
                    <div className="card-header">
                        Datos de la carga
                    </div>
                    <div className="card-body">
                        {/**** Formulario de carga de productos ****/}
                        <FormItems customInputs={ customInputs } setCustomInputs={ setCustomInputs } optionsProducts={optionsProducts}/>
                        {/**** Listado de productos en la carga****/}
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
