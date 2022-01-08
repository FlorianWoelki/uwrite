import { Editor } from './components/editor/Editor';
import { Toolbar } from './components/Toolbar';
import { ThemeType, useDarkMode } from './hooks/useDarkMode';

const App = (): JSX.Element => {
  const [theme, setTheme] = useDarkMode();

  const handleThemeChange = async (themeType: ThemeType): Promise<void> => {
    if (themeType === 'system') {
      if (window.darkMode) {
        await window.darkMode.system();
      } else {
        setTheme('system');
      }
    } else {
      if (window.darkMode) {
        await window.darkMode.toggle();
      } else {
        setTheme(themeType);
      }
    }
  };

  return (
    <div className="relative antialiased">
      <Toolbar onThemeChange={handleThemeChange} />
      <div className="relative w-full h-screen max-w-6xl m-auto">
        <Editor />
      </div>
    </div>
  );
};

export default App;
