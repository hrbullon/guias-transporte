import React from 'react'
import { Company } from '../company/company'
import { Customer } from '../company/customer'
import { Person } from '../person/person'
import { Cabecera } from './cabecera'
import { Firmas } from './firmas'
import { Info } from './info'
import { Notas } from './notas'
import { Vehiculo } from './vehiculos'

export const Productos = (props) => {

    let calc = (Math.round((props?.items?.length)/props.limit) == 0)? 1 : Math.ceil((props?.items?.length)/props.limit)
    return (
        <>
        { props?.items && props?.items?.length > 0 && props.page <= calc  &&
        <>
        
        <Cabecera></Cabecera>
        <table className="table table-fit">
            <tbody>
                <Info model={props.model} type={props.device}></Info>
                <Company titulo="Datos del Importador" type={props.device} model={props.model?.importador} representante={props.model?.importador.representante} />    
                {  props.device == "desktop" && props.model?.cliente.id !== "" &&
                    <>
                        <tr>
                            <th className="text-center table-secondary" colSpan="3">Datos de Clientes</th>
                        </tr>
                        <tr>
                            <th>Nombre o Razón Social</th>
                            <th>RIF</th>
                            <th>Dirección</th>
                        </tr>
                        <Customer type={props.device}  model={props.model?.cliente}/>        
                    </>
                }
                {  props.device == "desktop" && props.model?.cliente_dos.id !== "" &&
                    <>
                        <Customer type={props.device}  model={props.model?.cliente_dos}/>    
                    </>
                }
                {  props.device == "desktop" && props.model?.cliente_tres.id !== "" &&
                    <>
                        <Customer type={props.device}  model={props.model?.cliente_tres}/>
                    </>
                }
            </tbody>
        </table>
        { props?.model?.trasbordo?.vehiculo.id !== "" &&
            <>
            <Vehiculo titulo="Datos vehículo anterior" vehiculo={props.model?.vehiculo} type={props.device}></Vehiculo>
            <Vehiculo titulo="Datos vehículo actual" vehiculo={props.model?.trasbordo?.vehiculo} type={props.device}></Vehiculo>
            </>
        }
        { !props?.model?.vehiculo.id !== "" && props?.model?.trasbordo?.vehiculo.id == "" &&
            <Vehiculo titulo="Datos vehículo" vehiculo={props.model?.vehiculo} type={props.device}></Vehiculo>
        }
        <table className="table table-fit">
            <tbody>
                { props?.model?.trasbordo?.conductor.id !== "" &&
                    <>
                        <Person titulo="Datos del Conductor anterior" type={props.device} model={ props.model?.vehiculo.conductor} />
                        <Person titulo="Datos del Conductor actual" type={props.device} model={ props.model?.trasbordo?.conductor} />
                    </>
                }  
                { props?.model?.vehiculo?.conductor.rif !== "" && props?.model?.trasbordo?.conductor?.id == "" &&
                    <Person titulo="Datos del Conductor" type={props.device} model={ props.model?.vehiculo.conductor} />
                }
                <Person titulo="Datos del Ayudante" type={props.device} model={ props.model?.vehiculo.ayudante} />
            </tbody>
        </table>
        <hr />
        <div className="table-responsive">
            <table className="table table-fit">
                <tbody>
                    <tr>
                        <th className="text-center table-secondary" colSpan="7">
                            Datos de la Carga
                        </th>
                    </tr>
                    <tr>
                        <th>item</th>
                        <th>Producto</th>
                        <th>Presentación</th>
                        <th>Cont.</th>
                        <th>Unid.</th>
                        <th>Cant.</th>
                        <th>Subtotal</th>
                    </tr>
                { props?.items  &&
                    Object.keys(props?.items).map( (index, value) => {
                    return (
                        <>
                        { index >= (parseInt(props.end) - props.limit) && index < parseInt(props.end) &&
                        <tr className="table-secondary" key={index}>
                            <td>{ (parseInt(index)+1) }</td>
                            <td>{ props.items[index].producto.nombre  }</td>
                            <td>{ props.items[index].presentacion.presentacion  }</td>
                            <td>{ props.items[index].presentacion.contenido  }</td>
                            <td>{ props.items[index].presentacion.unidad_medida  }</td>
                            <td>{ props.items[index].cantidad  }</td>
                            <td>{ props.items[index].subtotal }</td>
                        </tr>
                        }
                        </>      
                    )    
                })}
                </tbody>
            </table>
        </div>   
        { props.device == "desktop" &&
            <>
                <Firmas></Firmas>
                <Notas></Notas>  
            </>
        }
        </>
        }
        </>
    )
}
