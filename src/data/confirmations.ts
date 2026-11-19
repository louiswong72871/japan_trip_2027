import type { DayId } from "./pages";

export type PendingKind = "unordered" | "unconfirmed" | "unarranged";
export type ConfirmStatus = "pending" | "confirmed";

export type ConfirmationItem = {
  id: string;
  label: string;
  pendingKind: PendingKind;
  defaultStatus: ConfirmStatus;
  canvasNote?: string;
  appearsIn: DayId[];
  optional?: boolean;
  /** Used by GapStatusList if that list is rendered */
  inGaps?: boolean;
};

export const CONFIRM_STORAGE_KEY = "sendai-2027-confirmations";

export const confirmationItems: ConfirmationItem[] = [
  {
    id: "flights",
    label: "去程與回程航班",
    pendingKind: "unconfirmed",
    defaultStatus: "confirmed",
    canvasNote: "香港快運 UO890／UO693 已核實",
    appearsIn: ["arrive", "depart"],
  },
  {
    id: "sendai-hotel",
    label: "仙台酒店 1/10–15",
    pendingKind: "unconfirmed",
    defaultStatus: "confirmed",
    canvasNote: "リッチモンドホテルプレミア仙台駅前，已核實",
    appearsIn: ["arrive"],
  },
  {
    id: "kkday-183402",
    label: "KKday 183402 銀山溫泉夜景半日遊",
    pendingKind: "unordered",
    defaultStatus: "pending",
    appearsIn: ["ginzan"],
    inGaps: true,
  },
  {
    id: "bus-1-11",
    label: "1/11 高速巴士時刻",
    pendingKind: "unconfirmed",
    defaultStatus: "pending",
    canvasNote: "現行表，出發前再對 2027年1月",
    appearsIn: ["ginzan"],
    inGaps: true,
  },
  {
    id: "fox-transport",
    label: "1/12 狐狸村交通",
    pendingKind: "unarranged",
    defaultStatus: "pending",
    appearsIn: ["fox"],
    inGaps: true,
  },
  {
    id: "juhyo-transport",
    label: "1/13 樹冰交通",
    pendingKind: "unarranged",
    defaultStatus: "pending",
    canvasNote: "現行平日表，出發前再對 2027年1月；仙台東口冬季直達巴士 2026-27 季尚未公布，不能當可訂",
    appearsIn: ["juhyo"],
    inGaps: true,
  },
  {
    id: "koha-open",
    label: "1/14 こうは當日有開",
    pendingKind: "unconfirmed",
    defaultStatus: "pending",
    canvasNote: "出發前致電確認（022-353-3588 二號店）",
    appearsIn: ["donto"],
    inGaps: true,
  },
  {
    id: "donto-traffic",
    label: "1/14 松焚祭時刻與臨時交通",
    pendingKind: "unconfirmed",
    defaultStatus: "pending",
    canvasNote: "常態／2026 年模式，非 2027 年已公布時刻",
    appearsIn: ["donto"],
    inGaps: true,
  },
  {
    id: "tokyo-airbnb",
    label: "東京住宿（大山駅南口 Airbnb）",
    pendingKind: "unconfirmed",
    defaultStatus: "pending",
    canvasNote: "已記入；電郵尚未找到訂房確認，出發前再對入住時段。頁面未顯示入住與退房時刻。",
    appearsIn: ["tokyo", "harry", "depart"],
    inGaps: true,
  },
  {
    id: "hayabusa",
    label: "1/15 はやぶさ指定席 e票",
    pendingKind: "unordered",
    defaultStatus: "pending",
    canvasNote: "座位預計 2026-12-15 10:00（日本時間）開賣，現在還買不到",
    appearsIn: ["tokyo"],
    inGaps: true,
  },
  {
    id: "teamlab",
    label: "teamLab Planets 官網日時票",
    pendingKind: "unordered",
    defaultStatus: "pending",
    canvasNote: "預購 1/15 下午（改期則改 1/17）。須官網日時指定，現場窗口不賣。",
    appearsIn: ["tokyo", "tokyo17"],
    inGaps: true,
  },
  {
    id: "harry",
    label: "哈利波特影城官方 Standard 票",
    pendingKind: "unordered",
    defaultStatus: "pending",
    canvasNote: "1/16 或 1/17 上午。已開放至 2027-03-31 入場；日曆可選不等於有位。",
    appearsIn: ["harry"],
    inGaps: true,
  },
  {
    id: "sky",
    label: "SHIBUYA SKY 日時指定券",
    pendingKind: "unordered",
    defaultStatus: "pending",
    canvasNote: "1/16 傍晚；2027-01-02 00:00（日本時間）開賣，前一日可免費取消",
    appearsIn: ["harry", "tokyo17"],
    inGaps: true,
  },
  {
    id: "sumo",
    label: "1/17 初場所（備選）",
    pendingKind: "unordered",
    defaultStatus: "pending",
    canvasNote: "只在已有票時改走備選。一般発売 2026-12-05 10:00（日本時間）。日曆可選不等於有位。",
    appearsIn: ["tokyo17"],
    optional: true,
    inGaps: true,
  },
  {
    id: "ghibli",
    label: "1/17 ジブリ美術館（備選）",
    pendingKind: "unordered",
    defaultStatus: "pending",
    canvasNote: "只在已有日時指定票時改走。2026-12-10 10:00（日本時間）開賣；無票不要當主線。",
    appearsIn: ["tokyo17"],
    optional: true,
    inGaps: true,
  },
  {
    id: "return-skyliner",
    label: "1/18 Skyliner 時刻與取位",
    pendingKind: "unconfirmed",
    defaultStatus: "pending",
    canvasNote: "現行平日表，出發前再對。全車指定席，要先取位。",
    appearsIn: ["depart"],
    inGaps: true,
  },
];

export const confirmationById = Object.fromEntries(
  confirmationItems.map((item) => [item.id, item]),
) as Record<string, ConfirmationItem>;

export function pendingBadge(kind: PendingKind): string {
  if (kind === "unordered") {
    return "尚未下訂";
  }
  if (kind === "unarranged") {
    return "尚未安排";
  }
  return "待確認";
}

export type StoredConfirmation = {
  status: ConfirmStatus;
  note: string;
};

export function readConfirmations(): Record<string, StoredConfirmation> {
  if (typeof window === "undefined") {
    return {};
  }
  try {
    const raw = window.localStorage.getItem(CONFIRM_STORAGE_KEY);
    if (!raw) {
      return {};
    }
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") {
      return {};
    }
    const result: Record<string, StoredConfirmation> = {};
    for (const [id, value] of Object.entries(parsed as Record<string, unknown>)) {
      if (!confirmationById[id] || !value || typeof value !== "object") {
        continue;
      }
      const entry = value as { status?: unknown; note?: unknown };
      if (entry.status !== "pending" && entry.status !== "confirmed") {
        continue;
      }
      result[id] = {
        status: entry.status,
        note: typeof entry.note === "string" ? entry.note : "",
      };
    }
    return result;
  } catch {
    return {};
  }
}
