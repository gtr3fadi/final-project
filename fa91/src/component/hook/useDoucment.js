import { useState, useEffect } from "react";
import { projectFirestore } from "../../firebase/firebase";



export const useDocument = (collection, Id) => {
    const [doc, setDoc] = useState(null);
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(true);
    
    useEffect(() => {
        const unsubscribe = projectFirestore.collection(collection).doc(Id).onSnapshot(doc => {
            if (doc.data()) {
                setDoc({ ...doc.data(), id: doc.id });
                setError(null);
                setIsPending(false);
            }else{
                setError('No document found');
                setIsPending(false);
            }
        }, error => {
            console.log(error.message);
            setError("Error fetching document");
            setIsPending(false);
        });
        return () => unsubscribe();
    }, [collection, Id]);
    return { doc, error, isPending };
};