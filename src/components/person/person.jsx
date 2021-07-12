import React from 'react'

export const Person = (props) => {
    return (
        <>
        <tr>
            <th className="text-center table-secondary" colSpan="2">
                { props.titulo}
            </th>
        </tr>
        <tr>
            <th>Nombre</th>
            <td>{ props.model?.nombre }</td>
        </tr>
        <tr>
            <th>Cédula/Pasaporte</th>
            <td>{ props.model?.rif }</td>
        </tr>
        <tr>
            <th>Teléfono</th>
            <td>{ props.model?.telefono }</td>
        </tr>
        </>
    )
}
