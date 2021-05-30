import { db  } from '../firebase/firebase-config'
import { types } from '../types/types'

export const startLoadingPeople = () => {
    return async (dispatch) => {
        
        try {
            const peopleSnap = await db.collection(`people`).get()
            const pleople = []

            peopleSnap.forEach( snap => {
                pleople.push({
                    id: snap.id,
                    ...snap.data()
                })
            })
            //Notifico al reducer, para que me almacene los datos en el state
            dispatch( peopleLoaded( pleople ) )

        } catch (error) {
            console.log('Error al cargar los datos de personas')
        }
    }
}

export const peopleLoaded = ( data ) => ({
    type: types.driverLoaded,
    payload: data
})