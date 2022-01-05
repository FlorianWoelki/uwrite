import React from 'react';

interface ButtonGroupProps {
  children: React.ReactElement[];
}

export const ButtonGroup: React.FC<ButtonGroupProps> = ({
  children,
}): JSX.Element => {
  const childrenWithProps = React.Children.map(
    children,
    (child: React.ReactElement) => {
      return React.cloneElement(child, {
        grouped: true,
      });
    },
  );

  return <div>{childrenWithProps}</div>;
};
