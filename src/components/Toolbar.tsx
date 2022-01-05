import { Button } from './Button';

export const Toolbar: React.FC = (): JSX.Element => {
  return (
    <div className="absolute inset-x-0 top-0 z-50 flex items-center justify-between px-8 py-4 shadow bg-iron-500">
      <Button>Menu</Button>

      <div className="space-x-4">
        <Button>Editor</Button>
        <Button>Split</Button>
        <Button>Preview</Button>
      </div>

      <Button>Settings</Button>
    </div>
  );
};
