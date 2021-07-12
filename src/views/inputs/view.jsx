import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { startLoadingItem, startUpdatingInput } from '../../actions/inputs';
import { Company } from '../../components/company/company';
import { Person } from '../../components/person/person';
import Swal from 'sweetalert2';
import { validateInput } from '../../helpers/checking';

export const View = () => {
    
    let { id } = useParams()
    let isMobile = false
    const dispatch = useDispatch()
    const urlQR = `https://chart.googleapis.com/chart?chs=150x150&cht=qr&chl=http://192.168.2.123:3000/inputs/view/${id}`
    
    const { model } = useSelector(state => state.inputs)
    const { uid } = useSelector(state => state.auth)

    useEffect(() => {
        //Coloco un título a la página
        document.title = "Guía de Entrada - IN0003"
        dispatch( startLoadingItem(id) )
        
    }, [])

    const handleAcceptInput = () => {

        Swal.fire({
            title: 'Enviar Token de Entrada',
            input: 'text',
            inputAttributes: {
              autocapitalize: 'off'
            },
            showCancelButton: true,
            confirmButtonText: 'Aceptar',
            showLoaderOnConfirm: true,
            preConfirm: async (token) => {
                
                const validated = await validateInput(id,token)
                if(!validated){
                    Swal.showValidationMessage(
                        `Token Inválido: ${token}`
                    )
                }
            },
            allowOutsideClick: () => !Swal.isLoading()
          }).then((result) => {
            
            if (result.isConfirmed) {

              dispatch( startUpdatingInput({ ...model, estado:"Cerrada"})  )

              Swal.fire({
                icon: 'success',
                title: `Listo`,
                text: "Entrada Marcada. Usted ha confirmado la entrada del vehículo al país",
              })
    
            }
          })
    }

    return (
        <>  
            <div className="card">
                <div className="card-body">
                    <div className="row">
                        <div className="no-print col-lg-12 mb-4">
                            { uid !== undefined &&
                                <button className="btn btn-primary pull-right" onClick={window.print}>Imprimir</button>
                            }
                            <button className="btn btn-primary pull-right" onClick={handleAcceptInput}>Marcar Entrada</button>
                        </div>
                        <div id="print" className="col col-lg-6">
                        <table>
                            <tr>
                                <td>
                                    <img src={ urlQR }/>
                                </td>
                                <td width="" align="center">
                                    <b>GUÍA DE MOVILIZACIÓN TERRESTRE <br />
                                    PLAN ESPECIAL WAYUU DE ABASTECIMIENTO</b>
                                </td>
                                <td width="" align="right">
                                    <b>Fecha de Emisión: <br/>07/11/2021</b>
                                </td>
                            </tr>
                        </table>
                        <table className="table table-fit">
                            <tbody>
                                <tr>
                                    <th>Numero</th>
                                    <td>IN0032</td>
                                </tr>
                                <tr>
                                    <th>Origen</th>
                                    <td>Pagaguachon</td>
                                </tr>
                                <tr>
                                    <th>Retorno</th>
                                    <td>MARACAIBO</td>
                                </tr>
                                <tr>
                                    <th>Fecha</th>
                                    <td>11/07/2021</td>
                                </tr>
                                <Company titulo="Datos del Importador" model={model?.importador} representante={model?.importador.representante} />    
                                <Company titulo="Datos del Cliente/Receptor" model={model?.cliente} representante={model?.cliente.representante_comercio} />    
                            </tbody>
                        </table>
                        <table className="table table-fit">
                            <tbody>
                                <tr>
                                    <th className="text-center table-secondary" colSpan="2">
                                        Datos del Vehículo
                                    </th>
                                </tr>
                                <tr>
                                    <th>Marca</th>
                                    <td>{ model?.vehiculo.marca }</td>
                                </tr>
                                <tr>
                                    <th>Modelo</th>
                                    <td>{ model?.vehiculo.modelo }</td>
                                </tr>
                                <tr>
                                    <th>Placa</th>
                                    <td>{ model?.vehiculo.placa }</td>
                                </tr>
                                <tr>
                                    <th>Color</th>
                                    <td>{ model?.vehiculo.color }</td>
                                </tr>
                            </tbody>
                        </table>
                        <table className="table table-fit">
                            <tbody>
                                <Person titulo="Datos del Conductor" model={ model?.vehiculo.conductor} />
                                <Person titulo="Datos del Ayudante" model={ model?.vehiculo.ayudante} />
                            </tbody>
                        </table>
                        <hr />
                        <div className="table-responsive">
                            <table className="table table-fit">
                                <tbody>
                                    <tr>
                                        <th className="text-center table-secondary" colSpan="2">
                                            Datos de la Carga
                                        </th>
                                    </tr>
                                { model?.items  &&
                                    Object.keys(model?.items).map( (index, value) => {
                                    return (
                                        <>
                                        <tr className="table-secondary" key={index}>
                                            <th>Item</th>
                                            <td>{ model.items[index].i }</td>
                                        </tr>
                                        <tr>
                                            <th>Producto</th>
                                            <td>{ model.items[index].producto.nombre  }</td>
                                        </tr>
                                        <tr>
                                            <th>Presentación</th>
                                            <td>{ model.items[index].presentacion.presentacion  }</td>
                                        </tr>
                                        <tr>
                                            <th>Contenido</th>
                                            <td>{ model.items[index].presentacion.contenido  }</td>
                                        </tr>
                                        <tr>
                                            <th>Unidad de Medida</th>
                                            <td>{ model.items[index].presentacion.unidad_medida  }</td>
                                        </tr>
                                        <tr>
                                            <th>Cantidad</th>
                                            <td>{ model.items[index].cantidad }</td>
                                        </tr>
                                        <tr>
                                            <th>Total del Producto</th>
                                            <td>{ model.items[index].subtotal }</td>
                                        </tr>
                                        </>      
                                    )    
                                })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
            
        </>
    )
}
