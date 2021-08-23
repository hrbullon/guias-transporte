import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import Swal from 'sweetalert2';

import { startLoadingItem, startUpdatingInput } from '../../actions/inputs';
import { validateInput } from '../../helpers/checking';
import { url } from '../../config/config'

import { Productos } from '../../components/guias/productos';

export const View = () => {
    
    let { id } = useParams()
    const dispatch = useDispatch()
    const urlQR = `https://chart.googleapis.com/chart?chs=150x150&cht=qr&chl=${url}inputs/view/${id}`
    
    const { model } = useSelector(state => state.inputs)
    const { uid } = useSelector(state => state.auth)

    const [device, setDevice] = useState("desktop")
    const [limit, setLimit] = useState(20)

    useEffect(() => {
        //Coloco un título a la página
        dispatch( startLoadingItem(id) )

        if( navigator.userAgent.match(/Android/i)
            || navigator.userAgent.match(/webOS/i)
            || navigator.userAgent.match(/iPhone/i)
            || navigator.userAgent.match(/iPad/i)
            || navigator.userAgent.match(/iPod/i)
            || navigator.userAgent.match(/BlackBerry/i)
            || navigator.userAgent.match(/Windows Phone/i)){
                setDevice("mobile")
                setLimit(25)
            }
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
                            { uid !== undefined && device == "desktop" &&
                                <button className="btn btn-primary pull-right" onClick={window.print}>Imprimir</button>
                            }
                            { uid == undefined && model?.estado !== "Completada" &&
                            <button className="btn btn-primary pull-right" onClick={handleAcceptInput}>Confirmar Entrada</button>
                            }    
                        </div>
                        <div id="print" className="col col-lg-12">
                            {/** Esta linea puede generar hasta 10 páginas del formato de entrada*/}
                            { [1,2,3,4,5,6,7,8,9,10].map( item =>  {
                                return <Productos model={model} limit={limit} device={device} items={model?.items} page={item} end={ item*limit }/>
                            })}    
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
