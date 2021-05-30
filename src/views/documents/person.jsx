import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import { useSelector } from 'react-redux'

import { getItem } from '../../helpers/dataArray'

export const Person = (props) => {

    const { loaded:items } = useSelector(state => state.drivers)
    const [ inputs, setInputs ] = useState({
        cedula:'',
        nombre:'',
        telefono:''
    })

    /**** Relleno la información correspondiente a la cédula seleccionada ****/
    const setInfoPerson = ( input ) => {
        if(input){
            
            const info = getItem(items, input.value)
            setInputs({
                ...inputs,
                cedula: info.cedula,
                nombre: info.nombre + ' '+info.apellido,
                telefono: info.telefono
            })
            
            if(props.type === "conductor"){
                props.setCustomInputs({
                    ...props.customInputs,
                    conductor: input.value   
                })
            }

            if(props.type === "ayudante"){
                props.setCustomInputs({
                    ...props.customInputs,
                    ayudante: input.value   
                })
            }

        }else{

            setInputs({
                cedula: '',
                nombre: '',
                telefono: ''
            })

            clearCustomInputs()
        }
    }

    /**** 
     * Esta función es utilizada para limpiar los campos personalizados 
     * Estos campos son importador,cliente,conductor,ayudante
     * Dichos campos guardan los id correspondientes a cada item
     * ****/
     const clearCustomInputs = () => {
        /**** Si el campo personalizado es conductor ****/
        if(props.type === "conductor"){
            props.setCustomInputs({
                ...props.customInputs,
                conductor: ""  
            })
        }

        /**** Si el campo personalizado es ayudante ****/
        if(props.type === "ayudante"){
            props.setCustomInputs({
                ...props.customInputs,
                ayudante: ""  
            })
        }
    }

    return (
        <div>
            <b>Datos del {props.type}</b>
            <hr />
            <div class="row">
                <div class="col-lg-4 col-s-12 col-xs-12">
                    <div class="form-group">
                        <label class="control-label">Cédula</label>
                        <Select name="cedula" onChange={ setInfoPerson } isClearable={true} options={props.optionsPeople} />
                    </div>
                </div>
                <div class="col-lg-4 col-s-12 col-xs-12">
                    <div class="form-group">
                        <label class="control-label">Nombre</label>
                        <input type="text" name="nombre" value={ inputs.nombre } class="form-control" disabled/>
                    </div>
                </div>
                <div class="col-lg-4 col-s-12 col-xs-12">
                    <div class="form-group">
                        <label class="control-label">Teléfono</label>
                        <input type="text" name="telefono" value={ inputs.telefono } class="form-control" disabled/>
                    </div>
                </div>
            </div>
        </div>
    )
}
