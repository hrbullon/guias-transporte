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
        dispatch( startLoadingItem(id) )
    }, [])

    useEffect(() => {
        document.title = `Guía de Entrada - ${model?.codigo}`
    }, [model])


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

              dispatch( startUpdatingInput({ ...model, estado:"Completada"})  )

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
                            { uid == undefined && model?.estado !== "Completada" &&
                            <button className="btn btn-primary pull-right" onClick={handleAcceptInput}>Marcar Entrada</button>
                            }    
                        </div>
                        <div id="print" className="col col-lg-12">
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
                        <table className="table table-fit">
                            <tbody>
                                <tr>
                                    <th>Numero</th>
                                    <td>{ model?.codigo }</td>
                                </tr>
                                <tr>
                                    <th>Retorno</th>
                                    <td>{ model?.retorno }</td>
                                </tr>
                                <tr>
                                    <th>Fecha</th>
                                    <td>{ model?.fecha }</td>
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
                                        <th className="text-center table-secondary" colSpan="6">
                                            Datos de la Carga
                                        </th>
                                    </tr>
                                    <tr>
                                        <th>item</th>
                                        <th>Producto</th>
                                        <th>Presentación</th>
                                        <th>Cont.</th>
                                        <th>Unid.</th>
                                        <th>Subtotal</th>
                                    </tr>
                                { model?.items  &&
                                    Object.keys(model?.items).map( (index, value) => {
                                    return (
                                        <>
                                        <tr className="table-secondary" key={index}>
                                            <td>{ model.items[index].i }</td>
                                            <td>{ model.items[index].producto.nombre  }</td>
                                            <td>{ model.items[index].presentacion.presentacion  }</td>
                                            <td>{ model.items[index].presentacion.contenido  }</td>
                                            <td>{ model.items[index].presentacion.unidad_medida  }</td>
                                            <td>{ model.items[index].subtotal }</td>
                                        </tr>
                                        </>      
                                    )    
                                })}
                                </tbody>
                            </table>
                        </div>
                        <table className="table table-fit">
                            <tr>
                                <th className="text-center">Sello Organización</th>
                                <th className="text-center">Destacamento de la G.N.B</th>
                                <th className="text-center">Aprobación ente Regulador</th>
                            </tr>
                            <tr>
                                <td className="div-sello"></td>
                                <td className="div-sello"></td>
                                <td className="div-sello"></td>
                            </tr>
                        </table>
                        <table id="table-notas">
                            <tr>
                                <th className="table-secondary">Notas:</th>
                            </tr>
                            <tr>
                                <td>
                                    1. SE LES AGRADECE A TODAS LAS AUTORIDADES CIVÍLES Y MILITARES PRESTAR LA MAYOR COLABORACIÓN PARA EL BUEN FUNCIONAMIENTO DEL PLAN DE ABASTECIMIENTO.
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    2. ESTA GUÍA DE MOVILIZACIÓN SÓLO SERÁ VÁLIDA 48HS DESDE LA FECHA DE EMISION EN EL TRAYECTO ESTIPULADO. CUALQUIER VARIACIÓN DE ESTOS VALORES DEBERÁN SER NOTIFICADOS DE MANERA INMEDIATA AL ENTE RECTOR.
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    3. LOS TRIPUPLANTES DE LOS VEHÍCULOS SE COMPROMETEN A CUMPLIR ESTRICTAMENTE TODO EL PROTOCOLO DE BIOSEGURIDAD ESTIPULADO POR LA OMS PARA EL COVID-19.
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    4. QUEDA TOTALMENTE PROHÍBIDO EL TRÁFICO DE SUSTANCIAS Y/O INSUMOS PARA LA ELABORACIÓN DE ESTUPEFACIENTES. QUEDANDO LA RESPONSABILIDAD LEGAL SOBRE LA EMPRESA IMPORTADORA Y EL VEHÍCULO DE CARGA.
                                </td>
                            </tr>
                        </table>
                    </div>
                    </div>
                </div>
            </div>
            
        </>
    )
}
