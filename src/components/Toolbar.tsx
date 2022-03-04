import { useState } from 'react';
import { ThemeType } from '../hooks/useDarkMode';
import { Button } from './button/Button';
import { ButtonGroup } from './button/ButtonGroup';
import { Modal } from './modal/Modal';
import { ModalItemHeadline } from './modal/ModalItemHeadline';
import { ReactComponent as SunIcon } from '../../assets/icons/sun.svg';
import { ReactComponent as MoonIcon } from '../../assets/icons/moon.svg';
import { ReactComponent as MenuIcon } from '../../assets/icons/menu.svg';
import { ReactComponent as CogIcon } from '../../assets/icons/cog.svg';
import { ModalTransition } from './modal/ModalTransition';
import { FileDisplay } from './file/FileDisplay';

export enum ToolbarTab {
  EditorView = 0,
  SplitView,
  PreviewView,
}

interface ToolbarProps {
  activeTab: ToolbarTab;
  onThemeChange: (themeType: ThemeType) => void;
  onClickPreview: () => void;
  onClickEditor: () => void;
}

export const Toolbar: React.FC<ToolbarProps> = ({
  activeTab,
  onThemeChange,
  onClickPreview,
  onClickEditor,
}): JSX.Element => {
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const [isMenuVisible, setMenuVisible] = useState<boolean>(false);

  return (
    <div className="mb-4 flex items-center justify-between bg-iron-100 px-8 py-4 shadow dark:bg-iron-500">
      <div className="relative">
        <Button
          active={isMenuVisible}
          onClick={() => setMenuVisible((p) => !p)}
        >
          <MenuIcon />
        </Button>
        <ModalTransition show={isMenuVisible}>
          <Modal left>
            <ModalItemHeadline>Files:</ModalItemHeadline>
            <FileDisplay />
          </Modal>
        </ModalTransition>
      </div>

      <ButtonGroup>
        <Button
          active={activeTab === ToolbarTab.EditorView}
          onClick={onClickEditor}
        >
          Editor
        </Button>
        <Button active={activeTab === ToolbarTab.SplitView}>Split</Button>
        <Button
          active={activeTab === ToolbarTab.PreviewView}
          onClick={onClickPreview}
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
          </Modal>
        </ModalTransition>
      </div>
    </div>
  );
};
