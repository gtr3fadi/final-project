import React, { useEffect, useState } from "react";
import { projectFirestore } from "../firebase/firebase";

const Home = () => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setIsPending(true);

    projectFirestore
      .collection("recipe")
      .get()
      .then((snapshot) => {
        if (snapshot.empty) {
          setError(true);
          setIsPending(false);
        } else {
          const result = [];
          snapshot.forEach((doc) => {
            result.push({
              id: doc.id,
              ...doc.data(),
            });
            setData(result);
          });
        }
      })
      .catch((err) => {
        setError(true);
        setIsPending(false);
      });
  }, []);

  return (
    <div>
      <h1>Home</h1>
    </div>
  );
};

export default Home;
