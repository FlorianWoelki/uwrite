import { Editor } from './components/editor/Editor';
import { Toolbar } from './components/Toolbar';
import { ThemeType, useDarkMode } from './hooks/useDarkMode';

const App = (): JSX.Element => {
  const [_, setTheme] = useDarkMode();

  const handleThemeChange = async (themeType: ThemeType): Promise<void> => {
    if (themeType === 'system') {
      if (window.theme) {
        await window.theme.setTheme('system');
      } else {
        setTheme('system');
      }
    } else {
      if (window.theme) {
        await window.theme.setTheme(themeType);
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
