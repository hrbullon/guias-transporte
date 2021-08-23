import React from 'react'

export const Company = (props) => {
    return (
        <>
        { props.type == "mobile" &&
        <>    
            <tr>
                <th className="text-center table-secondary" colSpan="2">{ props.titulo}</th>
            </tr>
            <tr>
                <th >Nombre o Razón Social</th>
                <td>{ props.model?.nombre }</td>
            </tr>
            <tr>
                <th >RIF</th>
                <td>{ props.model?.rif }</td>
            </tr>
            <tr>
                <th>Dirección</th>
                <td>{ props.model?.direccion }</td>
            </tr>
            <tr>
                <th>Representante Legal</th>
                <td>{ props.representante?.nombre }</td>
            </tr>
            <tr>
                <th>Cédula o Pasaporte</th>
                <td>{ props.representante?.rif }</td>
            </tr>
            <tr>
                <th>Teléfonos</th>
                <td>{ props.representante?.telefono }</td>
            </tr>
        </>
        }
        { props.type == "desktop" &&
            <>
            <tr>
                <th className="text-center table-secondary" colSpan="3">{ props?.titulo }</th>
            </tr>
            <tr>
                <th >Nombre o Razón Social</th>
                <th >RIF</th>
                <th>Dirección</th>
            </tr>
            <tr>
                <td>{ props.model?.nombre }</td>
                <td>{ props.model?.rif }</td>
                <td>{ props.model?.direccion }</td>
            </tr>
            <tr>
                <th>Representante Legal</th>
                <th>Cédula o Pasaporte</th>
                <th>Teléfonos</th>
            </tr>
            <tr>
                <td>{ props.representante?.nombre }</td>
                <td>{ props.representante?.rif }</td>
                <td>{ props.representante?.telefono }</td>
            </tr>
            </>
        }
        </>        
    )
}
