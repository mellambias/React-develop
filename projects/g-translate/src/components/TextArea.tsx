import { Form } from 'react-bootstrap';
import { SectionType } from '../types.d';

interface TextAreaProps {
  type: SectionType;
  loading?: boolean;
  value: string;
  onChange: (text: string) => void;
}

interface GetPlaceholder {
  type: SectionType;
  loading?: boolean;
}

const getPlaceholder = ({ type, loading }: GetPlaceholder) => {
  if (type === SectionType.From) return 'Introducir texto';
  if (loading === true) return 'Cargando...';
  return 'Traducción';
};

function TextArea({ loading, type, value, onChange }: TextAreaProps) {
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(event.currentTarget.value);
  };
  return (
    <Form.Control
      as='textarea'
      placeholder={getPlaceholder({ type, loading })}
      value={value}
      autoFocus={type === SectionType.From}
      disabled={type === SectionType.To}
      onChange={handleChange}
    />
  );
}

export { TextArea };
