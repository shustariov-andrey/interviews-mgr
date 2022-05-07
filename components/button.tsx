import React, { PropsWithChildren } from 'react';

type Props = {
  onClick?: () => void;
  theme: 'indigo' | 'red';
}

const Button: React.FC<PropsWithChildren<Props>> = ({ children,theme,  onClick }) => {
  let classes = 'inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2'
  classes += ` bg-${theme}-600 hover:bg-${theme}-700 focus:ring-${theme}-500`;
  return (
    <>
      <button type="button" onClick={onClick} className={classes}>
        {children}
      </button>
    </>
  );
}

export default Button;
