import { useState, useEffect } from "react"
import { projectFirestore } from "../../firebase/firebase"



export const useCollection = (collection, options) => {
    const [data , setData] = useState([]);
    const [isPending, setIsPending] = useState(true)
    const [error, setError] = useState(null)
    
    useEffect(() => {
        const unsubscribe = projectFirestore
        .collection(collection)
        .orderBy('createdAt', 'desc')
        .onSnapshot(snapshot => {
            let documents = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
            }))
            setData(documents)
            setIsPending(false)
        }, err => {
            setError(err)
            setIsPending(false)
        })
        return () => unsubscribe()
    }, [collection])
    
    return { data, isPending, error }
    }
