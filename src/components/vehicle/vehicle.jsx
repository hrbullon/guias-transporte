import React from 'react'

export const Vehicle = () => {
    return (
        <div>
            <div class="form-group">
                <label class="control-label">Placa</label>
                <input name="placa" type="text" className="form-control"/>
            </div>
            <div class="form-group">
                <label class="control-label">Marca</label>
                <input name="marca" type="text" disabled className="form-control"/>
            </div>
            <div class="form-group">
                <label class="control-label">Modelo</label>
                <input name="modelo" type="text" disabled className="form-control"/>
            </div>
            <div class="form-group">
                <label class="control-label">Color</label>
                <input name="color" type="text" disabled className="form-control"/>
            </div>
        </div>
    )
}
