import { DayStatusList } from "../components/ConfirmableStatus";
import { DaySchedule } from "../components/Alternatives";
import { DataTable } from "../components/DataTable";
import { DayPanel } from "../components/DayPanel";
import { SourceList } from "../components/SourceList";
import { TextLink } from "../components/TextLink";
import { TimeList } from "../components/TimeList";
import { Timeline } from "../components/Timeline";
import { days } from "../data/pages";
import { refs } from "../data/refs";

const day = days[6];

export function HarryDay() {
  return (
    <DayPanel day={day}>
      <DayStatusList ids={["harry", "sky", "tokyo-airbnb"]} />
      <DaySchedule
        alternatives={
          <DataTable
            columns={["情況", "改做"]}
            rows={[
              ["1/16 上午售罄或較貴", "改 1/17（日）上午同一走法，先看官方日曆哪天較便宜還有位"],
              [
                "改授權通路",
                <>
                  先對官價再考慮{" "}
                  <TextLink href={refs.kkdayHP.href}>KKday 144383</TextLink>
                  {" 或 "}
                  <TextLink href={refs.klookHP.href}>Klook 84374</TextLink>
                  。高於官價則買官方。
                </>,
              ],
              [
                "1/16、1/17 都沒位",
                "才考慮 1/18 最早入場；約正午結束，回住宿取行李，約 15:50–16:00 由大山出發趕成田。不當首選。",
              ],
              ["不要改去 1/15", "抵達日有行李，locker 不一定放下大箱，不當主線。Magical Winter 已於 1/11 結束。"],
              ["1/16 傍晚 SKY 完售或關屋頂", "改 1/17 同一展望台；票於 2027-01-03 00:00（日本時間）開賣"],
              ["teamLab 改去 1/17", "若 1/15 沒去，1/17 可改去 teamLab，不要與 SKY 同日硬疊。購票見 1/15。"],
              ["1/17 主線", "見 1/17 川越分頁。哈利波特、SKY、teamLab 仍為該日備選"],
            ]}
          />
        }
        timeline={
          <Timeline
            items={[
              {
                title: "由大山住宿出發",
                description: "約 08:00–08:15（估算）",
                price: "IC 370 日圓",
                detail: (
                  <TimeList
                    times={[
                      "趕 09:00–11:00 入場帶",
                      "南口步行約 3 分，東武東上線至池袋再轉西武至豊島園",
                      "門到門約 35–45 分（估算，出發前再對）",
                      "西武段不在 Tokyo Subway Ticket 內",
                      "不要帶大型或多件行李入館；大箱先留在住宿",
                      "戶外 locker 開口約 350×930×555mm，大行李箱不一定放得進",
                    ]}
                  />
                ),
                link: { href: refs.mapsOyamaStudio.href, label: "Google 地圖：大山駅至影城" },
              },
              {
                title: "豊島園駅步行至影城",
                description: "約 2 分",
                detail: "出駅後徒步約 2 分。",
                link: { href: refs.mapsIkebukuroStudio.href, label: "Google 地圖：池袋駅至影城" },
              },
              {
                title: "入場參觀（日間必去）",
                description: "09:00–11:00 入場帶",
                price: "官方 Standard 大人 6,600–7,300 日圓",
                detail: (
                  <>
                    <TimeList
                      times={[
                        "依入場日浮動，先看官方",
                        "參觀約 3–4 小時",
                        "可提前 1 小時入館（第一輪為 30 分前）",
                        "票不可退，改期手續費官方 1,500 日圓",
                        "已開放至 2027-03-31 入場；日曆可選不等於有位",
                        "結束後轉往渋谷看 SKY",
                      ]}
                    />
                    {" "}
                    <TextLink href={refs.studioTickets.href}>官方購票</TextLink>
                  </>
                ),
              },
              {
                title: "SHIBUYA SKY（日落／晚間）",
                description: "建議 15:00 後時段",
                price: "WEB 大人 3,400 日圓",
                detail: (
                  <>
                    <TimeList
                      times={[
                        "須日時指定券",
                        "1/16 票於 2027-01-02 00:00（日本時間）開賣，前一日可免費取消",
                        "10:00–14:59 為 2,700 日圓；窗口各貴 300 日圓",
                        "WEB 完售則窗口也不能買該時段",
                        "強風或關屋頂",
                        "不要與 teamLab 同日硬疊",
                        "購買時再對官網",
                      ]}
                    />
                    {" "}
                    <TextLink href={refs.skyTickets.href}>官方購票</TextLink>
                  </>
                ),
                link: { href: refs.mapsStudioSky.href, label: "Google 地圖：影城至 SHIBUYA SKY" },
              },
            ]}
          />
        }
      />
      <SourceList
        links={[
          refs.studioTickets,
          refs.studioHours,
          refs.studioLocation,
          refs.studioArrival,
          refs.kkdayHP,
          refs.klookHP,
          refs.mapsOyamaStudio,
          refs.mapsIkebukuroStudio,
          refs.skyTickets,
          refs.mapsStudioSky,
        ]}
      />
    </DayPanel>
  );
}
