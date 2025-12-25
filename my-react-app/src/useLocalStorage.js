import { useState } from "react";

// 1. Create the hook with key and initialValue parameters
export function useLocalStorage(key, initialValue) {
  // 2. Use useState with a functional initializer
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Try to get item from localStorage using the key
      const item = window.localStorage.getItem(key);
      // If item exists, parse and return it; otherwise return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If an error occurs (e.g., corrupt JSON), return initialValue
      console.error(error);
      return initialValue;
    }
  });

  // 3. Create a new setter function that wraps the original setStoredValue
  const setValue = (newValue) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore =
        newValue instanceof Function ? newValue(storedValue) : newValue;

      // Update the React state
      setStoredValue(valueToStore);

      // Save to local storage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  // 4. Return the [storedValue, setValue] array, just like useState
  return [storedValue, setValue];
}
