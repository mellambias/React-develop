import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Stack } from 'react-bootstrap';
import { useStore } from './hooks/useStore';
import { AUTO_LANGUAGE } from './constants';
import { ArrowIcon, CopyIcon, MicIcon, SpeekIcon } from './components/Icons';
import { LanguageSelector } from './components/LanguageSelector';
import { Language, FromLanguage, SectionType } from './types.d';
import { TextArea } from './components/TextArea';
import { useEffect } from 'react';
import { translate } from './services/translate';
import { useDebounce } from './hooks/useDebounce';

// componente principal
function App() {
  const {
    fromLanguage,
    toLanguage,
    fromText,
    result,
    interchangeLanguages,
    setFromLanguage,
    setToLanguage,
    setFromText,
    setResult,
    loading,
  } = useStore();

  const debounceFromText = useDebounce(fromText);

  useEffect(() => {
    if (debounceFromText === '') return;
    translate({ fromLanguage, toLanguage, text: debounceFromText }).then(
      traduccion => setResult(traduccion)
    );
  }, [fromLanguage, toLanguage, debounceFromText, setResult]);

  function handleChange() {
    interchangeLanguages();
  }

  const handleCopy = (textToCopy: string) => {
    navigator.clipboard.writeText(textToCopy).then(() => {});
    console.log(`Copiado al portapapeles "${textToCopy}"`);
  };

  type handleSpeakProps =
    | { lang: Language; textToSpread: string }
    | { lang: FromLanguage; textToSpread: string };

  const handleSpeak = ({ lang, textToSpread }: handleSpeakProps) => {
    const message = new SpeechSynthesisUtterance(textToSpread);
    message.lang = lang;

    window.speechSynthesis.speak(message);
  };

  const handleSpread = () => {
    setFromText('');
    const MySpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition: SpeechRecognition = new MySpeechRecognition();
    recognition.lang = fromLanguage;
    recognition.continuous = true;
    recognition.start();

    recognition.onresult = function (event: SpeechRecognitionEvent) {
      setFromText(event.results[0][0].transcript);
    };
    recognition.onspeechend = () => {
      recognition.stop();
    };
  };

  return (
    <Container fluid>
      <h1>Google Translate clone</h1>
      <Row>
        <Col>
          <Stack gap={2}>
            <LanguageSelector
              type={SectionType.From}
              value={fromLanguage}
              onChange={setFromLanguage}
            />
            <TextArea
              type={SectionType.From}
              value={fromText}
              onChange={setFromText}
            />
            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
              <MicIcon onClick={() => handleSpread()} />
              <SpeekIcon
                onClick={() =>
                  handleSpeak({ lang: fromLanguage, textToSpread: fromText })
                }
              />
            </div>
          </Stack>
        </Col>
        <Col>
          <span
            className={
              fromLanguage === AUTO_LANGUAGE ? 'icon disable ' : 'icon'
            }
          >
            <ArrowIcon
              onClick={handleChange}
              value={fromText}
            />
          </span>
        </Col>
        <Col>
          <Stack gap={2}>
            <LanguageSelector
              type={SectionType.To}
              value={toLanguage}
              onChange={setToLanguage}
            />
            <TextArea
              type={SectionType.To}
              loading={loading}
              value={result}
              onChange={setResult}
            />
            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
              <CopyIcon onClick={() => handleCopy(result)} />
              <SpeekIcon
                onClick={() =>
                  handleSpeak({ lang: toLanguage, textToSpread: result })
                }
              />
            </div>
          </Stack>
        </Col>
      </Row>
    </Container>
  );
}

export default App;

