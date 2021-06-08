import { db } from '../firebase/firebase-config'

export const validatePlaca = async (placa) => {
    const snapshot = await db.collection(`vehicles`).where('placa','==',placa).get()
    return (snapshot.empty)? true : false
}