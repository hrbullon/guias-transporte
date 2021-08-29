import React from 'react'
import { useParams } from 'react-router-dom'
import { url } from '../../config/config'
import logodarkicon from '../../assets/images/logo.png';

export const Cabecera = () => {
    let { id } = useParams()
    const urlQR = `https://chart.googleapis.com/chart?chs=150x150&cht=qr&chl=${url}inputs/view/${id}`

    return (
        <table className="table table-fit">
            <tbody>
                <tr>
                    <td>
                        <img src={ logodarkicon } width="150"/>
                    </td>
                    <td align="center">
                        <b>GUÍA DE MOVILIZACIÓN TERRESTRE <br />
                        PLAN ESPECIAL WAYUU DE ABASTECIMIENTO</b>
                    </td>
                    <td align="right">
                        <img src={ urlQR } width="150"/>
                    </td>
                </tr>
            </tbody>
        </table>
    )
}
