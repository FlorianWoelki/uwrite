import { Editor } from './components/editor/Editor';
import { useDarkMode } from './hooks/useDarkMode';

const App = (): JSX.Element => {
  const handleResetThemeToSystem = async (): Promise<void> => {
    // @ts-ignore
    if (window.darkMode) {
      // @ts-ignore
      await window.darkMode.system();
    } else {
      setTheme('system');
    }
  };

  const handleToggleTheme = async (): Promise<void> => {
    // @ts-ignore
    if (window.darkMode) {
      // @ts-ignore
      await window.darkMode.toggle();
    } else {
      setTheme(theme === 'dark' ? 'light' : 'dark');
    }
  };

  const [theme, setTheme] = useDarkMode();

  return (
    <div className="relative w-full h-screen max-w-6xl m-auto">
      <Editor />
      <div className="absolute top-0 left-0 space-x-4 text-white dark:text-red-500">
        <button onClick={handleToggleTheme}>Test Toggle Theme</button>
        <button onClick={handleResetThemeToSystem}>Test Reset Theme</button>
      </div>
    </div>
  );
};

export default App;
