import { useState } from 'react';
import { ThemeType } from '../hooks/useDarkMode';
import { Button } from './button/Button';
import { ButtonGroup } from './button/ButtonGroup';
import { Modal } from './modal/Modal';
import { ModalItemHeadline } from './modal/ModalItemHeadline';
import { ReactComponent as SunIcon } from '../../assets/icons/sun.svg';
import { ReactComponent as MoonIcon } from '../../assets/icons/moon.svg';

interface ToolbarProps {
  onThemeChange: (themeType: ThemeType) => void;
}

export const Toolbar: React.FC<ToolbarProps> = ({
  onThemeChange,
}): JSX.Element => {
  const [isModalVisible, setModalVisible] = useState<boolean>(false);

  return (
    <div className="absolute inset-x-0 top-0 z-50 flex items-center justify-between px-8 py-4 shadow bg-iron-500">
      <Button>Menu</Button>

      <ButtonGroup>
        <Button>Editor</Button>
        <Button>Split</Button>
        <Button>Preview</Button>
      </ButtonGroup>

      <div className="relative">
        <Button
          active={isModalVisible}
          onClick={() => setModalVisible((isModalVisible) => !isModalVisible)}
        >
          Settings
        </Button>
        {isModalVisible && (
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
        )}
      </div>
    </div>
  );
};
