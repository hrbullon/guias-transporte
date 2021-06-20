import { types } from '../types/types';

export const authReducer = (state = {}, action) => {
    switch (action.type) {
        case types.login:
            return { 
                ...action.payload,
                company: {
                    id:"aoacqwz4VY7uakWbBdLT",
                    rif:"J298192922",
                    nombre:"Cooperativa Wayuu",
                    municipio:"Mara",
                    parroquia:"San Rafael",
                    direccion:"DIRECCION",
                    limite_vehiculos: "6",
                    representante: {
                        nombre:"REPRESENTANTE",
                        rif:"V98988998",
                        telefono:"1231-2361276"
                    },
                    responsable: {
                        nombre:"RESPONSABLE",
                        rif:"V1232122",
                        telefono:"1231-2361276"
                    } 
                }
            }
        case types.logout:
            return {}
        default:
            return state
    }
}

