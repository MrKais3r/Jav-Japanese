// KEY for everything
const APP_KEY = "japanese_learning_app";

type AppData = {
  user: {
    name: string;
    ageVerified: boolean;
    createdAt: string;
  };
  progress: Record<string, any>;
};

export function getAppData(): AppData {
  if (typeof window === "undefined") return {} as AppData;

  const raw = localStorage.getItem(APP_KEY);
  let data: AppData;

  if (raw) {
    try {
      data = JSON.parse(raw);
    } catch (e) {
      // corrupted data fallback
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
    };
  }

  if (!data.progress) {
    data.progress = {};
  }

  return data;
}

export function saveSectionResult(
  lessonId: number,
  sectionId: number,
  percentage: number
) {
  const data = getAppData();

  const lessonKey = `lesson_${lessonId}`;

  if (!data.progress[lessonKey]) {
    data.progress[lessonKey] = {
      sectionsCompleted: [],
      sectionResults: {},
    };
  }

  const lesson = data.progress[lessonKey];

  // mark completed if not exists
  if (!lesson.sectionsCompleted.includes(sectionId)) {
    lesson.sectionsCompleted.push(sectionId);
  }

  // save percentage
  lesson.sectionResults = {
    ...lesson.sectionResults,
    [sectionId]: percentage,
  };

  saveAppData(data);
}

export function getSectionResult(lessonId: number, sectionId: number): number {
  const data = getAppData();
  return data.progress[`lesson_${lessonId}`]?.sectionResults?.[sectionId] ?? 0;
}

export function saveAppData(data: AppData) {
  localStorage.setItem(APP_KEY, JSON.stringify(data));
}

// Update only user object
export function updateUser(partial: Partial<AppData["user"]>) {
  const data = getAppData();
  data.user = { ...data.user, ...partial };
  saveAppData(data);
}

// Update lesson progress
export function markSectionComplete(lessonId: number, sectionId: number) {
  const data = getAppData();

  if (!data.progress[`lesson_${lessonId}`]) {
    data.progress[`lesson_${lessonId}`] = { sectionsCompleted: [] };
  }

  const lesson = data.progress[`lesson_${lessonId}`];

  if (!lesson.sectionsCompleted.includes(sectionId)) {
    lesson.sectionsCompleted.push(sectionId);
  }

  saveAppData(data);
}

export function isSectionDone(lessonId: number, sectionId: number): number {
  const data = getAppData();

  const lesson = data.progress?.[`lesson_${lessonId}`];
  if (!lesson) return 0;

  const percentage = lesson.sectionResults?.[sectionId] ?? 0;
  return Math.round(percentage);
}
