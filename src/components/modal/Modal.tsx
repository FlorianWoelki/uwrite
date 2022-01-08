import { Button } from '../button/Button';
import { ButtonGroup } from '../button/ButtonGroup';

export const Modal: React.FC = (): JSX.Element => {
  return (
    <div className="absolute right-0 bottom-auto flex flex-col items-center p-4 mt-1 border rounded shadow bg-iron-600 border-iron-400">
      <div className="flex flex-col items-start space-y-1">
        <p className="text-xs font-bold tracking-wide uppercase text-iron-400">
          Theme:
        </p>
        <ButtonGroup>
          <Button>Light</Button>
          <Button>System</Button>
          <Button>Dark</Button>
        </ButtonGroup>
      </div>
    </div>
  );
};
