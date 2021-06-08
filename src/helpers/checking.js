import { db } from '../firebase/firebase-config'

export const validatePlaca = async (placa) => {
        
    const vehicleSnap = await db.collection(`vehicles`).where('placa','==',placa).get()
    const validate = true

    vehicleSnap.forEach( (snap) => {
        console.log(snap)
    })
    
}