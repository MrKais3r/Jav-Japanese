"use client";

import { createContext, useContext } from "react";

const TranslationContext = createContext({ t: (k: string) => k });

export function TranslationProvider({ children, dictionary }) {
  const t = (key: string) => dictionary[key] ?? key;

  return (
    <TranslationContext.Provider value={{ t }}>
      {children}
    </TranslationContext.Provider>
  );
}

export function useT() {
  return useContext(TranslationContext).t;
}
