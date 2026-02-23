// Reward system — tracks unlocked gallery images in localStorage
// Images live in /public/rewards/h/ (hiragana) and /public/rewards/k/ (katakana)

const REWARD_KEY = "jav_rewards";

export type RewardImage = {
    src: string; // e.g. "/rewards/h/a.jpg"
    kana: string; // e.g. "あ"
    romaji: string; // e.g. "a"
    type: "hiragana" | "katakana";
    sectionId: string; // which section unlocked it, e.g. "0-hiragana-1"
    unlockedAt: number; // timestamp
};

// All possible reward images — maps sectionId → images unlocked upon completion
// Only hiragana-1 and katakana-1 have images per character
export const REWARD_MAP: Record<
    string,
    { src: string; kana: string; romaji: string; type: "hiragana" | "katakana" }[]
> = {
    "0-hiragana-1": [
        { src: "/rewards/h/a.jpg", kana: "あ", romaji: "a", type: "hiragana" },
        { src: "/rewards/h/i.jpg", kana: "い", romaji: "i", type: "hiragana" },
        { src: "/rewards/h/u.jpg", kana: "う", romaji: "u", type: "hiragana" },
        { src: "/rewards/h/e.jpg", kana: "え", romaji: "e", type: "hiragana" },
        { src: "/rewards/h/o.jpg", kana: "お", romaji: "o", type: "hiragana" },
        { src: "/rewards/h/ka.jpg", kana: "か", romaji: "ka", type: "hiragana" },
        { src: "/rewards/h/ki.jpg", kana: "き", romaji: "ki", type: "hiragana" },
        { src: "/rewards/h/ku.jpg", kana: "く", romaji: "ku", type: "hiragana" },
        { src: "/rewards/h/ke.jpg", kana: "け", romaji: "ke", type: "hiragana" },
        { src: "/rewards/h/ko.jpg", kana: "こ", romaji: "ko", type: "hiragana" },
        { src: "/rewards/h/sa.jpg", kana: "さ", romaji: "sa", type: "hiragana" },
        { src: "/rewards/h/shi.jpg", kana: "し", romaji: "shi", type: "hiragana" },
        { src: "/rewards/h/su.jpg", kana: "す", romaji: "su", type: "hiragana" },
        { src: "/rewards/h/se.jpg", kana: "せ", romaji: "se", type: "hiragana" },
        { src: "/rewards/h/so.jpg", kana: "そ", romaji: "so", type: "hiragana" },
        { src: "/rewards/h/ta.jpg", kana: "た", romaji: "ta", type: "hiragana" },
        { src: "/rewards/h/chi.jpg", kana: "ち", romaji: "chi", type: "hiragana" },
        { src: "/rewards/h/tsu.jpg", kana: "つ", romaji: "tsu", type: "hiragana" },
        { src: "/rewards/h/te.jpg", kana: "て", romaji: "te", type: "hiragana" },
        { src: "/rewards/h/to.jpg", kana: "と", romaji: "to", type: "hiragana" },
        { src: "/rewards/h/na.jpg", kana: "な", romaji: "na", type: "hiragana" },
        { src: "/rewards/h/ni.jpg", kana: "に", romaji: "ni", type: "hiragana" },
        { src: "/rewards/h/nu.jpg", kana: "ぬ", romaji: "nu", type: "hiragana" },
        { src: "/rewards/h/ne.jpg", kana: "ね", romaji: "ne", type: "hiragana" },
        { src: "/rewards/h/no.jpg", kana: "の", romaji: "no", type: "hiragana" },
        { src: "/rewards/h/ha.jpg", kana: "は", romaji: "ha", type: "hiragana" },
        { src: "/rewards/h/hi.jpg", kana: "ひ", romaji: "hi", type: "hiragana" },
        { src: "/rewards/h/fu.jpg", kana: "ふ", romaji: "fu", type: "hiragana" },
        { src: "/rewards/h/he.jpg", kana: "へ", romaji: "he", type: "hiragana" },
        { src: "/rewards/h/ho.jpg", kana: "ほ", romaji: "ho", type: "hiragana" },
        { src: "/rewards/h/ma.jpg", kana: "ま", romaji: "ma", type: "hiragana" },
        { src: "/rewards/h/mi.jpg", kana: "み", romaji: "mi", type: "hiragana" },
        { src: "/rewards/h/mu.jpg", kana: "む", romaji: "mu", type: "hiragana" },
        { src: "/rewards/h/me.jpg", kana: "め", romaji: "me", type: "hiragana" },
        { src: "/rewards/h/mo.jpg", kana: "も", romaji: "mo", type: "hiragana" },
        { src: "/rewards/h/ya.jpg", kana: "や", romaji: "ya", type: "hiragana" },
        { src: "/rewards/h/yu.jpg", kana: "ゆ", romaji: "yu", type: "hiragana" },
        { src: "/rewards/h/yo.jpg", kana: "よ", romaji: "yo", type: "hiragana" },
        { src: "/rewards/h/ra.jpg", kana: "ら", romaji: "ra", type: "hiragana" },
        { src: "/rewards/h/ri.jpg", kana: "り", romaji: "ri", type: "hiragana" },
        { src: "/rewards/h/ru.jpg", kana: "る", romaji: "ru", type: "hiragana" },
        { src: "/rewards/h/re.jpg", kana: "れ", romaji: "re", type: "hiragana" },
        { src: "/rewards/h/ro.jpg", kana: "ろ", romaji: "ro", type: "hiragana" },
        { src: "/rewards/h/wa.jpg", kana: "わ", romaji: "wa", type: "hiragana" },
        { src: "/rewards/h/wo.jpg", kana: "を", romaji: "wo", type: "hiragana" },
        { src: "/rewards/h/n.jpg", kana: "ん", romaji: "n", type: "hiragana" },
    ],
    "0-katakana-1": [
        { src: "/rewards/k/a.jpg", kana: "ア", romaji: "a", type: "katakana" },
        { src: "/rewards/k/i.jpg", kana: "イ", romaji: "i", type: "katakana" },
        { src: "/rewards/k/u.jpg", kana: "ウ", romaji: "u", type: "katakana" },
        { src: "/rewards/k/e.jpg", kana: "エ", romaji: "e", type: "katakana" },
        { src: "/rewards/k/o.jpg", kana: "オ", romaji: "o", type: "katakana" },
        { src: "/rewards/k/ka.jpg", kana: "カ", romaji: "ka", type: "katakana" },
        { src: "/rewards/k/ki.jpg", kana: "キ", romaji: "ki", type: "katakana" },
        { src: "/rewards/k/ku.jpg", kana: "ク", romaji: "ku", type: "katakana" },
        { src: "/rewards/k/ke.jpg", kana: "ケ", romaji: "ke", type: "katakana" },
        { src: "/rewards/k/ko.jpg", kana: "コ", romaji: "ko", type: "katakana" },
        { src: "/rewards/k/sa.jpg", kana: "サ", romaji: "sa", type: "katakana" },
        { src: "/rewards/k/shi.jpg", kana: "シ", romaji: "shi", type: "katakana" },
        { src: "/rewards/k/su.jpg", kana: "ス", romaji: "su", type: "katakana" },
        { src: "/rewards/k/se.jpg", kana: "セ", romaji: "se", type: "katakana" },
        { src: "/rewards/k/so.jpg", kana: "ソ", romaji: "so", type: "katakana" },
        { src: "/rewards/k/ta.jpg", kana: "タ", romaji: "ta", type: "katakana" },
        { src: "/rewards/k/chi.jpg", kana: "チ", romaji: "chi", type: "katakana" },
        { src: "/rewards/k/tsu.jpg", kana: "ツ", romaji: "tsu", type: "katakana" },
        { src: "/rewards/k/te.jpg", kana: "テ", romaji: "te", type: "katakana" },
        { src: "/rewards/k/to.jpg", kana: "ト", romaji: "to", type: "katakana" },
        { src: "/rewards/k/na.jpg", kana: "ナ", romaji: "na", type: "katakana" },
        { src: "/rewards/k/ni.jpg", kana: "ニ", romaji: "ni", type: "katakana" },
        { src: "/rewards/k/nu.jpg", kana: "ヌ", romaji: "nu", type: "katakana" },
        { src: "/rewards/k/ne.jpg", kana: "ネ", romaji: "ne", type: "katakana" },
        { src: "/rewards/k/no.jpg", kana: "ノ", romaji: "no", type: "katakana" },
        { src: "/rewards/k/ha.jpg", kana: "ハ", romaji: "ha", type: "katakana" },
        { src: "/rewards/k/hi.jpg", kana: "ヒ", romaji: "hi", type: "katakana" },
        { src: "/rewards/k/fu.jpg", kana: "フ", romaji: "fu", type: "katakana" },
        { src: "/rewards/k/he.jpg", kana: "ヘ", romaji: "he", type: "katakana" },
        { src: "/rewards/k/ho.jpg", kana: "ホ", romaji: "ho", type: "katakana" },
        { src: "/rewards/k/ma.jpg", kana: "マ", romaji: "ma", type: "katakana" },
        { src: "/rewards/k/mi.jpg", kana: "ミ", romaji: "mi", type: "katakana" },
        { src: "/rewards/k/mu.jpg", kana: "ム", romaji: "mu", type: "katakana" },
        { src: "/rewards/k/me.jpg", kana: "メ", romaji: "me", type: "katakana" },
        { src: "/rewards/k/mo.jpg", kana: "モ", romaji: "mo", type: "katakana" },
        { src: "/rewards/k/ya.jpg", kana: "ヤ", romaji: "ya", type: "katakana" },
        { src: "/rewards/k/yu.jpg", kana: "ユ", romaji: "yu", type: "katakana" },
        { src: "/rewards/k/yo.jpg", kana: "ヨ", romaji: "yo", type: "katakana" },
        { src: "/rewards/k/ra.jpg", kana: "ラ", romaji: "ra", type: "katakana" },
        { src: "/rewards/k/ri.jpg", kana: "リ", romaji: "ri", type: "katakana" },
        { src: "/rewards/k/ru.jpg", kana: "ル", romaji: "ru", type: "katakana" },
        { src: "/rewards/k/re.jpg", kana: "レ", romaji: "re", type: "katakana" },
        { src: "/rewards/k/ro.jpg", kana: "ロ", romaji: "ro", type: "katakana" },
        { src: "/rewards/k/wa.jpg", kana: "ワ", romaji: "wa", type: "katakana" },
        { src: "/rewards/k/wo.jpg", kana: "ヲ", romaji: "wo", type: "katakana" },
        { src: "/rewards/k/n.jpg", kana: "ン", romaji: "n", type: "katakana" },
    ],
};

// ── Read/write helpers ──────────────────────────────────────────────────────

export function getUnlockedRewards(): RewardImage[] {
    if (typeof window === "undefined") return [];
    try {
        return JSON.parse(localStorage.getItem(REWARD_KEY) ?? "[]") as RewardImage[];
    } catch {
        return [];
    }
}

/** Unlock ONE random reward from the global pool and return it (or null if all unlocked) */
export function unlockReward(sectionId: string): RewardImage | null {
    const pool = Object.values(REWARD_MAP).flat();
    if (pool.length === 0) return null;

    const current = getUnlockedRewards();
    const unlockedSrcs = new Set(current.map((r) => r.src));

    // Find ones not yet unlocked across the ENTIRE pool
    const available = pool.filter((p) => !unlockedSrcs.has(p.src));
    
    // If all rewards in the game have been unlocked already
    if (available.length === 0) {
        return null;
    }

    // Pick a completely random new reward
    const pick = available[Math.floor(Math.random() * available.length)]!;
    
    // Mark it as unlocked from this specific section
    const reward: RewardImage = { ...pick, sectionId, unlockedAt: Date.now() };
    
    localStorage.setItem(REWARD_KEY, JSON.stringify([...current, reward]));
    return reward;
}

export function getTotalRewards(): number {
    return Object.values(REWARD_MAP).reduce((s, arr) => s + arr.length, 0);
}
