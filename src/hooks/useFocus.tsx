import { useEffect, useRef } from 'react';
import { TextInput } from 'react-native';

function useFocus<T extends TextInput>() {
  const inputRef = useRef<T>(null);

  useEffect(() => {
    if (inputRef.current) {
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 100);
    }
  }, []);

  return inputRef;
}

export default useFocus;
