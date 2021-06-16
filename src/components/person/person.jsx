import React from 'react'

export const Person = () => {
    return (
        <div>
            <div class="form-group">
                <label class="control-label">Cédula</label>
                <input name="cedula" type="text" className="form-control"/>
            </div>
            <div class="form-group">
                <label class="control-label">Nombre</label>
                <input name="nombre" type="text" disabled className="form-control"/>
            </div>
            <div class="form-group">
                <label class="control-label">Apellido</label>
                <input name="apellido" type="text" disabled className="form-control"/>
            </div>
            <div class="form-group">
                <label class="control-label">Teléfono</label>
                <input name="telefono" type="text" disabled className="form-control"/>
            </div>
        </div>
    )
}
