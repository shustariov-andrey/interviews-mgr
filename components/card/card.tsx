import React, { PropsWithChildren } from 'react';

const Card: React.FC<PropsWithChildren<{}>> = ({children}) => {
  return (
    <div className="shadow overflow-hidden sm:rounded-md">
      {children}
    </div>
  );
};

export default Card;
