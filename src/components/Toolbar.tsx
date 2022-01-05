import { Button } from './Button';
import { ButtonGroup } from './ButtonGroup';

export const Toolbar: React.FC = (): JSX.Element => {
  return (
    <div className="absolute inset-x-0 top-0 z-50 flex items-center justify-between px-8 py-4 shadow bg-iron-500">
      <Button>Menu</Button>

      <ButtonGroup>
        <Button>Editor</Button>
        <Button>Split</Button>
        <Button>Preview</Button>
      </ButtonGroup>

      <Button>Settings</Button>
    </div>
  );
};
