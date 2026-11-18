# 2027仙台冬旅計劃（網站預覽）

這是 [2027仙台冬旅計劃（可修訂）](https://cursor.com/canvas/store-a50ea603-be00-4c5b-ba93-5b8658cf7177/eb70cdd1-10d2-4553-804a-74eb3753166f) 的獨立網站版本，把整份行程做成可在手機與電腦瀏覽的視覺預覽。打開網站會直接進入 1/10。

畫布頁仍是可修訂的規劃原稿；這個網站是對外／預覽用的介面，行程有改再同步一次。目前尚未部署到 Cloudflare Pages 或 Vercel，其他人還不能用公開網址打開這個版本。現有畫布公開連結仍可分享：<https://2027-7vwt.pages.grok.bot/>。

## 本機執行

需要 Node.js 20 或以上。

```bash
cd sendai-2027-trip-site
npm install
npm run dev
```

開發伺服器會綁在 `0.0.0.0:5173`。在本機瀏覽器打開 http://localhost:5173/ 。

正式建置：

```bash
npm run build
npm run preview
```

預覽伺服器在 http://localhost:4173/ 。

## 使用說明

- 每日分頁在左側固定側欄切換。待辦放在對應那一日，顯示為待確認，可在當日勾選或新增；衣著與備案在側欄開啟對話框。
- 尚未下訂或待確認的項目會清楚標示。可在本機「標為已確認」或寫「確認備註」。這些狀態只存在這部瀏覽器（`localStorage`），不會代為購票、付款或更改真實訂單。
- 待辦清單同樣只記在本機，鍵名為 `sendai-2027-todos`。

## 技術

Vite、React、TypeScript、Tailwind CSS、GSAP（`gsap` + `@gsap/react`）。視覺是編輯風白／黑／黃（參考大塚 CalorieMate 官網的版面節奏，不是品牌複製）：主底 `#FFFFFF`、正文 `#000000`、強調 `#FAC014`，標題 Noto Serif TC、正文 Noto Sans TC。細節見 `design-system/2027/MASTER.md`。之後可靜態匯出，交由你部署到 Cloudflare Pages 或 Vercel。
