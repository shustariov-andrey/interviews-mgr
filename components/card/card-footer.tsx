import React, { PropsWithChildren } from 'react';

const CardFooter: React.FC<PropsWithChildren<{}>> = ({children}) => {
  return (
    <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
      {children}
    </div>
  );
};

export default CardFooter;
