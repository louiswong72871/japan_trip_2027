import type { DayId } from "./pages";

export type DayPhoto = {
  src: string;
  srcSet: string;
  alt: string;
  credit: string;
  license: string;
  href: string;
};

export const dayPhotos: Record<DayId, DayPhoto> = {
  arrive: {
    src: "/days/arrive-sendai-west.jpg",
    srcSet: "/days/arrive-sendai-west.webp",
    alt: "仙台站西口",
    credit: "Nryate",
    license: "CC BY-SA 4.0",
    href: "https://commons.wikimedia.org/wiki/File:Sendai_Station_West_Exit_2018.jpg",
  },
  ginzan: {
    src: "/days/ginzan-onsen.jpg",
    srcSet: "/days/ginzan-onsen.webp",
    alt: "銀山溫泉雪景",
    credit: "bryan...",
    license: "CC BY-SA 2.0",
    href: "https://commons.wikimedia.org/wiki/File:Ginzan_Onsen_(32165662644).jpg",
  },
  fox: {
    src: "/days/zao-fox-village.jpg",
    srcSet: "/days/zao-fox-village.webp",
    alt: "宮城藏王狐狸村的赤狐",
    credit: "Cp9asngf",
    license: "CC BY-SA 4.0",
    href: "https://commons.wikimedia.org/wiki/File:Red_fox_at_ZAO_kitsune_mura.jpg",
  },
  juhyo: {
    src: "/days/zao-juhyo.jpg",
    srcSet: "/days/zao-juhyo.webp",
    alt: "山形藏王樹冰",
    credit: "Suz-b",
    license: "CC BY-SA 3.0",
    href: "https://commons.wikimedia.org/wiki/File:Mt.Zao(Mt.Jizo)_Juhyo.JPG",
  },
  donto: {
    src: "/days/osaki-dontosai.jpg",
    srcSet: "/days/osaki-dontosai.webp",
    alt: "大崎八幡宮松焚祭",
    credit: "allegro Takahi",
    license: "CC BY 2.0",
    href: "https://commons.wikimedia.org/wiki/File:Dontosai_Festival_at_Osaki_Hachimangu_Shrine.jpg",
  },
  tokyo: {
    src: "/days/tokyo-hayabusa.jpg",
    srcSet: "/days/tokyo-hayabusa.webp",
    alt: "東京駅的はやぶさ新幹線",
    credit: "UT",
    license: "CC BY-SA 3.0",
    href: "https://commons.wikimedia.org/wiki/File:Hayabusa_shinkansen_@_Tokyo_Station_travel_to_Aomori_in_3_hours_-_panoramio.jpg",
  },
  harry: {
    src: "/days/toshimaen-station.jpg",
    srcSet: "/days/toshimaen-station.webp",
    alt: "都電・都營地下鐵豊島園駅（往哈利波特影城）",
    credit: "Kaze315",
    license: "CC BY-SA 4.0",
    href: "https://commons.wikimedia.org/wiki/File:Toei_Toshimaen-STA_Gate_outside.jpg",
  },
  tokyo17: {
    src: "/days/kawagoe-toki-no-kane.jpg",
    srcSet: "/days/kawagoe-toki-no-kane.webp",
    alt: "川越時の鐘與蔵造りの町並み",
    credit: "Zairon",
    license: "CC BY-SA 4.0",
    href: "https://commons.wikimedia.org/wiki/File:Kawagoe_Toki_no_Kane_1.jpg",
  },
  depart: {
    src: "/days/narita-terminal-2.jpg",
    srcSet: "/days/narita-terminal-2.webp",
    alt: "成田空港第2航廈",
    credit: "Banbam1029",
    license: "CC BY-SA 4.0",
    href: "https://commons.wikimedia.org/wiki/File:Narita_Airport_Terminal_2_exterior.jpg",
  },
};
