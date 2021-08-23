import React from 'react'

export const Info = (props) => {
    return (
        <>
            { props.type == "mobile" &&
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
            }
            { props.type == "desktop" &&
            <>    
                <tr>
                    <th>Numero</th>
                    <th>Retorno</th>
                    <th>Fecha</th>
                </tr>
                <tr>
                    <td>{ props.model?.codigo }</td>
                    <td>{ props.model?.retorno }</td>
                    <td>{ props.model?.fecha }</td>
                </tr>
            </>
            }
        </>
    )
}
