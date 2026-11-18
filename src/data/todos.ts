export type TodoItem = {
  id: string;
  text: string;
  done: boolean;
};

export const TODO_STORAGE_KEY = "sendai-2027-todos";

export const initialTodos: TodoItem[] = [
  { id: "hotel", text: "仙台酒店 1/10-15 已核實", done: true },
  { id: "flights", text: "去程與回程航班已核實", done: true },
  { id: "kkday", text: "下訂 1/11 KKday 183402", done: false },
  { id: "bus11", text: "出發前再對 1/11 高速巴士時刻", done: false },
  { id: "fox", text: "狐狸村定於 1/12，交通尚未安排", done: false },
  { id: "juhyo", text: "樹冰定於 1/13 日間自行，交通尚未安排", done: false },
  { id: "oyster", text: "1/14 上午松島吃蠔：出發前致電確認こうは當日有開", done: false },
  { id: "donto", text: "1/14 松焚祭時刻與臨時交通再對", done: false },
  {
    id: "tokyo",
    text: "東京住宿已記入（大山駅南口 Airbnb）；電郵尚未找到訂房確認，出發前再對入住時段",
    done: false,
  },
  {
    id: "shinkansen",
    text: "2026-12-15 10:00（日本時間）買 1/15 はやぶさ指定席 e票",
    done: false,
  },
  { id: "harry", text: "下訂 1/16 或 1/17 上午官方 Standard 哈利波特票", done: false },
  {
    id: "teamlab",
    text: "預購 1/15 下午 teamLab Planets 官網日時票（改期則改 1/17）",
    done: false,
  },
  {
    id: "sky",
    text: "2027-01-02 00:00（日本時間）預購 1/16 傍晚 SHIBUYA SKY 日時指定券",
    done: false,
  },
  {
    id: "sumo",
    text: "若改 1/17 看初場所：先參加チケット大相撲先行抽選；一般発売 2026-12-05 10:00（日本時間）。日曆可選不等於有位",
    done: false,
  },
  {
    id: "ghibli",
    text: "若已決定 1/17 去ジブリ：2026-12-10 10:00（日本時間）買 1 月入場（易瞬間售罄；無票不要當主線）",
    done: false,
  },
  {
    id: "return",
    text: "1/18 約 15:50–16:00 由大山住宿出發，趕日暮里 16:45 Skyliner（現行平日表，出發前再對）",
    done: false,
  },
];

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
        const item = entry as TodoItem;
        if (
          typeof item.id === "string" &&
          typeof item.text === "string" &&
          typeof item.done === "boolean"
        ) {
          items.push({ id: item.id, text: item.text, done: item.done });
        }
      }
    }
    return items.length > 0 ? items : initialTodos;
  } catch {
    return initialTodos;
  }
}
