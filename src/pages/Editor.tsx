import { Toolbar, ToolbarTab } from '../components/Toolbar';
import { ThemeType, useDarkMode, useDarkModeMedia } from '../hooks/useDarkMode';
import { useEffect, useState } from 'react';
import { useIndexedDb } from '../db/hooks/useIndexedDb';
import { File, FileContent } from '../db/indexedDb';
import { LoadingIndicator } from '../components/LoadingIndicator';
import { useEditorPageParams } from './useEditorPageParams';
import { ContentPane } from '../components/ContentPane';
import { updateTheme } from '../components/editor/MonacoEditor';
import { useDispatch } from 'react-redux';
import {
  setCurrentFile,
  setCurrentFileContent,
} from '../store/features/currentFile';
import { setFiles, updateFile } from '../store/features/files';

export const EditorPage: React.FC = (): JSX.Element => {
  const { id } = useEditorPageParams();

  const [theme, setTheme] = useDarkMode();

  useDarkModeMedia(theme, (type) => {
    updateTheme(type === 'dark' ? 'uwrite-dark' : 'uwrite-light');
  });

  useEffect(() => {
    if (theme === 'system') {
      const prefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)',
      ).matches;
      const type = prefersDark ? 'dark' : 'light';
      updateTheme(type === 'dark' ? 'uwrite-dark' : 'uwrite-light');
    } else {
      updateTheme(theme === 'dark' ? 'uwrite-dark' : 'uwrite-light');
    }
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
  const dispatch = useDispatch();

  useEffect(() => {
    if (!indexedDb) {
      return;
    }

    (async () => {
      const file = await indexedDb.getValue<File>('file', id);
      if (!file) {
        return;
      }

      dispatch(setCurrentFile(file));
      setLoading(false);

      indexedDb.getAllValue<File>('file').then((files) => {
        dispatch(setFiles(files));
      });
    })();
  }, [indexedDb]);

  const saveContent = async (content: FileContent) => {
    if (!indexedDb) {
      return;
    }

    dispatch(setCurrentFileContent(content));
    dispatch(updateFile({ id, content }));
    await indexedDb.putValue('file', content, id);
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
      {isLoading ? (
        <div className="absolute m-auto flex h-screen w-full items-center justify-center">
          <LoadingIndicator className="z-50 h-8 w-8 text-gray-500" />
        </div>
      ) : (
        <>
          <Toolbar
            activeTab={activeTab}
            onClickEditor={() => setShouldRenderPreview(false)}
            onClickPreview={() => setShouldRenderPreview(true)}
            onThemeChange={handleThemeChange}
            onChangeFilename={saveContent}
          />
          <div className="m-auto h-screen w-full max-w-6xl">
            <ContentPane
              shouldRenderPreview={shouldRenderPreview}
              toggleRender={() => setShouldRenderPreview((p) => !p)}
              onSave={saveContent}
            />
          </div>
        </>
      )}
    </div>
  );
};
