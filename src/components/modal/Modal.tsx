interface ModalProps {
  left?: boolean;
  children: React.ReactNode[];
}

export const Modal: React.FC<ModalProps> = ({
  children,
  left,
}): JSX.Element => {
  return (
    <div
      className={`absolute bottom-auto mt-1 flex flex-col items-center rounded border border-iron-400 bg-iron-600 p-4 shadow ${
        left ? 'left-0' : 'right-0'
      }`}
    >
      <div className="flex flex-col items-start space-y-1">{children}</div>
    </div>
  );
};
