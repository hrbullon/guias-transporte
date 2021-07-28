import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import Swal from 'sweetalert2';

import { startLoadingItem, startUpdatingInput } from '../../actions/inputs';
import { Company } from '../../components/company/company';
import { Person } from '../../components/person/person';
import { validateInput } from '../../helpers/checking';
import { url } from '../../config/config'

import { Info } from '../../components/guias/info';
import { Cabecera } from '../../components/guias/cabecera';
import { Firmas } from '../../components/guias/firmas';
import { Notas } from '../../components/guias/notas';
import { Vehiculo } from '../../components/guias/vehiculos';
import { Productos } from '../../components/guias/productos';

export const View = () => {
    
    let { id } = useParams()
    const dispatch = useDispatch()
    const urlQR = `https://chart.googleapis.com/chart?chs=150x150&cht=qr&chl=${url}inputs/view/${id}`
    
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
            title: 'Confirmar Entrada',
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
                text: "Entrada Confirmada. Usted ha confirmado la entrada del vehículo al país",
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
                            <button className="btn btn-primary pull-right" onClick={handleAcceptInput}>Confirmar Entrada</button>
                            }    
                        </div>
                        <div id="print" className="col col-lg-12">
                            <Cabecera></Cabecera>
                            <table className="table table-fit">
                                <tbody>
                                    <Info model={model}></Info>
                                    <Company titulo="Datos del Importador" model={model?.importador} representante={model?.importador.representante} />    
                                    <Company titulo="Datos del Cliente/Receptor" model={model?.cliente} representante={model?.cliente.representante_comercio} />    
                                </tbody>
                            </table>
                            <Vehiculo vehiculo={model?.vehiculo}></Vehiculo>
                            <table className="table table-fit">
                                <tbody>
                                    <Person titulo="Datos del Conductor" model={ model?.vehiculo.conductor} />
                                    <Person titulo="Datos del Ayudante" model={ model?.vehiculo.ayudante} />
                                </tbody>
                            </table>
                            <hr />
                            <div className="table-responsive">
                                <Productos items={model?.items}></Productos>
                            </div>
                            <Firmas></Firmas>
                            <Notas></Notas>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
