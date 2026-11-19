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

const day = days[2];

export function FoxDay() {
  return (
    <DayPanel day={day}>
      <DayStatusList ids={["fox-transport"]} />
      <DaySchedule
        alternatives={
          <>
            <DataTable
              columns={["情況", "改做"]}
              rows={[
                ["錯過或坐滿 10:15", "改乘 13:05 開、13:39 到的第 2 便，或站前的士上山（官方約 20 分）"],
                ["惡天提早關門", "改乘 12:10 開、12:46 到白石藏王的第 1 便"],
                ["趕不上 15:00 末班", "請村職員叫的士，再乘上列回程新幹線；末班 23:13"],
              ]}
            />
            <DataTable
              columns={["團", "集合／出發", "去哪、做什麼", "時長／回程"]}
              rows={[
                [
                  "KKday 20358 狐狸村＋松島拼車",
                  <>
                    <TextLink href={refs.mapsHotelSendaiEast.href}>JR仙台站東口</TextLink>
                    ：08:30 或 09:00；出發前 10 分到。由酒店（西口）經西口過東西自由通路，約 8–12 分（估算，含 5F）。
                  </>,
                  "狐狸村；松島遊船（丸文松島汽船 2號櫃位換票）；食物券換魚餅、烤蠔。餐自理。司機日文、無導覽",
                  "約 8 小時 30 分，東口解散。最少人數以頁面為準。遊船停駛退還 1,200 日圓。含烤蠔兌換，不是一餐，也會壓縮狐狸村時間，不當 1/14 吃蠔主線。尚未下訂",
                ],
                [
                  "KKday 23981 狐狸村包車半日",
                  "08:00–13:00 自選；JR仙台站或附近酒店接送，本酒店可用",
                  "只去狐狸村，園內約 90 分；單程車程約 90 分。日文司機、無導遊。按車計費",
                  "約 4.5 小時，送回出發點。最少 1 人。尚未下訂（2026-11-14 查）",
                ],
                [
                  <TextLink key="klook-fox-ginzan" href={refs.klookFoxGinzan.href}>Klook 狐狸村＋銀山溫泉一日遊</TextLink>,
                  "08:30–18:30；仙台出發，集合以憑證為準。最少 3 人",
                  "狐狸村與銀山溫泉。1/11 已去銀山，不當優先備選。中文導覽僅 4 人以上才隨行",
                  "約 10 小時回仙台。尚未下訂（2026-11-19 查）",
                ],
                [
                  "狐狸村＋樹冰同日團",
                  "KKday、Klook 均有",
                  "會把狐狸村與樹冰（或宮城澄川雪上車）排同一天，不採用",
                  "兩項不可同日",
                ],
              ]}
            />
          </>
        }
        timeline={
          <Timeline
            items={[
              {
                title: "酒店 5F 出發",
                description: "09:10–09:15（估算）",
                detail: (
                  <TimeList
                    times={[
                      "走仙台站西口（官方徒步 3 分）",
                      "入站轉 3 樓新幹線改札、4 樓 14 番線",
                      "發車前 20–25 分到月台",
                    ]}
                  />
                ),
                link: { href: refs.mapsHotelSendaiWalk.href, label: "Google 地圖：酒店步行至仙台駅" },
              },
              {
                title: "新幹線往白石藏王",
                description: "主線 09:41–09:55",
                price: "自由席片道約 1,690 日圓",
                detail: (
                  <TimeList
                    intro="現行平日表，趕 10:15 巴士第 1 便（出發前再對 2027年1月）："
                    times={[
                      "08:07 開、08:20 到，やまびこ 126號",
                      "08:40 開、08:53 到，やまびこ 128號",
                      "09:41 開、09:55 到，やまびこ 132號（主線）",
                    ]}
                    note="仙台 14番線開，白石藏王 2番線到。不要乘不停白石藏王的はやぶさ／こまち。指定席用えきねっと再查。自由席價為第三方報價，出發前再對。"
                  />
                ),
                link: { href: refs.mapsShiroishiZao.href, label: "Google 地圖：白石蔵王駅" },
              },
              {
                title: "循環巴士往狐狸村",
                description: "主線 10:15–10:49",
                price: "大人 1,000 日圓",
                detail: (
                  <TimeList
                    intro="タケヤ交通 白石蔵王山麓循環線；官方只標便數。1/12 平日不能用山麓アクセス線："
                    times={[
                      "10:15 開、10:49 到（第 1 便，主線）",
                      "13:05 開、13:39 到（第 2 便）",
                    ]}
                    note="白石藏王站前上車，在站前等車。不定預約；滿員改乘下一班。"
                  />
                ),
              },
              {
                title: "狐狸村（日間必去）",
                description: "10:49–15:00",
                price: "入場 1,500 日圓，現場現金",
                detail: (
                  <TimeList
                    times={[
                      "無前售票",
                      "冬季營業 9:00–16:00，最終入場 15:30",
                      "暴風雪可縮短；雨天照常",
                      "15:00 必須離場趕末班",
                      "自備午餐",
                    ]}
                  />
                ),
                link: { href: refs.mapsFoxVillage.href, label: "Google 地圖：宮城蔵王キツネ村" },
              },
              {
                title: "循環巴士回白石藏王",
                description: "主線 15:00–15:36",
                price: "大人 1,000 日圓",
                detail: (
                  <TimeList
                    times={[
                      "12:10 開、12:46 到（第 1 便；惡天提早關門時）",
                      "15:00 開、15:36 到（第 2 便／末班，主線）",
                    ]}
                  />
                ),
              },
              {
                title: "新幹線回仙台",
                description: "主線 16:51–17:05",
                price: "自由席片道約 1,690 日圓",
                detail: (
                  <TimeList
                    intro="現行平日表。末班循環巴士 15:36 到白石蔵王（出發前再對 2027年1月）："
                    times={[
                      "15:51 開、16:05 到，やまびこ 141號（較緊）",
                      "16:51 開、17:05 到，やまびこ 143號（主線，較穩）",
                      "17:24 開、17:39 到，やまびこ 67號（盛岡行；平日表標時刻變更）",
                      "17:51 開、18:06 到，やまびこ 145號",
                      "18:49 開、19:03 到，やまびこ 149號",
                      "19:50 開、20:04 到，やまびこ 153號",
                      "21:09 開、21:23 到，やまびこ 157號",
                      "21:28 開、21:42 到，やまびこ 219號",
                      "23:13 開、23:27 到，やまびこ 223號（末班）",
                    ]}
                    note="白石藏王 1番線開。走西口回酒店。指定席用えきねっと再查。"
                  />
                ),
              },
            ]}
          />
        }
      />
      <SourceList
        links={[
          refs.foxHome,
          refs.foxCalendar,
          refs.takeya,
          refs.accessLine,
          refs.yamabiko132,
          refs.yamabiko141,
          refs.yamabiko143,
          refs.shiroishiDown,
          refs.kkdayFoxMatsushima,
          refs.kkdayFoxPrivate,
          refs.klookFoxGinzan,
          refs.mapsHotelSendaiWalk,
          refs.mapsHotelSendaiEast,
          refs.mapsShiroishiZao,
          refs.mapsFoxVillage,
        ]}
      />
    </DayPanel>
  );
}
