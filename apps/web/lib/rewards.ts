const REWARD_KEY = "jav_rewards";

export type RewardImage = {
    src: string;
    kana?: string;
    romaji?: string;
    title: string;
    rarity: "Common" | "Rare" | "Legendary";
    sectionId: string;
    unlockedAt: number;
};

const KANA_CHARS = ["a", "i", "u", "e", "o", "ka", "ki", "ku", "ke", "ko", "sa", "shi", "su", "se", "so", "ta", "chi", "tsu", "te", "to", "na", "ni", "nu", "ne", "no", "ha", "hi", "fu", "he", "ho", "ma", "mi", "mu", "me", "mo", "ya", "yu", "yo", "ra", "ri", "ru", "re", "ro", "wa", "wo", "n"];

export const REWARD_MAP: Record<string, Partial<RewardImage>[]> = {
    "special": [
        { src: "/photo/1_heart.jpg", title: "Heartfelt Welcome", rarity: "Common" },
        { src: "/photo/2_hi.jpg", title: "Sensei's Greeting", rarity: "Common" },
        { src: "/photo/3_happy.jpg", title: "Pure Joy", rarity: "Rare" },
        { src: "/photo/4_angry.jpg", title: "Divine Punishment", rarity: "Rare" },
        { src: "/photo/learn_japanese_with_us.jpg", title: "Study Buddy", rarity: "Common" },
        { src: "/photo/nihongo_donate.jpg", title: "Golden Supporter", rarity: "Legendary" },
    ],
    "0-hiragana-1": [
        { src: "/rewards/h/a.jpg", kana: "あ", romaji: "a", rarity: "Common" },
        { src: "/rewards/h/i.jpg", kana: "い", romaji: "i", rarity: "Common" },
        { src: "/rewards/h/u.jpg", kana: "う", romaji: "u", rarity: "Common" },
        { src: "/rewards/h/e.jpg", kana: "え", romaji: "e", rarity: "Common" },
        { src: "/rewards/h/o.jpg", kana: "お", romaji: "o", rarity: "Common" },
        { src: "/rewards/h/ka.jpg", kana: "か", romaji: "ka", rarity: "Common" },
        { src: "/rewards/h/ki.jpg", kana: "き", romaji: "ki", rarity: "Common" },
        { src: "/rewards/h/ku.jpg", kana: "く", romaji: "ku", rarity: "Common" },
        { src: "/rewards/h/ke.jpg", kana: "け", romaji: "ke", rarity: "Common" },
        { src: "/rewards/h/ko.jpg", kana: "こ", romaji: "ko", rarity: "Common" },
        { src: "/rewards/h/sa.jpg", kana: "さ", romaji: "sa", rarity: "Common" },
        { src: "/rewards/h/shi.jpg", kana: "し", romaji: "shi", rarity: "Common" },
        { src: "/rewards/h/su.jpg", kana: "す", romaji: "su", rarity: "Common" },
        { src: "/rewards/h/se.jpg", kana: "せ", romaji: "se", rarity: "Common" },
        { src: "/rewards/h/so.jpg", kana: "そ", romaji: "so", rarity: "Common" },
        { src: "/rewards/h/ta.jpg", kana: "た", romaji: "ta", rarity: "Common" },
        { src: "/rewards/h/chi.jpg", kana: "ち", romaji: "chi", rarity: "Common" },
        { src: "/rewards/h/tsu.jpg", kana: "つ", romaji: "tsu", rarity: "Common" },
        { src: "/rewards/h/te.jpg", kana: "て", romaji: "te", rarity: "Common" },
        { src: "/rewards/h/to.jpg", kana: "と", romaji: "to", rarity: "Common" },
        { src: "/rewards/h/na.jpg", kana: "な", romaji: "na", rarity: "Common" },
        { src: "/rewards/h/ni.jpg", kana: "に", romaji: "ni", rarity: "Common" },
        { src: "/rewards/h/nu.jpg", kana: "ぬ", romaji: "nu", rarity: "Common" },
        { src: "/rewards/h/ne.jpg", kana: "ね", romaji: "ne", rarity: "Common" },
        { src: "/rewards/h/no.jpg", kana: "の", romaji: "no", rarity: "Common" },
        { src: "/rewards/h/ha.jpg", kana: "は", romaji: "ha", rarity: "Common" },
        { src: "/rewards/h/hi.jpg", kana: "ひ", romaji: "hi", rarity: "Common" },
        { src: "/rewards/h/fu.jpg", kana: "ふ", romaji: "fu", rarity: "Common" },
        { src: "/rewards/h/he.jpg", kana: "へ", romaji: "he", rarity: "Common" },
        { src: "/rewards/h/ho.jpg", kana: "ほ", romaji: "ho", rarity: "Common" },
        { src: "/rewards/h/ma.jpg", kana: "ま", romaji: "ma", rarity: "Common" },
        { src: "/rewards/h/mi.jpg", kana: "み", romaji: "mi", rarity: "Common" },
        { src: "/rewards/h/mu.jpg", kana: "む", romaji: "mu", rarity: "Common" },
        { src: "/rewards/h/me.jpg", kana: "め", romaji: "me", rarity: "Common" },
        { src: "/rewards/h/mo.jpg", kana: "も", romaji: "mo", rarity: "Common" },
        { src: "/rewards/h/ya.jpg", kana: "や", romaji: "ya", rarity: "Common" },
        { src: "/rewards/h/yu.jpg", kana: "ゆ", romaji: "yu", rarity: "Common" },
        { src: "/rewards/h/yo.jpg", kana: "よ", romaji: "yo", rarity: "Common" },
        { src: "/rewards/h/ra.jpg", kana: "ら", romaji: "ra", rarity: "Common" },
        { src: "/rewards/h/ri.jpg", kana: "り", romaji: "ri", rarity: "Common" },
        { src: "/rewards/h/ru.jpg", kana: "る", romaji: "ru", rarity: "Common" },
        { src: "/rewards/h/re.jpg", kana: "れ", romaji: "re", rarity: "Common" },
        { src: "/rewards/h/ro.jpg", kana: "ろ", romaji: "ro", rarity: "Common" },
        { src: "/rewards/h/wa.jpg", kana: "わ", romaji: "wa", rarity: "Common" },
        { src: "/rewards/h/wo.jpg", kana: "を", romaji: "wo", rarity: "Common" },
        { src: "/rewards/h/n.jpg", kana: "ん", romaji: "n", rarity: "Common" },
    ],
    "0-katakana-1": [
        { src: "/rewards/k/a.jpg", kana: "ア", romaji: "a", rarity: "Common" },
        { src: "/rewards/k/i.jpg", kana: "イ", romaji: "i", rarity: "Common" },
        { src: "/rewards/k/u.jpg", kana: "ウ", romaji: "u", rarity: "Common" },
        { src: "/rewards/k/e.jpg", kana: "エ", romaji: "e", rarity: "Common" },
        { src: "/rewards/k/o.jpg", kana: "オ", romaji: "o", rarity: "Common" },
        { src: "/rewards/k/ka.jpg", kana: "カ", romaji: "ka", rarity: "Common" },
        { src: "/rewards/k/ki.jpg", kana: "キ", romaji: "ki", rarity: "Common" },
        { src: "/rewards/k/ku.jpg", kana: "ク", romaji: "ku", rarity: "Common" },
        { src: "/rewards/k/ke.jpg", kana: "ケ", romaji: "ke", rarity: "Common" },
        { src: "/rewards/k/ko.jpg", kana: "コ", romaji: "ko", rarity: "Common" },
        { src: "/rewards/k/sa.jpg", kana: "サ", romaji: "sa", rarity: "Common" },
        { src: "/rewards/k/shi.jpg", kana: "シ", romaji: "shi", rarity: "Common" },
        { src: "/rewards/k/su.jpg", kana: "ス", romaji: "su", rarity: "Common" },
        { src: "/rewards/k/se.jpg", kana: "セ", romaji: "se", rarity: "Common" },
        { src: "/rewards/k/so.jpg", kana: "ソ", romaji: "so", rarity: "Common" },
        { src: "/rewards/k/ta.jpg", kana: "タ", romaji: "ta", rarity: "Common" },
        { src: "/rewards/k/chi.jpg", kana: "チ", romaji: "chi", rarity: "Common" },
        { src: "/rewards/k/tsu.jpg", kana: "ツ", romaji: "tsu", rarity: "Common" },
        { src: "/rewards/k/te.jpg", kana: "テ", romaji: "te", rarity: "Common" },
        { src: "/rewards/k/to.jpg", kana: "ト", romaji: "to", rarity: "Common" },
        { src: "/rewards/k/na.jpg", kana: "ナ", romaji: "na", rarity: "Common" },
        { src: "/rewards/k/ni.jpg", kana: "ニ", romaji: "ni", rarity: "Common" },
        { src: "/rewards/k/nu.jpg", kana: "ヌ", romaji: "nu", rarity: "Common" },
        { src: "/rewards/k/ne.jpg", kana: "ネ", romaji: "ne", rarity: "Common" },
        { src: "/rewards/k/no.jpg", kana: "ノ", romaji: "no", rarity: "Common" },
        { src: "/rewards/k/ha.jpg", kana: "ハ", romaji: "ha", rarity: "Common" },
        { src: "/rewards/k/hi.jpg", kana: "ヒ", romaji: "hi", rarity: "Common" },
        { src: "/rewards/k/fu.jpg", kana: "フ", romaji: "fu", rarity: "Common" },
        { src: "/rewards/k/he.jpg", kana: "ヘ", romaji: "he", rarity: "Common" },
        { src: "/rewards/k/ho.jpg", kana: "ホ", romaji: "ho", rarity: "Common" },
        { src: "/rewards/k/ma.jpg", kana: "マ", romaji: "ma", rarity: "Common" },
        { src: "/rewards/k/mi.jpg", kana: "ミ", romaji: "mi", rarity: "Common" },
        { src: "/rewards/k/mu.jpg", kana: "ム", romaji: "mu", rarity: "Common" },
        { src: "/rewards/k/me.jpg", kana: "メ", romaji: "me", rarity: "Common" },
        { src: "/rewards/k/mo.jpg", kana: "モ", romaji: "mo", rarity: "Common" },
        { src: "/rewards/k/ya.jpg", kana: "ヤ", romaji: "ya", rarity: "Common" },
        { src: "/rewards/k/yu.jpg", kana: "ユ", romaji: "yu", rarity: "Common" },
        { src: "/rewards/k/yo.jpg", kana: "ヨ", romaji: "yo", rarity: "Common" },
        { src: "/rewards/k/ra.jpg", kana: "ラ", romaji: "ra", rarity: "Common" },
        { src: "/rewards/k/ri.jpg", kana: "リ", romaji: "ri", rarity: "Common" },
        { src: "/rewards/k/ru.jpg", kana: "ル", romaji: "ru", rarity: "Common" },
        { src: "/rewards/k/re.jpg", kana: "レ", romaji: "re", rarity: "Common" },
        { src: "/rewards/k/ro.jpg", kana: "ロ", romaji: "ro", rarity: "Common" },
        { src: "/rewards/k/wa.jpg", kana: "ワ", romaji: "wa", rarity: "Common" },
        { src: "/rewards/k/wo.jpg", kana: "ヲ", romaji: "wo", rarity: "Common" },
        { src: "/rewards/k/n.jpg", kana: "ン", romaji: "n", rarity: "Common" },
    ],
};

export function getUnlockedRewards(): RewardImage[] {
    if (typeof window === "undefined") return [];
    try {
        return JSON.parse(localStorage.getItem(REWARD_KEY) ?? "[]") as RewardImage[];
    } catch {
        return [];
    }
}

export function unlockReward(sectionId: string): RewardImage | null {
    const current = getUnlockedRewards();
    const unlockedSrcs = new Set(current.map((r) => r.src));

    const sectionPool = REWARD_MAP[sectionId] || [];
    const sectionAvailable = sectionPool.filter(p => p.src && !unlockedSrcs.has(p.src));
    
    const specialPool = REWARD_MAP["special"] || [];
    const specialAvailable = specialPool.filter(p => p.src && !unlockedSrcs.has(p.src));

    // Choose pool: 70% Section, 30% Special (if available)
    let poolToUse: Partial<RewardImage>[] = [];
    const roll = Math.random();

    if (sectionAvailable.length > 0 && (roll < 0.7 || specialAvailable.length === 0)) {
        poolToUse = sectionAvailable;
    } else {
        poolToUse = specialAvailable;
    }

    // Fallback if selection resulted in empty pool
    if (poolToUse.length === 0) {
        poolToUse = sectionAvailable.length > 0 ? sectionAvailable : specialAvailable;
    }

    if (poolToUse.length === 0) return null;

    // Rarity Weights
    const weights: Record<string, number> = { 
        "Common": 100, 
        "Rare": 15, 
        "Legendary": 3 
    };

    let totalWeight = 0;
    poolToUse.forEach(item => {
        totalWeight += weights[item.rarity || "Common"] || 100;
    });

    let random = Math.random() * totalWeight;
    let pick = poolToUse[poolToUse.length - 1];

    for (const item of poolToUse) {
        const weight = weights[item.rarity || "Common"] || 100;
        if (random < weight) {
            pick = item;
            break;
        }
        random -= weight;
    }

    if (!pick || !pick.src || !pick.rarity) return null;
    
    const reward: RewardImage = { 
        src: pick.src, 
        title: pick.title || (pick.kana ? `${pick.kana} (${pick.romaji})` : "Character Card"), 
        rarity: pick.rarity, 
        romaji: pick.romaji,
        kana: pick.kana,
        sectionId, 
        unlockedAt: Date.now() 
    };
    
    localStorage.setItem(REWARD_KEY, JSON.stringify([...current, reward]));
    return reward;
}

export function getTotalRewards(): number {
    return Object.values(REWARD_MAP).reduce((s, arr) => s + arr.length, 0);
}
