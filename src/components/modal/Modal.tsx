interface ModalProps {
  children: React.ReactNode[];
}

export const Modal: React.FC<ModalProps> = ({ children }): JSX.Element => {
  return (
    <div className="absolute right-0 bottom-auto flex flex-col items-center p-4 mt-1 border rounded shadow bg-iron-600 border-iron-400">
      <div className="flex flex-col items-start space-y-1">{children}</div>
    </div>
  );
};
