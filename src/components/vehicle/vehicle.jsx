import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useForm } from "react-hook-form"

import Select from 'react-select'

import { getItem, prepareOptionsPlaca } from '../../helpers/dataArray'

export const Vehicle = (props) => {

    const { loaded: vehicles } = useSelector(state => state.vehicles)

    const [ items, setItems] = useState([])

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
        setIdVehicle({value:'',label:'Seleccione un vehículo'})
    }, [])

    useEffect(() => {
        
        const options = prepareOptionsPlaca( vehicles )
        setItems( options )

    }, [vehicles])

    useEffect(() => {
        
        if(idVehicle.value){

            const info = getItem(vehicles, idVehicle.value)    

            setInputs({ 
                marca: info.marca.nombre, 
                modelo: info.modelo.nombre,
                color: info.color 
            })
        }else{
            setInputs({ 
                marca: "", 
                modelo: "",
                color: "" 
            })
        }

    }, [idVehicle])

    const handleChangingPlaca = (input) => {
        
        if(input){
            setIdVehicle(input)            
        }else{
            setIdVehicle({ value:"", label:"Seleccione un vehículo"})            
        }
    }

    return (
        <div>
            <div class="form-group">
                <label class="control-label">Placa</label>
                <Select name="vehiculo" value={ idVehicle } onChange={ handleChangingPlaca } isClearable={true} options={items} />
            </div>
            <div class="form-group">
                <label class="control-label">Marca</label>
                <input type="text" value={ inputs.marca } disabled className="form-control"/>
            </div>
            <div class="form-group">
                <label class="control-label">Modelo</label>
                <input value={ inputs.modelo } type="text" disabled className="form-control"/>
            </div>
            <div class="form-group">
                <label class="control-label">Color</label>
                <input value={ inputs.color } type="text" disabled className="form-control"/>
            </div>
        </div>
    )
}
