// KEY for everything
const APP_KEY = "japanese_learning_app";

export type LessonProgress = {
    sectionsCompleted: (number | string)[];
    sectionResults?: Record<string | number, number>;
};

export type AppData = {
    user: {
        name: string;
        ageVerified: boolean;
        createdAt: string;
        xp: number;
        rank: string;
        streak: {
            count: number;
            lastDate: string | null;
        };
        inventory: string[]; // for gacha card IDs
    };
    progress: Record<string, LessonProgress>;
};

export const RANKS = [
    { name: "Curious Kouhai", minXP: 0, color: "text-zinc-400" },
    { name: "Devoted Disciple", minXP: 500, color: "text-blue-400" },
    { name: "Language Lover", minXP: 1500, color: "text-purple-400" },
    { name: "Sensei's Favorite", minXP: 3000, color: "text-pink-400" },
    { name: "Ara Ara Master", minXP: 6000, color: "text-rose-400 font-bold" },
    { name: "Nihongo Degenerate", minXP: 10000, color: "text-rose-500 font-black animate-pulse" },
    { name: "Sensei's Only One", minXP: 20000, color: "text-pink-500 font-black drop-shadow-[0_0_10px_rgba(236,72,153,0.5)]" },
];

export function getRank(xp: number) {
    return [...RANKS].reverse().find(r => xp >= r.minXP) || RANKS[0]!;
}

export function getAppData(): AppData {
    if (typeof window === "undefined") return {} as AppData;

    const raw = localStorage.getItem(APP_KEY);
    let data: AppData;

    if (raw) {
        try {
            data = JSON.parse(raw);
        } catch {
            data = {} as AppData;
        }
    } else {
        data = {} as AppData;
    }

    // ensure full structure always exists
    if (!data.user) {
        data.user = {
            name: "",
            ageVerified: false,
            createdAt: new Date().toISOString(),
            xp: 0,
            rank: RANKS[0]!.name,
            streak: { count: 0, lastDate: null },
            inventory: [],
        };
    }

    // Migration/Fix for missing fields
    if (data.user.xp === undefined) data.user.xp = 0;
    if (!data.user.rank) data.user.rank = RANKS[0]!.name;
    if (!data.user.streak) data.user.streak = { count: 0, lastDate: null };
    if (!data.user.inventory) data.user.inventory = [];

    if (!data.progress) {
        data.progress = {};
    }

    return data;
}

export function addXP(amount: number) {
    const data = getAppData();
    data.user.xp += amount;
    data.user.rank = getRank(data.user.xp).name;
    saveAppData(data);
    return data.user.xp;
}

export function checkStreak() {
    const data = getAppData();
    const now = new Date();
    const today = now.toISOString().split("T")[0]!;
    
    if (!data.user.streak.lastDate) {
        data.user.streak = { count: 0, lastDate: today };
    } else {
        const last = new Date(data.user.streak.lastDate);
        const diff = Math.floor((now.getTime() - last.getTime()) / (1000 * 60 * 60 * 24));
        
        if (diff === 1) {
            data.user.streak.count += 1;
            data.user.streak.lastDate = today;
        } else if (diff > 1) {
            data.user.streak.count = 1;
            data.user.streak.lastDate = today;
        }
        // if diff === 0, already checked today
    }
    saveAppData(data);
    return data.user.streak;
}

export function saveSectionResult(lessonId: number, sectionId: number, percentage: number) {
    const data = getAppData();
    const lessonKey = `lesson_${lessonId}`;

    if (!data.progress) {
        data.progress = {};
    }

    if (!data.progress[lessonKey]) {
        data.progress[lessonKey] = {
            sectionsCompleted: [],
            sectionResults: {},
        };
    }

    const lesson = data.progress[lessonKey]!;

    // mark completed if not exists
    if (!lesson.sectionsCompleted.includes(sectionId)) {
        lesson.sectionsCompleted.push(sectionId);
        // XP Reward for first completion
        data.user.xp += 100;
    }

    // Extra XP based on performance
    if (percentage >= 100) {
        data.user.xp += 50;
    } else if (percentage > 90) {
        data.user.xp += 25;
    }

    // Update rank
    data.user.rank = getRank(data.user.xp).name;

    // save percentage
    if (!lesson.sectionResults) lesson.sectionResults = {};
    const currentScore = lesson.sectionResults[sectionId] || 0;
    lesson.sectionResults[sectionId] = Math.max(percentage, currentScore);

    saveAppData(data);
}

export function getSectionResult(lessonId: number, sectionId: number): number {
    const data = getAppData();
    return data.progress?.[`lesson_${lessonId}`]?.sectionResults?.[sectionId] ?? 0;
}

export function getName(): string {
    const data = getAppData();
    return data.user?.name || "Guest";
}

export function saveAppData(data: AppData) {
    if (typeof window !== "undefined") {
        localStorage.setItem(APP_KEY, JSON.stringify(data));
    }
}

export function updateUser(partial: Partial<AppData["user"]>) {
    const data = getAppData();
    if (data.user) {
        data.user = { ...data.user, ...partial };
        saveAppData(data);
    }
}

export function markSectionComplete(lessonId: number, sectionId: number) {
    const data = getAppData();
    const lessonKey = `lesson_${lessonId}`;

    if (!data.progress) data.progress = {};
    
    if (!data.progress[lessonKey]) {
        data.progress[lessonKey] = { sectionsCompleted: [] };
    }
    const lesson = data.progress[lessonKey];
    if (!lesson.sectionsCompleted.includes(sectionId)) {
        lesson.sectionsCompleted.push(sectionId);
    }
    saveAppData(data);
}

export function addInventoryItem(itemId: string) {
    const data = getAppData();
    if (!data.user.inventory) data.user.inventory = [];
    if (!data.user.inventory.includes(itemId)) {
        data.user.inventory.push(itemId);
        saveAppData(data);
        return true;
    }
    return false;
}

export function isSectionDone(lessonId: number, sectionId: number): number {
    const data = getAppData();
    const lesson = data.progress?.[`lesson_${lessonId}`];
    if (!lesson) return 0;
    const percentage = lesson.sectionResults?.[sectionId] ?? 0;
    return Math.round(percentage);
}
