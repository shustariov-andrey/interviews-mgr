import React from 'react';

const SectionSeparator: React.FC = () => {
  return (
    <div className="hidden sm:block" aria-hidden="true">
      <div className="pt-5">
        <div className="border-t border-gray-200" />
      </div>
    </div>
  )
}

export default SectionSeparator;
