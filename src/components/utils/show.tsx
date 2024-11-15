import type { FC, PropsWithChildren } from 'react';

interface ShowProps extends PropsWithChildren {
  show: boolean;
}

export const Show: FC<ShowProps> = ({ show, children }) => {
  return show ? children : null;
};