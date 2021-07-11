import React from 'react'

export const Person = (props) => {
    return (
        <>
        <tr>
            <th className="text-center" >{ props.titulo }</th>
            <th className="text-center" >Cédula/Pasaporte</th>
            <th className="text-center" colSpan="2">Dirección</th>
        </tr>
        <tr>
            <td className="text-center">{ props.model?.nombre }</td>
            <td className="text-center">{ props.model?.rif }</td>
            <td className="text-center">{ props.model?.telefono }</td>
        </tr>
        </>
    )
}
