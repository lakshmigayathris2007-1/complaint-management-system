import { useEffect, useState } from 'react';

// Delays updating the returned value until `value` stops changing for
// `delayMs`. Used on search boxes so we don't re-filter on every keystroke.
export function useDebounce(value, delayMs = 350) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => setDebounced(value), delayMs);
    return () => clearTimeout(timeout);
  }, [value, delayMs]);

  return debounced;
}
