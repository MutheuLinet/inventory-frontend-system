export async function get(url, succeed = () => {}, fail = () => {}) {
  try {
    const res = await fetch(url, {
      ...defaultOptions,
    });
    if (res.ok) {
      const data = await res.json();
      succeed(data);
    } else {
      throw res.statusText;
    }
  } catch (err) {
    fail(err);
  }
}

export const fetchInventory = () => {
  return (dispatch) => {
    dispatch({
      type: "LOADING_INVENTORY",
    });
    const url = "https://run.mocky.io/v3/c9a84e20-f49e-4e58-8f9e-e1b9c211320e";
    return get(url);
  };
};
