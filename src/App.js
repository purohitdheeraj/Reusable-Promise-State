import "./styles.css";
import React, { useState, useEffect } from "react";
import { useAuth } from "./authProvider";

// https://jsonplaceholder.typicode.com/todos/1

// custom hook
const useData = () => {
  const [data, setData] = useState({});

  const [error, setError] = useState(null);
  // const [loading, setLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const loadData = async () => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos/1"
      );

      const parsedData = await response.json();
      setData(parsedData);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoaded(true);
    }
  };

  useEffect(() => {
    setTimeout(() => loadData(), 3000);
  }, []);

  return { data, error, isLoaded };
};

const usePromiseState = () => {
  const { state, dispatch } = useAuth();

  async function loadData(isCurrent) {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos/1"
      );
      const parsedData = await response.json();
      if (isCurrent) {
        dispatch({ type: "RESPONSE", response: parsedData });
      }
    } catch (error) {
      dispatch({ type: "ERROR", error: error.message });
    }
  }

  useEffect(() => {
    console.log("start");
    let isCurrent = true;
    dispatch({ type: "LOADING" });

    setTimeout(() => {
      loadData(isCurrent);
    }, 3000);

    return () => {
      isCurrent = false;
    };
  }, []);

  return state;
};

export default function App() {
  // const { data, isLoaded, error } = useData();
  const { response, loading, error } = usePromiseState();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <div className="App">
      <strong>{response.title}</strong>
    </div>
  );
}
