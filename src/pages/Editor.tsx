import { Toolbar, ToolbarTab } from '../components/Toolbar';
import { ThemeType, useDarkMode, useDarkModeMedia } from '../hooks/useDarkMode';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useIndexedDb } from '../db/hooks/useIndexedDb';
import { File } from '../db/indexedDb';
import { LoadingIndicator } from '../components/LoadingIndicator';
import { useEditorPageParams } from './useEditorPageParams';
import { ContentPane } from '../components/ContentPane';
import { updateTheme } from '../components/editor/MonacoEditor';

export const EditorPage: React.FC = (): JSX.Element => {
  const { id } = useEditorPageParams();

  const [theme, setTheme] = useDarkMode();

  useDarkModeMedia(theme, (type) => {
    updateTheme(type === 'dark' ? 'uwrite-dark' : 'uwrite-light');
  });

  useEffect(() => {
    updateTheme(theme === 'dark' ? 'uwrite-dark' : 'uwrite-light');
  }, [theme]);

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

  const [activeTab, setActiveTab] = useState<ToolbarTab>(ToolbarTab.EditorView);

  const [shouldRenderPreview, setShouldRenderPreview] =
    useState<boolean>(false);

  const [isLoading, setLoading] = useState<boolean>(true);

  const indexedDb = useIndexedDb();
  const [fileValue, setFileValue] = useState<string>('');
  useEffect(() => {
    if (!indexedDb) {
      return;
    }

    (async () => {
      const file = await indexedDb.getValue<File>('file', id);
      if (!file) {
        return;
      }

      setFileValue(file.value);
      setLoading(false);
    })();
  }, [indexedDb]);

  const saveValue = async (value: string) => {
    if (!indexedDb) {
      return;
    }

    setFileValue(value);
    await indexedDb.putValue(
      'file',
      {
        value,
      },
      id,
    );
  };

  useEffect(() => {
    if (shouldRenderPreview) {
      setActiveTab(ToolbarTab.PreviewView);
    } else {
      setActiveTab(ToolbarTab.EditorView);
    }
  }, [shouldRenderPreview]);

  return (
    <div className="relative antialiased">
      <Toolbar
        activeTab={activeTab}
        onClickEditor={() => setShouldRenderPreview(false)}
        onClickPreview={() => setShouldRenderPreview(true)}
        onThemeChange={handleThemeChange}
      />
      {isLoading ? (
        <div className="absolute m-auto flex h-screen w-full items-center justify-center">
          <LoadingIndicator className="z-50 h-8 w-8 text-gray-500" />
        </div>
      ) : (
        <div className="m-auto h-screen w-full max-w-6xl">
          <ContentPane
            fileValue={fileValue}
            shouldRenderPreview={shouldRenderPreview}
            toggleRender={() => setShouldRenderPreview((p) => !p)}
            onSave={saveValue}
          />
        </div>
      )}
    </div>
  );
};
