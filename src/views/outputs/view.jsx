import React, { useState,useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import moment from 'moment';
import 'moment/locale/es'
;
import { startLoadingItem } from '../../actions/outputs';
import { Company } from '../../components/company/company';
import { Person } from '../../components/person/person';
import { Notas } from '../../components/guias/notas';
import { Firmas } from '../../components/guias/firmas';
import { Cabecera } from '../../components/guias/cabecera';
import { Vehiculo } from '../../components/guias/vehiculos';
import { Info } from '../../components/guias/info';

export const View = () => {
    
    let { id } = useParams()
    const dispatch = useDispatch()
    
    const { model } = useSelector(state => state.outputs)
    const { uid } = useSelector(state => state.auth)

    const [device, setDevice] = useState("desktop")

    useEffect(() => {
        //Coloco un título a la página
        dispatch( startLoadingItem(id) )        
    }, [])

    useEffect(() => {
        document.title = `Guía de Salida - ${model?.codigo }`
    }, [model])    
    
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
                            <Cabecera></Cabecera>
                            <table className="table table-fit">
                                <tbody>
                                    <tr>
                                        <th>Numero</th>
                                        <th>Origen</th>
                                        <th>Fecha</th>
                                    </tr>
                                    <tr>
                                        <td>{ model?.codigo }</td>
                                        <td>{ model?.origen?.nombre }</td>
                                        <td>{ moment(new Date(model?.fecha?.seconds*1000)).format("L") }</td>
                                    </tr>
                                    <Company titulo="Datos del Importador" type={device} model={model?.importador} representante={model?.importador.representante} />    
                                </tbody>
                            </table>
                                <Vehiculo titulo="Datos del Vehículo" type="otro" vehiculo={model?.vehiculo}></Vehiculo>
                                <table className="table table-fit">
                                <tbody>
                                    <Person type={device} titulo="Datos del Conductor" model={ model?.conductor} />
                                    <Person type={device} titulo="Datos del Ayudante" model={ model?.ayudante} />
                                    <Person type={device} titulo="Datos del Responsable" model={ model?.responsable} />
                                </tbody>
                            </table>
                            <Firmas></Firmas>
                            <Notas></Notas>
                        </div>
                    </div>
                </div>
            </div>
            
        </>
    )
}
