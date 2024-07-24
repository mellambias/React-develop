import { FromLanguage, Language } from '../types.d';

type translateParams = {
  fromLanguage: FromLanguage;
  toLanguage: Language;
  text: string;
};

const mockTranslate: Record<Language, string> = {
  es: 'Hola Mundo',
  en: 'Hello world',
  fr: 'Bonjour le monde',
  de: 'Hallo Welt',
  it: '',
  pt: '',
  ru: '',
  zh: '',
  ja: '',
  ko: '',
  ar: '',
  hi: '',
  bn: '',
  pa: '',
  te: '',
  mr: '',
  ta: '',
  ur: '',
  gu: '',
};
async function translate({ fromLanguage, toLanguage, text }: translateParams) {
  //Implementa la solución de traducción
  // siempre devuelve el mismo texto
  console.info(fromLanguage, text);
  return mockTranslate[toLanguage];
}

export { translate };
