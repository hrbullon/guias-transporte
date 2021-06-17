import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import Select from 'react-select'

export const FormItems = (props) => {

    const { loaded:products } = useSelector(state => state.products);
    const { loaded:presentations } = useSelector(state => state.conversions);
    
    const [ inputs, setInputs ] = useState({
        producto:'',
        presentacion:'',
        cantidad:'',
        subtotal:'',
    })

    return (
        <div>
            <div className="row">
                <div className="col-lg-3">
                    <div class="form-group">
                        <label class="control-label">Producto</label>
                        <Select name="producto" isClearable={true} />
                    </div>
                </div>
                <div className="col-lg-3">
                    <div class="form-group">
                        <label class="control-label">Presentación</label>
                        <Select name="presentacion" isClearable={true} />
                    </div>
                </div>
                <div className="col-lg-3">
                    <div class="form-group">
                        <label class="control-label">Cantidad</label>
                        <input type="number" name="cantidad" class="form-control"/>
                    </div>
                </div>
                <div className="col-lg-3">
                    <div class="form-group">
                        <label class="control-label">Subtotal</label>
                        <input type="number" name="subtotal" value={ inputs.subtotal } disabled class="form-control"/>
                    </div>
                </div>
                <div className="col-lg-12 pt-4">
                    <button type="button" className="btn btn-primary pull-right">AGREGAR AL LISTADO</button>
                </div>
            </div>
        </div>
    )
}
