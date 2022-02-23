import { Toolbar, ToolbarTab } from '../components/Toolbar';
import { ThemeType, useDarkMode } from '../hooks/useDarkMode';
import { useEffect, useState } from 'react';
import { useIndexedDb } from '../db/hooks/useIndexedDb';
import { File } from '../db/indexedDb';
import { LoadingIndicator } from '../components/LoadingIndicator';
import { useEditorPageParams } from './useEditorPageParams';
import { ContentPane } from '../components/ContentPane';

export const EditorPage: React.FC = (): JSX.Element => {
  const { id } = useEditorPageParams();

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

  const [activeTab, setActiveTab] = useState<ToolbarTab>(ToolbarTab.EditorView);

  const [shouldRenderPreview, setShouldRenderPreview] =
    useState<boolean>(false);

  const [isLoading, setLoading] = useState<boolean>(true);

  const renderEditorContent = (): void => {
    setActiveTab(0);
    setShouldRenderPreview(false);
  };

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

  return (
    <div className="relative antialiased">
      <Toolbar
        activeTab={activeTab}
        onClickEditor={renderEditorContent}
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
