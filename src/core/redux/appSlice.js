import { createSlice } from '@reduxjs/toolkit';

const appSlice = createSlice({
  name: 'app',
  initialState: {
    currency: JSON.parse(localStorage.getItem('currency')) || null,
    currencies: [],
    categories: [],
    isClickCart: false,
    cart: JSON.parse(localStorage.getItem('cart')) || [],
  },
  reducers: {
    setCurrency: (state, action) => {
      state.currency = action.payload;
      localStorage.setItem('currency', JSON.stringify(action.payload));
    },
    setCurrencies: (state, action) => {
      state.currencies = action.payload;
    },
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    setCart: (state, action) => {
      state.cart.push(action.payload);
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
    setIsClickCart: (state, action) => {
      state.isClickCart = action.payload;
    },
    order: (state) => {
      state.cart = [];
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
    increaseAmount: (state, action) => {
      const product = state.cart.find(
        (product) =>
          product.id === action.payload.id &&
          product.selectedAttributes.every((attribute, idx) => {
            return (
              attribute[product.attributes[idx].id] ===
              action.payload.selectedAttributes[idx]?.[
                product.attributes[idx].id
              ]
            );
          })
      );

      product.amount = product.amount + 1;
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
    decreaseAmount: (state, action) => {
      const product = state.cart.find(
        (product) =>
          product.id === action.payload.id &&
          product.selectedAttributes.every((attribute, idx) => {
            return (
              attribute[product.attributes[idx].id] ===
              action.payload.selectedAttributes[idx]?.[
                product.attributes[idx].id
              ]
            );
          })
      );

      product.amount - 1 !== 0
        ? (product.amount = product.amount - 1)
        : (state.cart = state.cart.filter(
            (product) =>
              !(
                product.id === action.payload.id &&
                product.selectedAttributes.every((attribute, idx) => {
                  return (
                    attribute[product.attributes[idx].id] ===
                    action.payload.selectedAttributes[idx]?.[
                      product.attributes[idx].id
                    ]
                  );
                })
              )
          ));
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
  },
});

const { actions, reducer } = appSlice;

export const {
  setCurrency,
  setCurrencies,
  setCategories,
  setCart,
  setIsClickCart,
  increaseAmount,
  decreaseAmount,
  order,
} = actions;
export default reducer;
