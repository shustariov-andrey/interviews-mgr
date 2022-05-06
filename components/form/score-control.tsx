import { StarIcon } from '@heroicons/react/solid';
import React, { useEffect, useMemo, useRef } from 'react';

interface ScoreControlProps {
  label?: string;
  value: number;
  onChange: (value: number) => void;
}

const ScoreControl: React.FC<ScoreControlProps> = ({ label, value, onChange }) => {
  const containerEl = useRef<HTMLDivElement>(null);
  const stars = useMemo(() => [1, 2, 3, 4, 5], []);

  const valueToIndex = useMemo(() => (value: number): number => stars.indexOf(value), [stars]);

  useEffect(() => {
    highlight(valueToIndex(value));
  }, [valueToIndex, stars, value]);


  const highlight = (index: number): void => {
    const stars = Array.from((containerEl.current as HTMLElement).children);
    for (let i = 0; i < stars.length; ++i) {
      if (i <= index) {
        stars[i].classList.add('text-yellow-400');
        stars[i].classList.remove('text-yellow-100');
      } else {
        stars[i].classList.add('text-yellow-100');
        stars[i].classList.remove('text-yellow-400');
      }
    }
  };

  const select = (value: number): void => {
    onChange(value);
  };

  return (
    <>
      {
        label &&
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      }
      <div ref={containerEl} className="flex items-center">
        {
          stars.map((currentValue, index) =>
            <StarIcon key={index} className="w-10 h-10 text-yellow-100" onMouseOver={() => highlight(index)}
                      onMouseOut={() => highlight(valueToIndex(value))} onClick={() => select(currentValue)}></StarIcon>,
          )
        }
      </div>
    </>
  );
};

export default ScoreControl;
