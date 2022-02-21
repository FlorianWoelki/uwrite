import { Transition } from '@headlessui/react';

interface ModalTransitionProps {
  show: boolean;
  children: React.ReactNode[] | React.ReactNode;
}

export const ModalTransition: React.FC<ModalTransitionProps> = ({
  show,
  children,
}): JSX.Element => {
  return (
    <Transition
      as="div"
      className="absolute right-0 left-0 z-50"
      show={show}
      enter="transform transition duration-200"
      enterFrom="opacity-0 scale-50"
      enterTo="opacity-100 scale-100"
      leave="transform duration-200 transition ease-in-out"
      leaveFrom="opacity-100 scale-100"
      leaveTo="opacity-0 scale-50"
    >
      {children}
    </Transition>
  );
};
