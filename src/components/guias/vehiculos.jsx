import React from 'react'

export const Vehiculo = (props) => {
    return (
        <>
            {  props.type == "mobile" &&
                <table className="table table-fit">
                    <tbody>
                        <tr>
                            <th className="text-center table-secondary" colSpan="2">
                                { props.titulo }
                            </th>
                        </tr>
                        <tr>
                            <th>Marca</th>
                            <td>{ props?.vehiculo?.marca?.nombre }</td>
                        </tr>
                        <tr>
                            <th>Modelo</th>
                            <td>{ props?.vehiculo?.modelo?.nombre }</td>
                        </tr>
                        <tr>
                            <th>Placa</th>
                            <td>{ props?.vehiculo?.placa }</td>
                        </tr>
                        <tr>
                            <th>Color</th>
                            <td>{ props?.vehiculo?.color }</td>
                        </tr>
                    </tbody>
                </table>
            }
            {  props.type == "desktop" &&
                <table className="table table-fit">
                    <tbody>
                        <tr>
                            <th className="text-center table-secondary" colSpan="4">
                                { props.titulo }
                            </th>
                        </tr>
                        <tr>
                            <th>Placa</th>
                            <th>Marca</th>
                            <th>Modelo</th>
                            <th>Color</th>
                        </tr>
                        <tr>
                            <td>{ props?.vehiculo?.placa }</td>
                            <td>{ props?.vehiculo?.marca?.nombre }</td>
                            <td>{ props?.vehiculo?.modelo?.nombre }</td>
                            <td>{ props?.vehiculo?.color }</td>
                        </tr>
                    </tbody>
                </table>
            }
        </>
    )
}
