import React from 'react'

export const Customer = (props) => {
    return (
        <>
        { props.type == "mobile" &&
        <>    
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
        </>
        }
        { props.type == "desktop" &&
            <>
            <tr>
                <td>{ props.model?.nombre }</td>
                <td>{ props.model?.rif }</td>
                <td>{ props.model?.direccion }</td>
            </tr>
            </>
        }
        </>        
    )
}
