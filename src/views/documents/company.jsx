import React, { useState, useEffect } from 'react'
import Select from 'react-select'
import { useSelector } from 'react-redux'

import { getItem } from '../../helpers/dataArray'

export const Company = (props) => {

    const { loaded:items } = useSelector(state => state.companies)
    
    /**** Inicializa los valores de los campos personalizados ****/
    const [ inputs, setInputs ] = useState({
        nombre:'',
        direccion:'',
        representante_rif:'',
        representante_nombre:'',
        representante_telefono:'',
    })

    const [ idCompany, setIdEmpresa] = useState({
        value:'',
        label:''
    })

    useEffect(() => {
        
        const value = props.selected
        if(value){
            const info = getItem(items, value)
            setIdEmpresa({ value: info.id, label: info.rif })   
            setCompany(info)
        }

    }, [props.selected])

    /**** Relleno el formulario con los datos de la empresa ****/
    const setCompany = (info) => {
        setInputs({
            ...inputs,
            nombre: info.nombre,
            direccion: info.direccion,
            representante_rif: info.representante_rif,
            representante_nombre: info.representante_nombre,
            representante_telefono: info.representante_telefono
        })
    }

    /**** Relleno la información correspondiente a la empresa seleccionada ****/
    const setInfoCompany = ( input ) => {
        if(input){
            
            const info = getItem(items, input.value)
            setCompany(info)

            if(props.type === "importador"){
                props.setCustomInputs({
                    ...props.customInputs,
                    importador: input.value   
                })
            }

            if(props.type === "cliente"){
                props.setCustomInputs({
                    ...props.customInputs,
                    cliente: input.value   
                })
            }

        }else{
            clearInputs()
        }
    }

    /**** 
     * Esta función es utilizada para limpiar los campos del formulario 
     * ****/
    const clearInputs = () => {

        /**** Se encarga de vaciar los campos
         * nombre, direccion, rif, nombre y telefono del representante
         */
        setInputs({
            nombre:'',
            direccion:'',
            representante_rif:'',
            representante_nombre:'',
            representante_telefono:'',
        })

        setIdEmpresa({
            value:'',
            label:''
        })

        /**** Si el campo personalizado es importador ****/
        if(props.type === "importador"){
            props.setCustomInputs({
                ...props.customInputs,
                cliente: ""  
            })
        }

        /**** Si el campo personalizado es cliente ****/
        if(props.type === "cliente"){
            props.setCustomInputs({
                ...props.customInputs,
                cliente: ""  
            })
        }
    }

    return (
        <div className="card" >
            <div className="card-header">
                Datos del Importador
            </div>
            <div className="card-body">
                <div className="row">
                    <div className="col-lg-6">
                        <b>Datos Empresa</b>
                        <hr />
                            <label class="control-label">Rif</label>
                        <div class="form-group">
                            <Select name="rif" value={ idCompany } onChange={setInfoCompany} isClearable={true} options={props.optionsCompanies} />
                            { idCompany.value == "" && !props.validated && <span className="text-danger">Este campo es requerido</span>}
                        </div>
                        <div class="form-group">
                            <label class="control-label">Nombre/Razón Social</label>
                            <input type="text" name="nombre" value={ inputs.nombre } class="form-control" disabled/>
                        </div>
                        <div class="form-group">
                            <label class="control-label">Dirección</label>
                            <input type="text" name="direccion" value={ inputs.direccion } class="form-control" disabled/>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <b>Datos Rpte. Legal</b>
                        <hr />
                        <div class="form-group">
                            <label class="control-label">Cédula/Pasaporte</label>
                            <input type="text" name="representante_rif" value={ inputs.representante_rif } class="form-control" disabled/>
                        </div>
                        <div class="form-group">
                            <label class="control-label">Nombre/Razón Social</label>
                            <input type="text" name="representante_nombre" value={ inputs.representante_nombre } class="form-control" disabled/>
                        </div>
                        <div class="form-group">
                            <label class="control-label">Teléfonos</label>
                            <input type="text" name="representante_telefono" value={ inputs.representante_telefono } class="form-control" disabled/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
