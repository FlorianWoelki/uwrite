interface ModalItemHeadlineProps {
  children: React.ReactNode | React.ReactText;
}

export const ModalItemHeadline: React.FC<ModalItemHeadlineProps> = ({
  children,
}): JSX.Element => {
  return (
    <div className="w-full text-xs font-bold uppercase tracking-wide text-iron-400">
      {children}
    </div>
  );
};
