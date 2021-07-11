import React from 'react'

export const Company = (props) => {
    return (
        <>
        <tr>
            <th className="text-center table-secondary" colSpan="4">{ props.titulo}</th>
        </tr>
        <tr>
            <th className="text-center" >Nombre o Razón Social</th>
            <th className="text-center" >RIF</th>
            <th className="text-center" colSpan="2">Dirección</th>
        </tr>
        <tr>
            <td className="text-center">{ props.model?.nombre }</td>
            <td className="text-center">{ props.model?.rif }</td>
            <td className="text-center">{ props.model?.direccion }</td>
        </tr>
        <tr>
            <th className="text-center">Representante Legal</th>
            <th className="text-center">Cédula o Pasaporte</th>
            <th className="text-center" colSpan="2">Teléfonos</th>
        </tr>
        <tr>
            <td className="text-center">{ props.representante?.nombre }</td>
            <td className="text-center">{ props.representante?.rif }</td>
            <td className="text-center">{ props.representante?.telefono }</td>
        </tr>
        </>        
    )
}
