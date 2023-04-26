import { useState } from 'react';

export const useImageSrc = (initVal: string) => {
  const [value, setValue] = useState(initVal);

  const handleChange = (val: string) => {
    setValue(val);
  };

  return {
    value,
    setValue,
  };
};
