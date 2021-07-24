import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import moment from 'moment';
import 'moment/locale/es'
;
import { startLoadingItem } from '../../actions/outputs';
import { Company } from '../../components/company/company';
import { Person } from '../../components/person/person';

export const View = () => {
    
    let { id } = useParams()
    const dispatch = useDispatch()
    const urlQR = `https://chart.googleapis.com/chart?chs=150x150&cht=qr&chl=http://192.168.2.123:3000/inputs/view/${id}`
    
    const { model } = useSelector(state => state.outputs)
    const { uid } = useSelector(state => state.auth)

    useEffect(() => {
        //Coloco un título a la página
        document.title = "Guía de Salida - IN0003"
        dispatch( startLoadingItem(id) )
        
    }, [])
    
    return (
        <>  
            <div className="card">
                <div className="card-body">
                    <div className="row">
                        <div className="no-print col-lg-12 mb-4">
                            { uid !== undefined &&
                                <button className="btn btn-primary pull-right" onClick={window.print}>Imprimir</button>
                            }
                            { uid == undefined &&
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
                                        <th>Origen</th>
                                        <td>{ model?.origen?.nombre }</td>
                                    </tr>
                                    <tr>
                                        <th>Fecha</th>
                                        <td>{ moment(new Date(model?.fecha?.seconds*1000)).format("L") }</td>
                                    </tr>
                                    <Company titulo="Datos del Importador" model={model?.importador} representante={model?.importador.representante} />    
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
                                        <td>{ model?.vehiculo.marca.nombre }</td>
                                    </tr>
                                    <tr>
                                        <th>Modelo</th>
                                        <td>{ model?.vehiculo.modelo.nombre }</td>
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
                                    <Person titulo="Datos del Conductor" model={ model?.conductor} />
                                    <Person titulo="Datos del Ayudante" model={ model?.ayudante} />
                                    <Person titulo="Datos del Responsable" model={ model?.responsable} />
                                </tbody>
                            </table>
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
                                        2. ESTA GUÍA DE MOVILIZACIÓN SÓLO SERÁ VÁLIDA EN LA FECHA DE LA MISMA Y EN EL TRAYECTO ESTIPULADO. CUALQUIER VARIACIÓN DE ESTOS VALORES DEBERÁN SER NOTIFICADOS DE MANERA INMEDIATA AL ENTE RECTOR.
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        3. LOS TRIPUPLANTES DE LOS VEHÍCULOS SE COMPROMETEN A CUMPLIR ESTRICTAMENTE TODO EL PROTOCOLO DE BIOSEGURIDAD ESTIPULADO POR LA OMS PARA EL COVID-19.
                                    </td>
                                </tr>    
                                <tr>
                                    <td>
                                        4. ESTA GUÍA DE MOVILIZACIÓN SÓLO ES VÁLIDA PARA EL TRAYECTO HACIA LA FRONTERA POR LO QUE QUEDA TOTALMENTE PROHÍBIDO CUALQUIER MODALIDAD DE CONTRABANDO DE EXTRACCIÓN.
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
