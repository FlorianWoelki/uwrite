import { Toolbar, ToolbarTab } from '../components/Toolbar';
import { ThemeType, useDarkMode, useDarkModeMedia } from '../hooks/useDarkMode';
import { useEffect, useState } from 'react';
import { File } from '../db/indexedDb';
import { LoadingIndicator } from '../components/LoadingIndicator';
import { useEditorPageParams } from './useEditorPageParams';
import { ContentPane } from '../components/ContentPane';
import { updateTheme } from '../components/editor/MonacoEditor';
import { useDispatch } from 'react-redux';
import { setCurrentFile } from '../store/features/currentFile';
import { setFiles } from '../store/features/files';
import { useSaveContent } from '../hooks/useSaveContent';

const NotFoundIcon: React.FC = (): JSX.Element => {
  return (
    <>
      <svg
        width="200"
        height="150"
        viewBox="0 0 800 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M25.6001 352.114C16.6383 352.114 10 344.812 10 336.514C10 332.531 11.3277 328.88 13.983 325.561L153.055 159.603C156.375 155.952 160.69 153.297 166.664 153.297C175.958 153.297 183.592 160.599 183.592 170.225V320.582H212.8C221.43 320.582 228.4 327.552 228.4 336.514C228.4 345.144 221.43 352.114 212.8 352.114H183.592V429.45C183.592 438.744 176.29 446.71 166.664 446.71C157.37 446.71 149.404 439.076 149.404 429.45V352.114H25.6001ZM149.404 208.727L55.4724 320.25H149.404V208.727Z"
          fill="#aaacaf"
        ></path>
        <path
          d="M587.2 352.114C578.238 352.114 571.6 344.812 571.6 336.514C571.6 332.531 572.928 328.88 575.583 325.561L714.655 159.603C717.974 155.952 722.289 153.297 728.264 153.297C737.558 153.297 745.191 160.599 745.191 170.225V320.582H774.4C783.03 320.582 790 327.552 790 336.514C790 345.144 783.03 352.114 774.4 352.114H745.191V429.45C745.191 438.744 737.889 446.71 728.264 446.71C718.97 446.71 711.004 439.076 711.004 429.45V352.114H587.2ZM711.004 208.727L617.072 320.25H711.004V208.727Z"
          fill="#aaacaf"
        ></path>
        <path
          d="M418.256 165.242C418.256 165.242 379.09 220.008 409.958 232.289C441.159 244.57 449.125 255.191 442.818 269.132C436.512 283.072 415.933 297.676 433.856 303.651C451.78 309.625 453.439 241.583 471.363 254.527C489.286 267.472 528.12 292.034 526.129 256.851C524.137 221.668 446.137 172.876 446.137 172.876L418.256 165.242Z"
          fill="#6b6e72"
        ></path>
        <path
          d="M275.532 313.617C275.532 313.617 300.758 272.792 329.634 276.775C358.511 280.758 387.056 235.949 393.362 244.911C400 253.872 398.341 276.775 403.319 291.711C408.298 306.315 428.545 316.936 423.898 327.889C418.919 338.511 341.915 371.37 350.213 380.332C358.511 389.294 400 385.975 400 400.911C400 415.847 350.213 439.413 350.213 439.413L288.809 367.387L275.532 313.617Z"
          fill="#6b6e72"
        ></path>
        <path
          d="M472.027 333.191C472.027 333.191 445.806 356.094 445.806 364.391C445.806 372.689 451.78 364.391 462.069 359.413C472.359 354.434 491.61 339.83 481.984 336.511C472.027 333.191 472.027 333.191 472.027 333.191Z"
          fill="#6b6e72"
        ></path>
        <path
          d="M354.196 208.723C350.213 208.723 341.915 213.369 341.251 219.344C340.588 224.987 355.192 224.655 350.213 234.612C345.234 244.569 339.592 253.531 354.196 250.544C368.8 247.225 373.115 238.263 370.46 229.965C368.136 221.999 363.158 209.055 354.196 208.723Z"
          fill="#6b6e72"
        ></path>
        <path
          d="M253.957 300.003C253.957 217.688 318.348 152.301 399.999 152.301C481.651 152.301 546.042 217.356 546.042 300.003C546.042 382.318 481.651 447.705 399.999 447.705C318.348 447.705 253.957 382.318 253.957 300.003ZM511.191 300.003C511.191 235.612 462.399 184.828 399.999 184.828C337.931 184.828 288.808 235.612 288.808 300.003C288.808 364.395 337.931 415.178 399.999 415.178C462.399 415.178 511.191 364.395 511.191 300.003Z"
          fill="#15181a"
        ></path>
      </svg>
    </>
  );
};

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
  const [isNoFile, setNoFile] = useState<boolean>(false);

  const [indexedDb, _] = useSaveContent();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!indexedDb) {
      return;
    }

    (async () => {
      const file = await indexedDb.getValue<File>('file', id);
      dispatch(setCurrentFile(file));
      setLoading(false);

      if (!file) {
        setNoFile(true);
        return;
      }

      indexedDb.getAllValue<File>('file').then((files) => {
        dispatch(setFiles(files));
      });
    })();
  }, [indexedDb]);

  useEffect(() => {
    if (shouldRenderPreview) {
      setActiveTab(ToolbarTab.PreviewView);
    } else {
      setActiveTab(ToolbarTab.EditorView);
    }
  }, [shouldRenderPreview]);

  const createNewFile = async (): Promise<void> => {
    if (!indexedDb) {
      return;
    }

    await indexedDb.putValue('file', { filename: 'Unnamed', value: '' });
  };

  return (
    <div className="relative antialiased">
      {isNoFile && (
        <div className="absolute m-auto flex h-screen w-full flex-col items-center justify-center">
          <NotFoundIcon />
          <p className="text-iron-300">No active file found.</p>
        </div>
      )}

      {isLoading ? (
        <div className="absolute m-auto flex h-screen w-full items-center justify-center">
          <LoadingIndicator className="z-50 h-8 w-8 text-gray-500" />
        </div>
      ) : (
        <>
          <Toolbar
            activeTab={activeTab}
            onEditor={() => setShouldRenderPreview(false)}
            onPreview={() => setShouldRenderPreview(true)}
            onCreateFile={createNewFile}
            onThemeChange={handleThemeChange}
          />

          {!isNoFile && (
            <div className="m-auto h-screen w-full max-w-6xl">
              <ContentPane
                shouldRenderPreview={shouldRenderPreview}
                toggleRender={() => setShouldRenderPreview((p) => !p)}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};
