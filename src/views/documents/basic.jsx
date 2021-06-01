import React from 'react'

export const Basic = (props) => {

    return (
        <div className="card" >
            <div className="card-header">
                Datos básicos de la guía
            </div>
            <div className="card-body">
                <div class="row">
                    <div class="col-lg-3 col-s-12 col-xs-12">
                        <div class="form-group">
                            <label class="control-label">Número</label>
                            <input type="text" name="numero" value={ props.formState.numero } class="form-control" onChange={ props.handleInputChange } placeholder="Ingrese número de guía"/>
                        </div>
                    </div>
                    <div class="col-lg-3 col-s-12 col-xs-12">
                        <div class="form-group">
                            <label class="control-label">Origen</label>
                            <input type="text" name="origen" value={ props.formState.origen } class="form-control" onChange={ props.handleInputChange } placeholder="Ingrese un origen"/>
                        </div>
                    </div>
                    <div class="col-lg-3 col-s-12 col-xs-12">
                        <div class="form-group">
                            <label class="control-label">Retorno Vehículo</label>
                            <input type="text" name="retorno" value={ props.formState.retorno } class="form-control" onChange={ props.handleInputChange } placeholder="Ingrese un retorno"/>
                        </div>
                    </div>
                    <div class="col-lg-3 col-s-12 col-xs-12">
                        <div class="form-group">
                            <label class="control-label">Fecha</label>
                            <input type="date" name="fecha" value={ props.formState.fecha } class="form-control" onChange={ props.handleInputChange } placeholder="Ingrese la fecha"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
