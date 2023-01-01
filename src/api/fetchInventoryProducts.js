export const fetchInventoryProducts = async () => {
  const url = `https://run.mocky.io/v3/c9a84e20-f49e-4e58-8f9e-e1b9c211320e`;
  const response = await fetch(url);
  if (response.ok) {
    const allResults = await response.json();
    const data = allResults.results;
    return data;
  } else {
    alert("HTTP-Error: " + response.status);
  }
};
