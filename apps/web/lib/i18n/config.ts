export const languages = ["en", "ja"] as const;

export type Lang = (typeof languages)[number];

export const defaultLang: Lang = "en";
