interface ModalProps {
  children: React.ReactNode[];
}

export const Modal: React.FC<ModalProps> = ({ children }): JSX.Element => {
  return (
    <div className="absolute right-0 bottom-auto mt-1 flex flex-col items-center rounded border border-iron-400 bg-iron-600 p-4 shadow">
      <div className="flex flex-col items-start space-y-1">{children}</div>
    </div>
  );
};
