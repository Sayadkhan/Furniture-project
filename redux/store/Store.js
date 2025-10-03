"use client";
import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "../slice/CartSlice";
import filterSlice from "../slice/filterSlice";

let store;

export function makeStore() {
  return configureStore({
    reducer: {
      cart: cartSlice,
      filters: filterSlice,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
    devTools: process.env.NODE_ENV !== "production",
  });
}

export const getStore = () => {
  if (!store) {
    store = makeStore();
  }
  return store;
};
