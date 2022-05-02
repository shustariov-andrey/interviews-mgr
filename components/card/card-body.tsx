import React, { PropsWithChildren } from 'react';

const CardBody: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  return (
    <div className="px-4 py-5 bg-white sm:p-6">
      {children}
    </div>
  );
};

export default CardBody;
