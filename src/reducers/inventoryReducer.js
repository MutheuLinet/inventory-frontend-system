const inventoryReducer = (state = { data: [], loading: false }, action) => {
  switch (action.type) {
    case "LOADING_INVENTORY":
      return {
        ...state,
        data: [...state.data],
        loading: true,
      };
    default:
      return state;
  }
};
