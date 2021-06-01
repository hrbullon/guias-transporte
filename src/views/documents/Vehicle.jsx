import React, { useState, useEffect } from 'react'
import Select from 'react-select'
import { useSelector } from 'react-redux'

import { getItem } from '../../helpers/dataArray'

export const Vehicle= (props) => {

    const { loaded:items } = useSelector(state => state.vehicles)
    
    const [ inputs, setInputs ] = useState({
        marca:'',
        modelo:'',
        color:''
    })

    const [ idVehicle, setIdVehicle] = useState({
        value:'',
        label:''
    })

    useEffect(() => {
        
        const value = props.selected
        if(value){
            const info = getItem(items, value)
            setIdVehicle({ value: info.id, label: info.placa })   
            setVehicle(info)
        }

    }, [props.selected])

    /**** Relleno el formulario con los datos del vehículo ****/
    const setVehicle = (info) => {
        setInputs({
            ...inputs,
            marca: info.marca,
            modelo: info.modelo,
            color: info.color
        })
    }

    /**** Relleno la información correspondiente a la placa seleccionada ****/
    const setInfoVehicle = ( input ) => {
        if(input){
            
            const info = getItem(items, input.value)
            setVehicle(info)

            props.setCustomInputs({
                ...props.customInputs,
                vehiculo: input.value   
            })

        }else{
            clearInputs()
        }
    }

    const clearInputs = () => {
        /**** Limpia los datos del vehículo ****/
        setInputs({
            marca:'',
            modelo:'',
            color:''
        })

        /**** Coloca vacío el campo vehículo ****/
        props.setCustomInputs({
            ...props.customInputs,
            vehicle: ""  
        })
    }

    return (
    <div>
        <b>Datos del Vehículo</b>
        <hr />
        <div class="row">
            <div class="col-lg-3 col-s-12 col-xs-12">
                <div class="form-group">
                    <label class="control-label">Placa</label>
                    <Select name="placa" value={ idVehicle } onChange={ setInfoVehicle } isClearable={true} options={props.optionsVehicles} />
                </div>
            </div>
            <div class="col-lg-3 col-s-12 col-xs-12">
                <div class="form-group">
                    <label class="control-label">Marca</label>
                    <input type="text" name="marca" value={ inputs.marca } class="form-control" disabled/>
                </div>
            </div>
            <div class="col-lg-3 col-s-12 col-xs-12">
                <div class="form-group">
                    <label class="control-label">Modelo</label>
                    <input type="text" name="modelo" value={ inputs.modelo } class="form-control" disabled/>
                </div>
            </div>
            <div class="col-lg-3 col-s-12 col-xs-12">
                <div class="form-group">
                    <label class="control-label">Color</label>
                    <input type="text" name="color" value={ inputs.color } class="form-control" disabled/>
                </div>
            </div>
        </div>    
    </div>
    )
}
