import React from "react";
import axios from "axios";

export const fetchData = () => {
  return axios.get(
    "https://run.mocky.io/v3/c9a84e20-f49e-4e58-8f9e-e1b9c211320e"
  );
};
