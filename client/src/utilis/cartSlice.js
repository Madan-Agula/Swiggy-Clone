import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    item: JSON.parse(localStorage.getItem('item'))||{},
  },
  reducers: {
    addItems: (state, action) => {
      const { id, data } = action.payload;
      state.item = {
        id,
        menu_data: [{ data, count: 1 }],
      };
    },
    updateItems: (state, action) => {
      const { id } = action.payload;
      const data = action.payload;
      const flag = state.item.menu_data.find((item) => item.data.id === id);
      if (flag) {
        state.item.menu_data = state.item.menu_data.map((d) =>
          d.data.id === id ? { ...d, count: d.count + 1 } : d
        );
      } else {
        state.item.menu_data.push({ data, count: 1 });
      }
    },
    removeItems: (state, action) => {
      const { id } = action.payload.data;
      const value = action.payload.value;

      if (value === 1 && state.item?.menu_data?.length === 1) {
        state.item = {};
      } else if (value === 1) {
        state.item.menu_data = state.item.menu_data.filter(
          (i) => i.data.id !== id
        );
      } else {
        state.item.menu_data = state.item.menu_data.map((d) =>
          d.data.id === id ? { ...d, count: d.count - 1 } : d
        );
      }
    },
    paymentAdd : (state,action)=>{
     const data = action.payload;
     state.item.menu_data = state.item.menu_data.map((d) =>
          d.data.id === data.data.id ? { ...d, count: d.count + 1 } : d
        )
    },
    paymentRemove :(state,action)=>{
      const data = action.payload.data;
      const value = action.payload.value;
      if (value === 1 && state.item?.menu_data?.length === 1) {
        state.item = {};
        localStorage.setItem('item',JSON.stringify(state.item));
      } else if (value === 1) {
        state.item.menu_data = state.item.menu_data.filter(
          (i) => i.data.id !== data.data.id
        );
      } else {
        state.item.menu_data = state.item.menu_data.map((d) =>
          d.data.id === data.data.id ? { ...d, count: d.count - 1 } : d
        );
    }
  },

    clearCart: (state) => {
      state.item = {};
    },
  },
});

export const { addItems, updateItems, removeItems,paymentAdd,paymentRemove, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
