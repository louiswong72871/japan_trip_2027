export type DayId =
  | "arrive"
  | "ginzan"
  | "fox"
  | "juhyo"
  | "donto"
  | "tokyo"
  | "harry"
  | "tokyo17"
  | "depart";

export type DayPage = {
  id: DayId;
  label: string;
  heading: string;
  weekday: string;
};

export const days: DayPage[] = [
  { id: "arrive", label: "1/10 抵仙台", heading: "1月10日：抵仙台", weekday: "日" },
  { id: "ginzan", label: "1/11 銀山", heading: "1月11日：銀山溫泉（必留）", weekday: "一" },
  { id: "fox", label: "1/12 狐狸村", heading: "1月12日：宮城藏王狐狸村", weekday: "二" },
  { id: "juhyo", label: "1/13 樹冰", heading: "1月13日：山形藏王樹冰（日間自行）", weekday: "三" },
  { id: "donto", label: "1/14 吃蠔・松焚祭", heading: "1月14日：松島吃蠔、傍晚松焚祭", weekday: "四" },
  { id: "tokyo", label: "1/15 赴東京", heading: "1月15日：赴東京、下午 teamLab", weekday: "五" },
  { id: "harry", label: "1/16 哈利波特", heading: "1月16日：哈利波特影城、傍晚 SHIBUYA SKY", weekday: "六" },
  { id: "tokyo17", label: "1/17 川越", heading: "1月17日：川越", weekday: "日" },
  { id: "depart", label: "1/18 回港", heading: "1月18日：回港", weekday: "一" },
];

export const DEFAULT_DAY: DayId = "arrive";

export function isDayId(value: string): value is DayId {
  return days.some((day) => day.id === value);
}
