import React, { useState } from 'react'
import Select from 'react-select'

import { useCustomForm } from '../../hooks/useCustomForm'

export const FormItems = (props) => {

    const [ options, setOptions] = useState([
        {
            value:'1',
            label:'SACO 50 KG'
        },
        {
            value:'2',
            label:'CAJA 24 UNI'
        },
        {
            value:'3',
            label:'KG'
        },
    ])

    const [ formValues, handleInputChange, reset ] = useCustomForm()

    const handleAddItem = () => {

        const item = {
            i: (props.customInputs.items.length + 1),
            producto: 'TEST',
            presentacion: 'dasd',
            cantidad: '12312',
            total: '123123'
        }

        let items = [ ...props.customInputs.items ]
        items.push(item)

        props.setCustomInputs({
            ...props.customInputs,
            items: items
        })
    }

    return (
        <div>
            <div className="row">
                <div className="col-lg-3">
                    <div class="form-group">
                        <label class="control-label">Producto</label>
                        <Select name="producto"  isClearable={true} options={props.optionsProducts} />
                    </div>
                </div>
                <div className="col-lg-3">
                    <div class="form-group">
                        <label class="control-label">Presentación</label>
                        <Select name="presentacion" isClearable={true} options={options} />
                    </div>
                </div>
                <div className="col-lg-3">
                    <div class="form-group">
                        <label class="control-label">Cantidad</label>
                        <input type="text" name="cantidad" onChange={ handleInputChange } class="form-control"/>
                    </div>
                </div>
                <div className="col-lg-3">
                    <div class="form-group">
                        <label class="control-label">Total</label>
                        <input type="text" name="total" disabled class="form-control"/>
                    </div>
                </div>
                <div className="col-lg-12 pt-4">
                    <button type="button" onClick={ handleAddItem } className="btn btn-primary pull-right">AGREGAR AL LISTADO</button>
                </div>
            </div>
        </div>
    )
}
