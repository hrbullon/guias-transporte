import React from 'react'

export const Info = (props) => {
    return (
        <>
            <tr>
                <th>Numero</th>
                <td>{ props.model?.codigo }</td>
            </tr>
            <tr>
                <th>Retorno</th>
                <td>{ props.model?.retorno }</td>
            </tr>
            <tr>
                <th>Fecha</th>
                <td>{ props.model?.fecha }</td>
            </tr>
        </>
    )
}
