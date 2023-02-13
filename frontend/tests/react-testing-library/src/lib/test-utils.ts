import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import store from "@/store/GitHubUser/store";

type AppDispatch = typeof store.dispatch
type AppSelector = typeof store.getState

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector = useSelector;
