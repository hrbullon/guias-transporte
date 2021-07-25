import React from 'react'
import { useParams } from 'react-router-dom'

export const Cabecera = () => {
    let { id } = useParams()
    const urlQR = `https://chart.googleapis.com/chart?chs=150x150&cht=qr&chl=http://192.168.2.123:3000/inputs/view/${id}`

    return (
        <table className="table table-fit">
            <tbody>
                <tr>
                    <td>
                        <img src={ urlQR }/>
                    </td>
                    <td align="left">
                        <b>GUÍA DE MOVILIZACIÓN TERRESTRE <br />
                        PLAN ESPECIAL WAYUU DE ABASTECIMIENTO</b>
                    </td>
                    <td>
                    </td>
                </tr>
            </tbody>
        </table>
    )
}
