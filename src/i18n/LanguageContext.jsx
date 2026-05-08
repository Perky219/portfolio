import { createContext, useState } from "react";
import { en } from "./en";
import { es } from "./es";

export const LanguageContext = createContext(null);

const translations = { en, es };

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState("es");

  return (
    <LanguageContext.Provider value={{ t: translations[lang], lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}
