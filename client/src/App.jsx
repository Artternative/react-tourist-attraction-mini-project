import "./App.css";
import axios from "axios";
import React, { useState, useEffect } from "react";

export default function App() {
  useEffect(() => {
    getResult();
  }, []);
  const getResult = async () => {
    const response = await axios.get("http://localhost:4001/trips");
    console.log(response.data);
  };

  return (
         <div></div>
  );
}
