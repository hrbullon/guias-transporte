import React from 'react'

export const Vehiculo = (props) => {
    return (
        <table className="table table-fit">
            <tbody>
                <tr>
                    <th className="text-center table-secondary" colSpan="2">
                        Datos del Vehículo
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
    )
}
