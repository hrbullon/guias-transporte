import React from 'react'

export const Productos = (props) => {
    return (
        <>
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
                    <tr className="table-secondary" key={index}>
                        <td>{ props.items[index].i }</td>
                        <td>{ props.items[index].producto.nombre  }</td>
                        <td>{ props.items[index].presentacion.presentacion  }</td>
                        <td>{ props.items[index].presentacion.contenido  }</td>
                        <td>{ props.items[index].presentacion.unidad_medida  }</td>
                        <td>{ props.items[index].subtotal }</td>
                    </tr>
                    </>      
                )    
            })}
            </tbody>
        </table>
        </>
    )
}
