import { SUPPORTED_LANGUAGES, AUTO_LANGUAGE } from './constants';

type Language = keyof typeof SUPPORTED_LANGUAGES;
type AutoLanguage = typeof AUTO_LANGUAGE;
type FromLanguage = Language | AutoLanguage;

// cuando se trata de objetos se suele utilizar un "interface" en lugar de un "type"
interface State {
  fromLanguage: FromLanguage;
  toLanguage: Language;
  fromText: string;
  result: string;
  loading: boolean;
}

type Action =
  | { type: 'SET_FROM_LANGUAGE'; payload: FromLanguage }
  | { type: 'SET_TO_LANGUAGE'; payload: Language }
  | { type: 'SET_FROM_TEXT'; payload: string }
  | { type: 'SET_RESULT'; payload: string }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'INTERCHANGE_LANGUAGES' };

enum SectionType {
  From = 'from',
  To = 'to',
}

export { State, Action, Language, FromLanguage, SectionType };
