import React from 'react'

export const Person = (props) => {
    return (
        <>
        { props.type == "mobile" &&
            <>
                <tr>
                    <th className="text-center table-secondary" colSpan="2">
                        { props.titulo}
                    </th>
                </tr>
                <tr>
                    <th>Nombre</th>
                    <td>{ `${props?.model?.nombre} ${props?.model?.apellido}` }</td>
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
        }
        { props.type == "desktop" &&
            <>
                <tr>
                    <th className="text-center table-secondary" colSpan="3">
                        { props.titulo}
                    </th>
                </tr>
                <tr>
                    <th>Nombre</th>
                    <th>Cédula/Pasaporte</th>
                    <th>Teléfono</th>
                </tr>
                <tr>
                    <td>{ `${props?.model?.nombre} ${props?.model?.apellido}` }</td>
                    <td>{ props.model?.telefono }</td>
                    <td>{ props.model?.rif }</td>
                </tr>
            </>
        }
        </>
    )
}
