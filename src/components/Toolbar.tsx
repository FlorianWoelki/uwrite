import { useState } from 'react';
import { Button } from './button/Button';
import { ButtonGroup } from './button/ButtonGroup';
import { Modal } from './modal/Modal';

export const Toolbar: React.FC = (): JSX.Element => {
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
        {isModalVisible && <Modal></Modal>}
      </div>
    </div>
  );
};
