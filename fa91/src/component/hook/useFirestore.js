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
    case "DELETED_DOCUMENT":
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
  const updateDocument = async (id) =>  {
    dispatch({ type: "PENDING" })
    try {
      const updatedDocument = await ref.doc(id).update({
        updatedAt: timestamp.fromDate(new Date()),
      })
      dispatchNotCancelled({ type: 'ADDED_DOCUMENT', payload: updatedDocument })
    } catch (error) {
      dispatchNotCancelled({ type: "ERROR", payload: error })
    }
  };

  // delete document
  const deleteDocument = async (id) => {
    prompt('Are you sure you want to delete this document?', 'Yes')
    dispatch({ type: "PENDING" })
    try {
      const deleteDocument=  await ref.doc(id).delete()
      dispatchNotCancelled({ type: "DELETED_DOCUMENT", payload: deleteDocument })
    } catch (error) {
      dispatchNotCancelled({ type: "ERROR", payload: error })
    }

  };

  //clenup function

  useEffect(() => {
    return () =>  setIsCancelled(true);
  }, []);

  return { addDocument, updateDocument, deleteDocument, response };
};
