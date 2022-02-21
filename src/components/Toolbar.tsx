import { Transition } from '@headlessui/react';
import { useState } from 'react';
import { ThemeType } from '../hooks/useDarkMode';
import { Button } from './button/Button';
import { ButtonGroup } from './button/ButtonGroup';
import { Modal } from './modal/Modal';
import { ModalItemHeadline } from './modal/ModalItemHeadline';
import { ReactComponent as SunIcon } from '../../assets/icons/sun.svg';
import { ReactComponent as MoonIcon } from '../../assets/icons/moon.svg';
import { ReactComponent as ChevronRight } from '../../assets/icons/chevron-right.svg';
import { ReactComponent as ChevronLeft } from '../../assets/icons/chevron-left.svg';

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
    <div className="mb-4 flex items-center justify-between bg-iron-500 px-8 py-4 shadow">
      <div className="relative">
        <Button
          active={isMenuVisible}
          onClick={() => setMenuVisible((p) => !p)}
        >
          {isMenuVisible ? <ChevronLeft /> : <ChevronRight />}
        </Button>
        <Transition
          as="div"
          className="absolute right-0 left-0 z-50"
          show={isMenuVisible}
          enter="transform transition duration-200"
          enterFrom="opacity-0 scale-50"
          enterTo="opacity-100 scale-100"
          leave="transform duration-200 transition ease-in-out"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-50"
        >
          <Modal left>
            <ModalItemHeadline>Theme:</ModalItemHeadline>
            test
          </Modal>
        </Transition>
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
          Settings
        </Button>
        <Transition
          as="div"
          className="absolute right-0 left-0 z-50"
          show={isModalVisible}
          enter="transform transition duration-200"
          enterFrom="opacity-0 scale-50"
          enterTo="opacity-100 scale-100"
          leave="transform duration-200 transition ease-in-out"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-50"
        >
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
        </Transition>
      </div>
    </div>
  );
};
