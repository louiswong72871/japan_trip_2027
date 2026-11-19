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

const day = days[1];

export function GinzanDay() {
  return (
    <DayPanel day={day}>
      <DayStatusList ids={["kkday-183402", "bus-1-11"]} />
      <DaySchedule
        alternatives={
          <>
            <Timeline
              items={[
                {
                  title: "酒店出發，乘 22番高速巴士至山形",
                  description: "可早於 12:45",
                  detail: "仍用現行土日祝表。片道 1,100 日圓。",
                },
                {
                  title: "山形站前轉乘往大正ろまん館",
                  description: "山交巴士",
                  detail:
                    "停車序：山形駅前、山形駅西口、大正ろまん館。具體班次出發前再對山交時刻表。",
                  link: { href: refs.mapsTaishoRoman.href, label: "Google 地圖：大正ろまん館" },
                },
                {
                  title: "大正ろまん館轉官方接駁",
                  description: "每 20 分一班",
                  detail: (
                    <TimeList
                      times={[
                        "館發：每時 00、20、40",
                        "村發：每時 10、30、50",
                        "往路末班 18:00，復路末班 19:30",
                      ]}
                      note="車程約 10 分。2026-12-19 起，14:00–18:00 往返 1,500 日圓（提前預訂 1,200）。建議前一日 17:00 前預約。積雪時或只到銀山莊前，再步行約 10 分。"
                    />
                  ),
                },
                {
                  title: "在溫泉街看夜景，趕復路末班",
                  description: "最遲 19:30 離村",
                  detail: "優先乘「往路開出 90 分後」的復路班。",
                  link: { href: refs.mapsGinzanOnsen.href, label: "Google 地圖：銀山温泉" },
                },
                {
                  title: "回山形站，再乘高速巴士回仙台",
                  description: "現行有 20:33、21:03，末班約 21:33",
                  detail: "末班約 22:41 到仙台，再走西口回酒店。出發前再對。",
                },
              ]}
            />
            <DataTable
              columns={["情況", "改做"]}
              rows={[
                ["錯過 13:10", "13:25（14:32 到）；13:40（14:47 到）自行前往仍可用"],
                ["改乘仙山線", "官方寫快速約 1 小時 5 分；不虛構發車分鐘，出發前對 JR 時刻表"],
              ]}
            />
          </>
        }
        timeline={
          <Timeline
            items={[
              {
                title: "酒店出發",
                description: "12:45（估算）",
                detail: (
                  <TimeList
                    times={[
                      "由酒店步行約 4–5 分（估算；約 150 公尺，酒店在 5F）至仙台站前 22番（青葉通り旧エデン）",
                      "酒店在西口，不是東口 76 番",
                      "另留買票排隊時間",
                    ]}
                  />
                ),
                link: { href: refs.mapsHotelBus22.href, label: "Google 地圖：酒店步行至 22番" },
              },
              {
                title: "高速巴士往山形",
                description: "13:10–14:17",
                price: "片道 1,100 日圓",
                detail: (
                  <TimeList
                    times={[
                      "22番上車",
                      "1/11 是成人の日，現行土日祝表（2026年4月1日改正），出發前再對 2027年1月",
                      "到站後轉東口，15:00 前到集合點",
                    ]}
                  />
                ),
              },
              {
                title: "東口集合，開出跟團",
                description: "15:20 集合，15:30 開出",
                detail: (
                  <TimeList
                    times={[
                      "KKday 183402 銀山溫泉夜景半日遊，由山形站東口出發，不是仙台出發的藏王樹冰團",
                      "行程表另列 15:10；15:00 前到，以憑證為準",
                      <span key="spal">
                        旅遊巴在 <TextLink href={refs.mapsSpalYamagata.href}>S-PAL（エスパル）前</TextLink>
                      </span>,
                      <span key="taxi">
                        海獅車在 <TextLink href={refs.mapsYamagataTaxi.href}>予約タクシーのりば</TextLink>
                      </span>,
                      "出改札往東口，下至 1F ロータリー南側約 1–2 分，不是由仙台酒店走路可到",
                      "包含：車資、導遊、停車、過路、保險",
                      "不包：餐食、小費、個人消費、銀山接駁巴士",
                      "未達人數出發前 4 天可能取消",
                      "出發前 1 天當地 17:00 決定是否因天候取消",
                      "提前 10 分到，逾時不候",
                    ]}
                  />
                ),
              },
              {
                title: "大正浪漫館轉接駁",
                description: "16:50",
                detail: "若當日須轉乘。接駁費團不含。",
                link: { href: refs.mapsTaishoRoman.href, label: "Google 地圖：大正ろまん館" },
              },
              {
                title: "銀山溫泉街",
                description: "約 16:50–18:20",
                detail: (
                  <TimeList
                    times={[
                      "停留約 90 分",
                      "不適合作正餐；午餐留在仙台，晚餐優先山形站附近",
                    ]}
                  />
                ),
                link: { href: refs.mapsGinzanOnsen.href, label: "Google 地圖：銀山温泉" },
              },
              {
                title: "返回接駁，山形站解散",
                description: "18:20 回程，20:00 解散",
                detail: "解散後轉站前 1 番。",
              },
              {
                title: "高速巴士回仙台（較穩）",
                description: "20:33–21:41",
                price: "片道 1,100 日圓",
                detail: (
                  <TimeList
                    times={[
                      "山形站前 1 番上車",
                      "不要趕 20:13",
                      "走西口回酒店，約 21:55 到",
                    ]}
                  />
                ),
                link: { href: refs.mapsYamagataBus1.href, label: "Google 地圖：山形駅前 1番" },
              },
            ]}
          />
        }
      />
      <SourceList
        links={[
          refs.kkday,
          refs.shuttle,
          refs.busSy,
          refs.busYs,
          refs.senzan,
          refs.mapsHotelBus22,
          refs.mapsSpalYamagata,
          refs.mapsYamagataTaxi,
          refs.mapsYamagataBus1,
          refs.mapsTaishoRoman,
          refs.mapsGinzanOnsen,
        ]}
      />
    </DayPanel>
  );
}
