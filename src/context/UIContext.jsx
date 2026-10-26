import { createContext, useCallback, useContext, useRef, useState } from 'react';

const UIContext = createContext(null);

export function UIProvider({ children }) {
  const [toastMsg, setToastMsg] = useState('');
  const [toastOn, setToastOn] = useState(false);
  const toastTimer = useRef();
  const [callOpen, setCallOpen] = useState(false);
  // Property detail modal: { img, tag, name, loc, price } or null
  const [property, setProperty] = useState(null);

  const toast = useCallback(t => {
    setToastMsg(t);
    setToastOn(true);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToastOn(false), 4200);
  }, []);

  const value = {
    toast, toastMsg, toastOn,
    callOpen, openCall: () => setCallOpen(true), closeCall: () => setCallOpen(false),
    property, openProperty: setProperty, closeProperty: () => setProperty(null),
  };
  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}

export const useUI = () => useContext(UIContext);
