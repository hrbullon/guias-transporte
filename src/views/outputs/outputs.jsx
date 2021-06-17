import React from 'react'

import { Person } from '../../components/person/person'
import { Vehicle } from '../../components/vehicle/vehicle'

export const Outputs = () => {

    return (
        <>
            <div className="card">
                <div className="card-body">
                    <div className="row">
                        <div className="col-lg-4">
                            <div class="form-group">
                                <label class="control-label">Jornada</label>
                                <input name="jornada" type="text" className="form-control"/>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div class="form-group">
                                <label class="control-label">Fecha</label>
                                <input name="fecha" type="text" className="form-control"/>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div class="form-group">
                                <label class="control-label">Origen</label>
                                <input name="origen" type="text" className="form-control"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-4">
                    <div className="card">
                        <div className="card-body">
                        <legend>Datos de Vehículo</legend>
                        <hr />
                            <Vehicle/>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4">
                    <div className="card">
                        <div className="card-body">
                        <legend>Datos de conductor</legend>
                            <hr />
                            <Person/>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4">
                    <div className="card">
                        <div className="card-body">
                        <legend>Datos de Ayudante</legend>
                            <hr />
                            <Person/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-12 mb-4">
                    <div className="card">
                        <div className="card-body">
                            <button className="btn btn-default pull-right">Cancelar</button>
                            <button className="btn btn-primary pull-right">Agregar</button>
                        </div>   
                    </div>   
                </div>
            </div>
            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-body">
                            <legend>Listado de salidas</legend>
                            <div className="table-responsive">
                                <table className="table table-striped table-hover table-">
                                    <thead>
                                        <tr>
                                            <th colSpan="3" className="text-center">Vehículo</th>
                                            <th colSpan="3" className="text-center">Conductor</th>
                                            <th colSpan="3" className="text-center">Ayudante</th>
                                        </tr>
                                        <tr>
                                            <th>Placa</th>
                                            <th>Marca</th>
                                            <th className="border-right">Modelo</th>
                                            
                                            <th>Cedula</th>
                                            <th>Nombre</th>
                                            <th className="border-right">Apellido</th>
                                            
                                            <th>Cedula</th>
                                            <th>Nombre</th>
                                            <th>Apellido</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>VX32652</td>    
                                            <td>Ford</td>    
                                            <td className="border-right">750</td>

                                            <td>V2190389</td>    
                                            <td>José </td>    
                                            <td className="border-right">Ruiz</td>    
                                            
                                            <td>V1232122</td>    
                                            <td>Carlos</td>    
                                            <td>Gonzalez</td>    
                                        </tr>                            
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
