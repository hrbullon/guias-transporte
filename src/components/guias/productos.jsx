import React from 'react'
import { Company } from '../company/company'
import { Person } from '../person/person'
import { Cabecera } from './cabecera'
import { Firmas } from './firmas'
import { Info } from './info'
import { Notas } from './notas'
import { Vehiculo } from './vehiculos'

export const Productos = (props) => {

    return (
        <>
        { props?.items && props.page <= Math.round((props?.items.length)/props.limit) &&
        <>
        <Cabecera></Cabecera>
        <table className="table table-fit">
            <tbody>
                <Info model={props.model} type={props.device}></Info>
                <Company titulo="Datos del Importador" type={props.device} model={props.model?.importador} representante={props.model?.importador.representante} />    
                {  props.device == "desktop" &&
                    <Company titulo="Datos del Cliente/Receptor" type={props.device}  model={props.model?.cliente} representante={props.model?.cliente.representante_comercio} />    
                }
            </tbody>
        </table>
        <Vehiculo vehiculo={props.model?.vehiculo} type={props.device}></Vehiculo>
        <table className="table table-fit">
            <tbody>
                <Person titulo="Datos del Conductor" type={props.device} model={ props.model?.vehiculo.conductor} />
                <Person titulo="Datos del Ayudante" type={props.device} model={ props.model?.vehiculo.ayudante} />
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
