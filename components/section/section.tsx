import React, { PropsWithChildren } from 'react';

interface SectionProps {
  title: string;
  subtitle?: string;
}

const Section: React.FC<PropsWithChildren<SectionProps>> = ({children, title, subtitle}) => {
  return (
    <>
      <div className="mt-10 sm:mt-0 py-6 sm:px-6 lg:px-8">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-gray-900">{title}</h3>
              <p className="mt-1 text-sm text-gray-600">{subtitle}</p>
            </div>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2">
            {children}
          </div>
        </div>
      </div>
    </>
  );
}

export default Section;
