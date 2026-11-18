# Design System Master File

**Project:** 2027仙台冬旅計劃
**Updated:** 2026-11-18
**Theme:** Editorial White / Black / Yellow（參考大塚 CalorieMate 官網的編輯風節奏，不是品牌複製）
**Structure:** Minimalism & Swiss — 高對比、可見邊框、清晰字級、8px 節奏
**Motion:** Subtle（首次短 intro、分頁時間軸 stagger；無 pin、無 scroll-jack）

---

## Global Rules

### Color Palette

淺色・白紙：

| Role | Hex | CSS Variable | Notes |
|------|-----|--------------|-------|
| Background | `#FFFFFF` | `--bg` | 主底 |
| Foreground | `#000000` | `--fg` | 正文 |
| Card | `#FFFFFF` | `--card` | Dialog 與表格 |
| Muted | `#F9F9F9` | `--muted` | 交替章節底、次要填色 |
| Muted Foreground | `#4A4A4A` | `--muted-fg` | ≥4.5:1 on white |
| Border | `#E4E4E4` | `--border` | 另有支援灰 `#EEEEEE` |
| Accent | `#FAC014` | `--accent` | 狀態色，不是正文色 |
| On Accent | `#000000` | `--on-accent` | 黃底只用黑字（白字對比不足） |
| Accent Text | `#6B4E00` | `--accent-text` | 連結與強調文字 |
| Destructive | `#C41E3A` | `--destructive` | |
| Ring | `#000000` | `--ring` | `:focus-visible` |

深色・夜版：

| Role | Hex | Notes |
|------|-----|-------|
| Background | `#0A0A0A` | |
| Foreground | `#FFFFFF` | |
| Card | `#161616` | |
| Muted | `#141414` | 交替章節底 |
| Muted Foreground | `#B3B3B3` | |
| Border | `#2E2E2E` | |
| Accent | `#FAC014` | 與淺色同一黃 |
| On Accent | `#000000` | 不用白字 |
| Accent Text | `#FAC014` | 深底上黃字對比充足 |
| Destructive | `#E08A8A` | |
| Ring | `#FFFFFF` | |

**不要用** 舊主題色票：樹冰夜燈（冷色雪原）、圍爐暖冬（和紙／柿色）、或 ui-ux-pro-max 的奶油＋陶土／海軍藍／Aurora Glass。

### Typography

- **Heading Font:** Noto Serif TC（標題、日期大字、對話框標題）
- **Body Font:** Noto Sans TC（正文、分頁、時間軸、膠囊標籤）
- **不要**改用 Zen Kaku Gothic 或 Helvetica 做正文。
- 章節標題：oversized Latin 日標（`DAY 01` + `1.10`），旁邊一個描邊膠囊放中文日名（hairline border、pill、較寬 tracking）。
- Latin tracking 比海報式緊排稍鬆（約 `0.06em`–`0.2em`），長頁捲動時仍清楚。

### Radius

- `--radius`: `0.75rem`（dialog、callout）
- `--radius-sm`: `0.5rem`（按鈕）
- 徽章：`4px`

### Signature accents

只這兩處用 2px 黃色作為固定簽名，不是 hover：

- 選中分頁：2px `--accent` 左邊線
- 時間軸：2px 同色脊線；首個／當日節點實心，其餘 12px 空心描邊

不要把警示 callout 做成行銷黃框。不要再加頂部主視覺橫幅。

---

## Layout

- 每日分頁在左側固定側欄（sticky DayTabs）。不要加 Lenis／smooth-scroll，以免打斷 sticky 與切日捲回。不要加頂部主視覺橫幅。
- 單日主體是垂直時間軸。不要加行銷描述或概述。警示、callout、必做事項必須保留。
- 雙數日／單數日交替用白底與 `#F9F9F9`（深色則 `#0A0A0A`／`#141414`）作為章節底。DayPanel 不再套一層全日白底大卡。
- 不要改行程事實、時刻，或 `src/data/*`（除必要 className）。不要寫門禁、信箱號碼或住宿完整街址。

---

## Motion

用 GSAP core + `@gsap/react` 的 `useGSAP`（scope ref、自動清理）。只在 client 跑，不在 SSR 呼叫 GSAP。用 transform 別名（`x`, `y`, `autoAlpha`, `scale`），不要動畫 layout 屬性。`gsap.matchMedia()` 處理 `prefers-reduced-motion`：減少動態時 skip 或 `duration: 0`。

- **首次造訪 intro**（`sessionStorage` 旗標 `sendai-2027-intro-seen`，回訪跳過）：約 1.5–2 秒。黃 `#FAC014` wipe + 主容器 `scale` 1.06→1，`power2`／`power3`。不要長時間鎖捲動。不要用隨機商品包裝或 5–6 秒劇場式 loader。
- **切日／首次顯示當日**：時間軸節點 fade/slide，短 stagger，約 300ms，`power2.out`。
- **保留**：dialog 開關、備選展開收合、切日時捲回版面頂、`:focus-visible`。
- **不要**：ScrollTrigger pin、scroll-jack、Lenis。不要加回頂部 Hero 橫幅或視差。
- **不要 hover 變色、底、亮度、位移或黃色 hover wipe。** 選中／active／pressed／expanded／open／`aria-current` 才可用黃（pill 或 2px 左邊線）作為狀態。

---

## Components

- 按鈕 `min-height: 44px`。各日待辦的「新增」＝accent／primary（黃底黑字）。衣著與備案、改回待確認、確認備註＝secondary（平面＋1px 邊框）。
- 待辦顯示在對應那一日，狀態為待確認／已完成；不要再用頂部全域待辦按鈕。衣著與備案在側欄開啟置中對話框。
- Dialog 置中、focus trap、1px border、radius 12。
- TextLink 用 `accent-text`，正常狀態已有底線。
- 已核實徽章要有文字＋可見邊框。
- Alternatives 靠 `aria-expanded`；展開後才出現有邊框面板。

---

## Anti-Patterns (Do NOT Use)

- ❌ 複製 CalorieMate 品牌、包裝圖、營養 icon、自動播放 KV、mega menu、長 loader
- ❌ Hover 變色／底／亮度／位移／黃 wipe
- ❌ 用 emoji 當 icon
- ❌ 用 accent 黃做正文色（淺底對比不足）
- ❌ 黃底白字
- ❌ 把警示與必做事項刪成「乾淨版面」
- ❌ 改行程文案或交通事實來遷就視覺
- ❌ pin 區塊或 scroll-jack
- ❌ 改用其他正文字體

---

## Pre-Delivery Checklist

- [ ] 淺＋深：正文對比 ≥4.5:1
- [ ] 44px 最小點擊高度
- [ ] sticky 分頁不遮內容
- [ ] dialog focus trap
- [ ] `prefers-reduced-motion` 跳過 intro 與 stagger
- [ ] 無 hover 視覺特效
- [ ] 無 emoji 當 icon
- [ ] 375／768／1024／1440
- [ ] 行程事實與警示仍在對應分頁
