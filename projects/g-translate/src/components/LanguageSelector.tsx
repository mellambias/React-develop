import { Form } from 'react-bootstrap';
import { AUTO_LANGUAGE, SUPPORTED_LANGUAGES } from '../constants';
import { Language, FromLanguage, SectionType } from '../types.d';

/*
variacione de tipos admitidos en función del valor de una
*/
type LanguageSelectorProps =
  | {
      type: SectionType.From;
      onChange: (language: FromLanguage) => void;
      value: FromLanguage;
    }
  | {
      type: SectionType.To;
      onChange: (LanguageSelectorProps: Language) => void;
      value: Language;
    };

function LanguageSelector({ onChange, type, value }: LanguageSelectorProps) {
  const handeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value as Language);
  };
  const languages = Object.entries(SUPPORTED_LANGUAGES);
  return (
    <Form.Select
      aria-label='Selecciona el idioma'
      onChange={handeChange}
      value={value}
    >
      {type === SectionType.From && (
        <option value={AUTO_LANGUAGE}>Detectar</option>
      )}
      {languages.map(([key, lang]) => (
        <option
          key={key}
          value={key}
        >
          {lang}
        </option>
      ))}
    </Form.Select>
  );
}

export { LanguageSelector };
