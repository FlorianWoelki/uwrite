import React, { useState } from 'react';
import { ThemeType } from '../hooks/useDarkMode';
import { Button } from './button/Button';
import { ButtonGroup } from './button/ButtonGroup';
import { Modal } from './modal/Modal';
import { ModalItemHeadline } from './modal/ModalItemHeadline';
import { ReactComponent as SunIcon } from '../../assets/icons/sun.svg';
import { ReactComponent as MoonIcon } from '../../assets/icons/moon.svg';
import { ReactComponent as MenuIcon } from '../../assets/icons/menu.svg';
import { ReactComponent as CogIcon } from '../../assets/icons/cog.svg';
import { ReactComponent as PlusIcon } from '../../assets/icons/plus.svg';
import { ReactComponent as CircleIcon } from '../../assets/icons/circle.svg';
import { ModalTransition } from './modal/ModalTransition';
import { FileDisplay } from './file/FileDisplay';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsVimActive, selectCurrentFile } from '../store';
import { InputField } from './InputField';
import { useSaveContent } from '../hooks/useSaveContent';
import { classes } from '../util/classes';
import { toggleVim } from '../store/features/editor';

export enum ToolbarTab {
  EditorView = 0,
  SplitView,
  PreviewView,
}

interface ToolbarProps {
  activeTab: ToolbarTab;
  onThemeChange: (themeType: ThemeType) => void;
  onPreview: () => void;
  onEditor: () => void;
  onCreateFile: () => void;
}

export const Toolbar: React.FC<ToolbarProps> = ({
  activeTab,
  onThemeChange,
  onPreview,
  onEditor,
  onCreateFile,
}): JSX.Element => {
  const dispatch = useDispatch();

  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const [isMenuVisible, setMenuVisible] = useState<boolean>(false);

  const currentFile = useSelector(selectCurrentFile);
  const [_, saveContent] = useSaveContent();

  const isVimActive = useSelector(selectIsVimActive);

  return (
    <div className="mb-4 flex items-center justify-between bg-iron-100 px-8 py-4 shadow dark:bg-iron-500">
      <div className="relative">
        <Button
          active={isMenuVisible}
          onClick={() => setMenuVisible((p) => !p)}
          className="relative"
        >
          <MenuIcon />
        </Button>
        <ModalTransition show={isMenuVisible}>
          <Modal left>
            <ModalItemHeadline>
              <div className="flex w-full items-center justify-between">
                <p>Files:</p>
                <button
                  type="button"
                  className="cursor-pointer"
                  onClick={onCreateFile}
                >
                  <PlusIcon className="h-4 w-4" />
                </button>
              </div>
            </ModalItemHeadline>
            <FileDisplay />
          </Modal>
        </ModalTransition>

        <div className="absolute left-0 top-1/2 ml-14 flex min-w-max -translate-y-1/2 text-sm text-iron-400">
          <span>./</span>
          <InputField
            initialValue={currentFile?.filename ?? 'No File'}
            disabled={currentFile === undefined}
            onBlur={(newValue) =>
              saveContent({ ...currentFile!, filename: newValue })
            }
          />
        </div>
      </div>

      <ButtonGroup>
        <Button
          active={activeTab === ToolbarTab.EditorView}
          onClick={onEditor}
          disabled={currentFile === undefined}
        >
          Editor
        </Button>
        <Button
          active={activeTab === ToolbarTab.SplitView}
          disabled={currentFile === undefined}
        >
          Split
        </Button>
        <Button
          active={activeTab === ToolbarTab.PreviewView}
          onClick={onPreview}
          disabled={currentFile === undefined}
        >
          Preview
        </Button>
      </ButtonGroup>

      <div className="relative">
        <Button
          active={isModalVisible}
          onClick={() => setModalVisible((isModalVisible) => !isModalVisible)}
        >
          <CogIcon />
        </Button>
        <ModalTransition show={isModalVisible}>
          <Modal>
            <div className="space-y-1">
              <ModalItemHeadline>Theme:</ModalItemHeadline>
              <ButtonGroup>
                <Button onClick={() => onThemeChange('light')}>
                  <div className="flex items-center space-x-2">
                    <SunIcon />
                    <span>Light</span>
                  </div>
                </Button>
                <Button onClick={() => onThemeChange('system')}>System</Button>
                <Button onClick={() => onThemeChange('dark')}>
                  <div className="flex items-center space-x-2">
                    <MoonIcon />
                    <span>Dark</span>
                  </div>
                </Button>
              </ButtonGroup>
            </div>
            <div className="space-y-1">
              <ModalItemHeadline>VIM:</ModalItemHeadline>
              <ButtonGroup>
                <Button
                  active={isVimActive}
                  onClick={() => dispatch(toggleVim(true))}
                >
                  <div className="flex items-center space-x-2">
                    <CircleIcon
                      className={classes(
                        { 'text-gray-400': isVimActive },
                        'h-3 w-3',
                      )}
                    />
                    <span>On</span>
                  </div>
                </Button>
                <Button
                  active={!isVimActive}
                  onClick={() => dispatch(toggleVim(false))}
                >
                  <div className="flex items-center space-x-2">
                    <CircleIcon
                      className={classes(
                        { 'text-gray-400': !isVimActive },
                        'h-3 w-3',
                      )}
                    />
                    <span>Off</span>
                  </div>
                </Button>
              </ButtonGroup>
            </div>
          </Modal>
        </ModalTransition>
      </div>
    </div>
  );
};
