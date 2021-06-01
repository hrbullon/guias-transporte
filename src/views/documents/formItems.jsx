import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import Select from 'react-select'

import { getItem } from '../../helpers/dataArray'

export const FormItems = (props) => {

    const { loaded:products } = useSelector(state => state.products);
    const { loaded:presentations } = useSelector(state => state.conversions);
    
    const [ inputs, setInputs ] = useState({
        producto:'',
        presentacion:'',
        cantidad:'',
        subtotal:'',
    })

    useEffect(() => {
        //Si el usuario seleccionó una presentación
        //Realiza el cálculo del subtotal
        if(inputs.presentacion !== ""){

            const presentation = getItem(presentations, inputs.presentacion)
            const subtotal = inputs.cantidad * parseFloat(presentation.contenido)
            setInputs({
                ...inputs,
                subtotal
            })
        }

    }, [inputs.cantidad])

    const handleAddItem = () => {

        //Obtengo el  objeto con la información del productp
        const product = getItem(products, inputs.producto)
        const presentation = getItem(presentations, inputs.presentacion)
        
        let items = [ ...props.customInputs.items ]
        const item = {
            i: (props.customInputs.items.length + 1),
            producto:`products/${ inputs.producto }`,
            producto_text: product.nombre,
            presentacion:`conversion_table/${ inputs.presentacion }`,
            presentacion_text: presentation.presentacion,
            cantidad: inputs.cantidad,
            subtotal: inputs.subtotal,
            medida: presentation.unidad_medida_text
        }

        items.push(item)

        props.setCustomInputs({
            ...props.customInputs,
            items: items
        })

        //Limpio el formulario
        cleanInputsForm()

    }

    /**** Limpia los campos del formulario de productos de carga *****/
    const cleanInputsForm = () => {
        setInputs({
            producto:'',
            presentacion:'',
            cantidad:'',
            subtotal:'',
        })
    }

    /**** Obtengo el id del producto ****/
    const handleChangeProduct = ( input ) => {

        if(input){
            setInputs({
                ...inputs,
                producto: input.value
            })
        }else{
            setInputs({
                ...inputs,
                producto:''
            })
        }
        
    }

    /**** Obtengo el id de la presentación del producto ****/
    const handleChangePresentation = ( input ) => {
        if(input){
            setInputs({
                ...inputs,
                presentacion: input.value
            })
        }else{
            setInputs({
                ...inputs,
                presentacion:''
            })
        }
    }

    return (
        <div>
            <div className="row">
                <div className="col-lg-3">
                    <div class="form-group">
                        <label class="control-label">Producto</label>
                        <Select name="producto" onChange={ handleChangeProduct } isClearable={true} options={props.optionsProducts} />
                    </div>
                </div>
                <div className="col-lg-3">
                    <div class="form-group">
                        <label class="control-label">Presentación</label>
                        <Select name="presentacion" onChange={ handleChangePresentation } isClearable={true} options={props.optionsConversions} />
                    </div>
                </div>
                <div className="col-lg-3">
                    <div class="form-group">
                        <label class="control-label">Cantidad</label>
                        <input type="number" name="cantidad" value={ inputs.cantidad } onChange={ (e) => setInputs({...inputs, cantidad: e.target.value }) } class="form-control"/>
                    </div>
                </div>
                <div className="col-lg-3">
                    <div class="form-group">
                        <label class="control-label">Subtotal</label>
                        <input type="number" name="subtotal" value={ inputs.subtotal } disabled class="form-control"/>
                    </div>
                </div>
                <div className="col-lg-12 pt-4">
                    <button type="button" onClick={ handleAddItem } className="btn btn-primary pull-right">AGREGAR AL LISTADO</button>
                </div>
            </div>
        </div>
    )
}
