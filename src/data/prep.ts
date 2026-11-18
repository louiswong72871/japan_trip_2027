export const PREP_STORAGE_KEY = "sendai-2027-prep-checklist";

export type PrepItem = {
  id: string;
  label: string;
};

export type PrepGroup = {
  id: string;
  title: string;
  items: PrepItem[];
};

export const prepGroups: PrepGroup[] = [
  {
    id: "docs",
    title: "文件與支付",
    items: [
      { id: "passport", label: "護照" },
      { id: "tickets", label: "機票與酒店確認（存入手機）" },
      { id: "cash-card", label: "信用卡、日元現金" },
      { id: "ic-card", label: "交通 IC 或手機交通卡" },
      { id: "adapter", label: "日本 A 型插頭轉接器" },
      { id: "sim", label: "電話漫遊或日本 eSIM" },
    ],
  },
  {
    id: "clothes",
    title: "衣著",
    items: [
      { id: "base-layer", label: "高領發熱衣、發熱褲" },
      { id: "mid-layer", label: "毛衣或厚帽 T" },
      { id: "insulation", label: "輕羽絨或同等保暖層" },
      { id: "shell", label: "防風防水外套" },
      { id: "wind-pants", label: "防風內刷毛褲" },
      { id: "hat-gloves", label: "毛帽、防水手套、面罩或口罩" },
      { id: "sunglasses", label: "墨鏡" },
    ],
  },
  {
    id: "footwear",
    title: "鞋與防滑",
    items: [{ id: "boots", label: "防水防滑雪靴，或靴子加防滑雪爪" }],
  },
  {
    id: "carry",
    title: "攜帶用品",
    items: [
      { id: "power-bank", label: "移動電源、充電線" },
      { id: "warmers", label: "暖包" },
      { id: "meds", label: "常用藥" },
    ],
  },
];

export const prepItemIds = prepGroups.flatMap((group) =>
  group.items.map((item) => item.id),
);
