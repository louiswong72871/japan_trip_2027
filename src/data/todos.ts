import type { DayId } from "./pages";

export type TodoItem = {
  id: string;
  text: string;
  done: boolean;
  days: DayId[];
};

export const TODO_STORAGE_KEY = "sendai-2027-todos";

export const TODO_DAYS_BY_ID: Record<string, DayId[]> = {
  hotel: ["arrive"],
  flights: ["arrive", "depart"],
  kkday: ["ginzan"],
  bus11: ["ginzan"],
  fox: ["fox"],
  juhyo: ["juhyo"],
  oyster: ["donto"],
  donto: ["donto"],
  tokyo: ["tokyo", "depart"],
  shinkansen: ["tokyo"],
  harry: ["harry"],
  teamlab: ["tokyo"],
  sky: ["harry"],
  sumo: ["tokyo17"],
  ghibli: ["tokyo17"],
  return: ["depart"],
};

export const initialTodos: TodoItem[] = [
  { id: "hotel", text: "仙台酒店 1/10-15 已核實", done: true, days: TODO_DAYS_BY_ID.hotel },
  { id: "flights", text: "去程與回程航班已核實", done: true, days: TODO_DAYS_BY_ID.flights },
  { id: "kkday", text: "下訂 1/11 KKday 183402", done: false, days: TODO_DAYS_BY_ID.kkday },
  { id: "bus11", text: "出發前再對 1/11 高速巴士時刻", done: false, days: TODO_DAYS_BY_ID.bus11 },
  { id: "fox", text: "狐狸村定於 1/12，交通尚未安排", done: false, days: TODO_DAYS_BY_ID.fox },
  { id: "juhyo", text: "樹冰定於 1/13 日間自行，交通尚未安排", done: false, days: TODO_DAYS_BY_ID.juhyo },
  { id: "oyster", text: "1/14 上午松島吃蠔：出發前致電確認こうは當日有開", done: false, days: TODO_DAYS_BY_ID.oyster },
  { id: "donto", text: "1/14 松焚祭時刻與臨時交通再對", done: false, days: TODO_DAYS_BY_ID.donto },
  {
    id: "tokyo",
    text: "東京住宿已記入（大山駅南口 Airbnb）；電郵尚未找到訂房確認，出發前再對入住時段",
    done: false,
    days: TODO_DAYS_BY_ID.tokyo,
  },
  {
    id: "shinkansen",
    text: "2026-12-15 10:00（日本時間）買 1/15 はやぶさ指定席 e票",
    done: false,
    days: TODO_DAYS_BY_ID.shinkansen,
  },
  { id: "harry", text: "下訂 1/16 或 1/17 上午官方 Standard 哈利波特票", done: false, days: TODO_DAYS_BY_ID.harry },
  {
    id: "teamlab",
    text: "預購 1/15 下午 teamLab Planets 官網日時票（改期則改 1/17）",
    done: false,
    days: TODO_DAYS_BY_ID.teamlab,
  },
  {
    id: "sky",
    text: "2027-01-02 00:00（日本時間）預購 1/16 傍晚 SHIBUYA SKY 日時指定券",
    done: false,
    days: TODO_DAYS_BY_ID.sky,
  },
  {
    id: "sumo",
    text: "若改 1/17 看初場所：先參加チケット大相撲先行抽選；一般発売 2026-12-05 10:00（日本時間）。日曆可選不等於有位",
    done: false,
    days: TODO_DAYS_BY_ID.sumo,
  },
  {
    id: "ghibli",
    text: "若已決定 1/17 去ジブリ：2026-12-10 10:00（日本時間）買 1 月入場（易瞬間售罄；無票不要當主線）",
    done: false,
    days: TODO_DAYS_BY_ID.ghibli,
  },
  {
    id: "return",
    text: "1/18 約 15:50–16:00 由大山住宿出發，趕日暮里 16:45 Skyliner（現行平日表，出發前再對）",
    done: false,
    days: TODO_DAYS_BY_ID["return"],
  },
];

function isDayIdList(value: unknown): value is DayId[] {
  return (
    Array.isArray(value) &&
    value.length > 0 &&
    value.every(
      (entry) =>
        typeof entry === "string" &&
        [
          "arrive",
          "ginzan",
          "fox",
          "juhyo",
          "donto",
          "tokyo",
          "harry",
          "tokyo17",
          "depart",
        ].includes(entry),
    )
  );
}

function withDays(item: TodoItem): TodoItem {
  if (item.days.length > 0) {
    return item;
  }
  return { ...item, days: TODO_DAYS_BY_ID[item.id] ?? [] };
}

export function readTodos(): TodoItem[] {
  if (typeof window === "undefined") {
    return initialTodos;
  }
  try {
    const raw = window.localStorage.getItem(TODO_STORAGE_KEY);
    if (!raw) {
      return initialTodos;
    }
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return initialTodos;
    }
    const items: TodoItem[] = [];
    for (const entry of parsed) {
      if (
        entry &&
        typeof entry === "object" &&
        "id" in entry &&
        "text" in entry &&
        "done" in entry
      ) {
        const item = entry as { id: unknown; text: unknown; done: unknown; days?: unknown };
        if (
          typeof item.id === "string" &&
          typeof item.text === "string" &&
          typeof item.done === "boolean"
        ) {
          items.push(
            withDays({
              id: item.id,
              text: item.text,
              done: item.done,
              days: isDayIdList(item.days) ? item.days : TODO_DAYS_BY_ID[item.id] ?? [],
            }),
          );
        }
      }
    }
    return items.length > 0 ? items : initialTodos;
  } catch {
    return initialTodos;
  }
}
