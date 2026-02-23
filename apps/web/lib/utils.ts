import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function fisherYatesShuffle(array: any[]) {
    const arr = [...array]; // important: clone
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

export function transformSectionIdString(str: string) {
    const firstDashIndex = str.indexOf("-");
    if (firstDashIndex === -1) return str;

    // Remove everything before first dash
    const afterFirstDash = str.substring(firstDashIndex + 1);

    // Replace ALL remaining dashes with space
    return afterFirstDash.replace(/-/g, " ");
}
