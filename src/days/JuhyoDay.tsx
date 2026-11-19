import { DayStatusList } from "../components/ConfirmableStatus";
import { DaySchedule } from "../components/Alternatives";
import { Callout } from "../components/Callout";
import { DataTable } from "../components/DataTable";
import { DayPanel } from "../components/DayPanel";
import { SourceList } from "../components/SourceList";
import { TextLink } from "../components/TextLink";
import { TimeList } from "../components/TimeList";
import { Timeline } from "../components/Timeline";
import { days } from "../data/pages";
import { refs } from "../data/refs";

const day = days[3];

export function JuhyoDay() {
  return (
    <DayPanel day={day}>
      <Callout lead="不保證看到完整樹冰">
        必去的是山形藏王纜車／地藏山頂，不用宮城澄川雪上車「樹冰幻想回廊」代替。官方：1月為成長期，2月最盛，3月衰退。纜車與巴士均可因吹雪停駛。必須早上出發，勿趕末班。
      </Callout>
      <DayStatusList ids={["juhyo-transport"]} />
      <DaySchedule
        alternatives={
          <>
            <DataTable
              columns={["情況", "改做"]}
              rows={[
                ["錯過 6:10", "6:25 開、7:32 到較緊，仍轉 7:40 Z90；再遲改轉 8:40 Z90"],
                ["錯過 7:40 Z90", "下一班 8:40 開、9:17 到"],
                ["Z90 滿員", "山形駅前改的士上山（縣官方寫約 7,000 日圓，出發前再對）"],
                ["纜車或巴士吹雪停駛", "當日可能上不到山頂；不要改用宮城澄川雪上車代替"],
                ["想用仙台東口直達巴士", "2026-27 季尚未公布，不能當可訂"],
              ]}
            />
            <DataTable
              columns={["團", "集合／出發", "去哪、做什麼", "時長／回程"]}
              rows={[
                [
                  <TextLink key="kkday-juhyo-ginzan" href={refs.kkdayJuhyoGinzan.href}>KKday 746170 藏王纜車樹冰＋銀山溫泉</TextLink>,
                  "2 人成團；專車由仙台出發，集合以憑證為準。出發時刻隨纜車預約時段調整，不是保證趕 8:30 始發",
                  "山形蔵王ロープウェイ（不用中央纜車）及銀山溫泉。纜車與銀山接駁另付。1/11 已去銀山，只當交通備選",
                  "約 8.5–12 小時回仙台。尚未下訂（2026-11-19 查）",
                ],
                [
                  <TextLink key="klook-juhyo-ginzan" href={refs.klookJuhyoGinzan.href}>Klook 藏王樹冰＋銀山溫泉一日遊</TextLink>,
                  <>
                    <TextLink href={refs.mapsHotelSendaiEast.href}>仙台站東口麵包超人雕像前</TextLink>
                    ；由酒店（西口）經東西自由通路約 8–12 分。出發時刻因日期而異，以憑證為準。2 人成團
                  </>,
                  "山形蔵王ロープウェイ（不用中央纜車）及銀山溫泉。纜車與銀山接駁另付，團體優先入場已排。1/11 已去銀山，只當交通備選",
                  "約 8.5–11.8 小時回仙台。尚未下訂（2026-11-19 查）",
                ],
                [
                  "狐狸村＋樹冰同日團",
                  "KKday、Klook 均有",
                  "會把樹冰與狐狸村（或宮城澄川雪上車）排同一天，不採用",
                  "兩項不可同日；也不要用澄川代替山形纜車",
                ],
              ]}
            />
          </>
        }
        timeline={
          <Timeline
            items={[
              {
                title: "酒店出發",
                description: "05:45–05:50",
                detail: (
                  <TimeList
                    times={[
                      "日間必去，不排晚上",
                      "由酒店步行約 4–5 分至仙台站前 22番（青葉通り旧エデン）",
                      "酒店在西口，不是東口 76 番",
                      "另留買票排隊時間",
                      "1/13 是平日，不要用 1/11 土日祝時刻",
                    ]}
                  />
                ),
                link: { href: refs.mapsHotelBus22.href, label: "Google 地圖：酒店步行至 22番" },
              },
              {
                title: "高速巴士往山形",
                description: "主線 06:10–07:17",
                price: "片道 1,100 日圓",
                detail: (
                  <TimeList
                    intro="現行平日表，趕 7:40 Z90（出發前再對 2027年1月）："
                    times={[
                      "06:10 開、07:17 到（主線，轉 7:40 Z90）",
                      "06:25 開、07:32 到（較緊，轉 7:40 Z90）",
                      "06:40 開、07:47 到（轉 8:40 Z90）",
                      "07:00 開、08:07 到（轉 8:40 Z90）",
                      "07:12 開、08:19 到（較緊，轉 8:40 Z90）",
                      "07:30 開、08:37 到（轉 9:20 Z90）",
                    ]}
                    note="22番上車，到山形駅前。另有 6:50 開、7:26 到的 Z90，由仙台當日最早巴士趕不上。"
                  />
                ),
              },
              {
                title: "Z90 往蔵王温泉",
                description: "主線 07:40–08:20",
                detail: (
                  <TimeList
                    intro="現行平日表，山形駅前 1 番開，到蔵王温泉バスターミナル（出發前再對 2027年1月）："
                    times={[
                      "07:40 開、08:20 到（主線）",
                      "08:40 開、09:17 到",
                      "09:20 開、09:57 到",
                      "10:20 開、10:57 到",
                      "11:20 開、11:57 到",
                      "12:20 開、12:57 到",
                      "13:20 開、13:57 到",
                      "14:20 開、14:57 到",
                      "15:20 開、15:57 到",
                      "16:20 開、16:57 到",
                      "17:40 開、18:17 到",
                      "18:55 開、19:32 到（末班，勿趕）",
                    ]}
                    note="定員制，滿員改的士。不是由仙台酒店走路可到。"
                  />
                ),
                link: { href: refs.mapsYamagataBus1.href, label: "Google 地圖：山形駅前 1番" },
              },
              {
                title: "步行至纜車山麓駅，上地藏山頂",
                description: "山麓線 8:30–17:00，上行最終山麓 16:00",
                price: "地藏山頂往復大人 4,400 日圓",
                detail: (
                  <TimeList
                    times={[
                      "由バスターミナル步行約 10–15 分至蔵王ロープウェイ山麓駅",
                      "去地藏山頂，不用宮城澄川代替",
                      "樹冰高原駅往復 2,200 日圓，不到山頂才考慮",
                      "山頂線 8:45–16:45",
                      "不要走到蔵王中央ロープウェイ温泉駅",
                    ]}
                  />
                ),
                link: { href: refs.mapsZaoWalk.href, label: "Google 地圖：巴士總站步行至山麓駅" },
              },
              {
                title: "在山頂，傍晚前下山",
                description: "日間",
                detail: (
                  <TimeList
                    times={[
                      "午餐可在山形市或溫泉街",
                      "2026-27 夜燈不含 1/13",
                    ]}
                  />
                ),
              },
              {
                title: "C2 回山形站",
                description: "主線 16:20–17:05",
                detail: (
                  <TimeList
                    intro="現行平日表，蔵王温泉バスターミナル開，到山形駅前（出發前再對 2027年1月）："
                    times={[
                      "14:20 開、15:05 到",
                      "15:20 開、16:05 到",
                      "16:20 開、17:05 到（主線）",
                      "17:20 開、18:05 到",
                      "18:40 開、19:25 到",
                      "19:50 開、20:27 到（末班）",
                    ]}
                  />
                ),
                link: { href: refs.mapsZaoBusTerminal.href, label: "Google 地圖：蔵王温泉バスターミナル" },
              },
              {
                title: "高速巴士回仙台",
                description: "主線 17:18–18:26",
                price: "片道 1,100 日圓",
                detail: (
                  <TimeList
                    intro="現行平日表，山形駅前 1 番開，到仙台駅前（出發前再對 2027年1月）："
                    times={[
                      "17:18 開、18:26 到（接 16:20 C2，主線）",
                      "18:18 開、19:26 到（接 17:20 C2）",
                      "19:33 開、20:41 到（接 18:40 C2，較緊）",
                      "19:48 開、20:56 到（接 18:40 C2，較穩）",
                      "20:58 開、22:06 到（接 19:50 C2）",
                      "21:33 開、22:41 到（末班）",
                    ]}
                    note="走西口回酒店。仙台東口冬季直達巴士 2026-27 季尚未公布，不能當可訂。"
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
          refs.juhyo,
          refs.ropewayGuide,
          refs.lighting,
          refs.z90,
          refs.c2,
          refs.busSy,
          refs.busYs,
          refs.directBus,
          refs.kkdayJuhyoGinzan,
          refs.klookJuhyoGinzan,
          refs.mapsYamagataBus1,
          refs.mapsHotelBus22,
          refs.mapsZaoBusTerminal,
          refs.mapsZaoRopeway,
          refs.mapsZaoWalk,
        ]}
      />
    </DayPanel>
  );
}
