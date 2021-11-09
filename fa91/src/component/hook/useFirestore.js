import { useEffect, useReducer, useState } from "react";
import { projectFirestore, timestamp } from "../../firebase/firebase";

let initialState = {
  document: null,
  isPending: false,
  error: null,
  success: null,
};

const firestoreReducer = (state, action) => {
  switch (action.type) {
    case "PENDING":
      return { document: null, isPending: true, error: null, success: false }
    case 'ADDED_DOCUMENT':
      return {
        document: action.payload,
        isPending: false,
        error: null,
        success: true,
      }
    case "ERROR":
      return {
        document: null,
        isPending: false,
        error: action.payload,
        success: false,
      }

    default:
      return state;
  }
}

export const useFirestore = (collection) => {
  const [response, dispatch] = useReducer(firestoreReducer, initialState);
  const [isCancelled, setIsCancelled] = useState(false);

  //collection reference
  const ref = projectFirestore.collection(collection)

  // only dispatch if not cancelled

  const dispatchNotCancelled = (action) => {
    if (!isCancelled) {
      dispatch(action);
    }
  }

  // add document
  const addDocument = async (doc) => {
    dispatch({ type: "PENDING" })
    try {
      const createdAt = timestamp.fromDate(new Date())
      const addedDocument = await ref.add({ ...doc, createdAt })
      dispatchNotCancelled({ type: 'ADDED_DOCUMENT', payload: addedDocument })
    } catch (error) {
        dispatchNotCancelled({ type: "ERROR", payload: error })
    }
    console.log(response);
  };

  // update document
  const updateDocument = (id) => {};

  // delete document
  const deleteDocument =  (id) => {};

  //clenup function

  useEffect(() => {
    return () =>  setIsCancelled(true);
  }, []);

  return { addDocument, updateDocument, deleteDocument, response };
};
