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
                            { props.formState.numero == "" && !props.validated && <span className="text-danger">Este campo es requerido</span>}
                        </div>
                    </div>
                    <div class="col-lg-3 col-s-12 col-xs-12">
                        <div class="form-group">
                            <label class="control-label">Origen</label>
                            <input type="text" name="origen" value={ props.formState.origen } class="form-control" onChange={ props.handleInputChange } placeholder="Ingrese un origen"/>
                            { props.formState.origen == "" && !props.validated && <span className="text-danger">Este campo es requerido</span>}
                        </div>
                    </div>
                    <div class="col-lg-3 col-s-12 col-xs-12">
                        <div class="form-group">
                            <label class="control-label">Retorno Vehículo</label>
                            <input type="text" name="retorno" value={ props.formState.retorno } class="form-control" onChange={ props.handleInputChange } placeholder="Ingrese un retorno"/>
                            { props.formState.retorno == "" && !props.validated && <span className="text-danger">Este campo es requerido</span>}
                        </div>
                    </div>
                    <div class="col-lg-3 col-s-12 col-xs-12">
                        <div class="form-group">
                            <label class="control-label">Fecha</label>
                            <input type="date" name="fecha" value={ props.formState.fecha } class="form-control" onChange={ props.handleInputChange } placeholder="Ingrese la fecha"/>
                            { props.formState.fecha == "" && !props.validated && <span className="text-danger">Este campo es requerido</span>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
