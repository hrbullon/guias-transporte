import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useForm } from "react-hook-form"

import Select from 'react-select'

import { getItem, prepareOptionsRif } from '../../helpers/dataArray'

export const Person = () => {

    const { register, formState: { errors }, handleSubmit, setValue, setError, reset } = useForm();

    const { loaded: people } = useSelector(state => state.people)

    const [ items, setItems] = useState([])

    const [ inputs, setInputs ] = useState({
        nombre:'',
        apellido:'',
        telefono:''
    })

    const [ idPerson, setIdPerson] = useState({
        value:'',
        label:''
    })

    useEffect(() => {
        
        const options = prepareOptionsRif( people )
        setItems( options )

    }, [people])

    useEffect(() => {
        
        if(idPerson.value){

            const { nombre, apellido, telefono } = getItem(people, idPerson.value)
            
            setInputs({ 
                nombre, 
                apellido,
                telefono 
            })

        }else{
            setInputs({ 
                nombre: "", 
                apellido: "",
                telefono: "" 
            })
        }

    }, [idPerson])

    const handleChangingRif = (input) => {
        if(input){
            setIdPerson(input)
        } else {
            setIdPerson({value:"", label: "Seleccione una cédula"})
        }
    }

    return (
        <div>
            <div class="form-group">
                <label class="control-label">Cédula</label>
                <Select name="cedula" value={ idPerson } onChange={ handleChangingRif } isClearable={true} options={ items } />
            </div>
            <div class="form-group">
                <label class="control-label">Nombre</label>
                <input value={ inputs.nombre } type="text" disabled className="form-control"/>
            </div>
            <div class="form-group">
                <label class="control-label">Apellido</label>
                <input value={ inputs.apellido } type="text" disabled className="form-control"/>
            </div>
            <div class="form-group">
                <label class="control-label">Teléfono</label>
                <input value={ inputs.telefono } type="text" disabled className="form-control"/>
            </div>
        </div>
    )
}
