import { useState } from 'react';
import { Button } from './button/Button';
import { ButtonGroup } from './button/ButtonGroup';

const Modal: React.FC = (): JSX.Element => {
  return (
    <div className="absolute right-0 bottom-auto px-4 py-2 mt-4 border rounded shadow bg-iron-600 border-iron-400"></div>
  );
};

export const Toolbar: React.FC = (): JSX.Element => {
  const [isModalVisible, setModalVisible] = useState<boolean>(true);

  return (
    <div className="absolute inset-x-0 top-0 z-50 flex items-center justify-between px-8 py-4 shadow bg-iron-500">
      <Button>Menu</Button>

      <ButtonGroup>
        <Button>Editor</Button>
        <Button>Split</Button>
        <Button>Preview</Button>
      </ButtonGroup>

      <Button
        onClick={() => setModalVisible((isModalVisible) => !isModalVisible)}
      >
        Settings
        {isModalVisible && <Modal></Modal>}
      </Button>
    </div>
  );
};
