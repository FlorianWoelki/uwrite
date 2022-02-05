interface ModalItemHeadlineProps {
  children: React.ReactText;
}

export const ModalItemHeadline: React.FC<ModalItemHeadlineProps> = ({
  children,
}): JSX.Element => {
  return (
    <p className="text-xs font-bold uppercase tracking-wide text-iron-400">
      {children}
    </p>
  );
};
