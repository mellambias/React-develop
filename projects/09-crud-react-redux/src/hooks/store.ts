// Importamos los tipos creados
import type { AppDispatch, RootState } from "../store";

// importamos la forma de utilizar el store
import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";

// Definimos los customHooks para acceder a los slices y definimos el type del mismo
// Redux no puede inferir el type, así que lo re-asignamos
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
const useAppDispatch: () => AppDispatch = useDispatch;

export { useAppSelector, useAppDispatch };
