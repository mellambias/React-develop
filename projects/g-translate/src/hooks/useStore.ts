import { useReducer } from 'react';
import { State, Action, Language, FromLanguage } from '../types';
import { AUTO_LANGUAGE } from '../constants';
// reducer para los estados

const initialState: State = {
  fromLanguage: 'es',
  toLanguage: 'en',
  fromText: '',
  result: '',
  loading: false,
};

function reducer(state: State, action: Action): State {
  const { type } = action;

  switch (type) {
    case 'SET_FROM_LANGUAGE': {
      if (action.payload === state.toLanguage) return state;
      const loading = state.fromText !== '';
      return { ...state, fromLanguage: action.payload, loading };
    }
    case 'SET_TO_LANGUAGE': {
      if (action.payload === state.toLanguage) return state;
      const loading = state.fromText !== '';
      return { ...state, toLanguage: action.payload, loading };
    }
    case 'SET_FROM_TEXT': {
      const loading = action.payload !== '';
      return {
        ...state,
        fromText: action.payload,
        loading,
        result: action.payload,
      };
    }
    case 'SET_RESULT': {
      return { ...state, result: action.payload, loading: false };
    }
    case 'SET_LOADING': {
      return { ...state, loading: action.payload };
    }
    case 'INTERCHANGE_LANGUAGES': {
      if (state.fromLanguage === AUTO_LANGUAGE) return state;
      const loading = state.fromText !== '';
      return {
        ...state,
        loading,
        result: '',
        fromLanguage: state.toLanguage,
        toLanguage: state.fromLanguage,
        fromText: state.result,
      };
    }
    default: {
      return state;
    }
  }
}

/*
  useStore actua como Proxy entre el cliente y el reducer
  ocultando al cliente la lógica de cómo se actualiza el estado
  y la lógica de cómo se accede al estado
*/
function useStore() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const dispatchActions = {
    setFromLanguage: (payload: FromLanguage) => {
      dispatch({ type: 'SET_FROM_LANGUAGE', payload });
    },
    setToLanguage: (payload: Language) => {
      dispatch({ type: 'SET_TO_LANGUAGE', payload });
    },
    setFromText: (payload: string) => {
      dispatch({ type: 'SET_FROM_TEXT', payload });
    },
    setResult: (payload: string) => {
      dispatch({ type: 'SET_RESULT', payload });
    },
    setLoading: (payload: boolean) => {
      dispatch({ type: 'SET_LOADING', payload });
    },
    interchangeLanguages: () => {
      dispatch({ type: 'INTERCHANGE_LANGUAGES' });
    },
  };
  return {
    ...state,
    ...dispatchActions,
  };
}

export { useStore };
