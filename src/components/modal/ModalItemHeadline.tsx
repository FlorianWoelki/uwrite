interface ModalItemHeadlineProps {
  children: React.ReactText;
}

export const ModalItemHeadline: React.FC<ModalItemHeadlineProps> = ({
  children,
}): JSX.Element => {
  return (
    <p className="text-xs font-bold tracking-wide uppercase text-iron-400">
      {children}
    </p>
  );
};
