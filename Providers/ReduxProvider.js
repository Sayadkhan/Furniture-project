"use client";
import { getStore } from "@/redux/store/Store";
import { Provider } from "react-redux";

export default function ReduxProvider({ children }) {
  const store = getStore();
  return <Provider store={store}>{children}</Provider>;
}
