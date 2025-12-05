import { Lang } from "./config";
import fs from "fs";
import path from "path";

export async function loadTranslations(lang: Lang) {
  const filePath = path.join(
    process.cwd(),
    "app",
    "[lang]",
    "translations",
    `${lang}.json`
  );
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}
