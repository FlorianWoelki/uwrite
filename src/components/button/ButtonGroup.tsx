import React from 'react';

interface ButtonGroupProps {
  children: React.ReactElement[];
}

export const ButtonGroup: React.FC<ButtonGroupProps> = ({
  children,
}): JSX.Element => {
  const childrenWithProps = React.Children.map(
    children,
    (child: React.ReactElement, index) => {
      let className = '';
      if (index === 0) {
        className = 'border-l rounded-l border-y';
      } else if (index === children.length - 1) {
        className = 'border-r rounded-r border-y';
      } else {
        className = 'border';
      }

      return React.cloneElement(child, {
        grouped: true,
        className: className,
      });
    },
  );

  return <div className="flex items-center">{childrenWithProps}</div>;
};
