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

const day = days[4];

export function DontoDay() {
  return (
    <DayPanel day={day}>
      <DayStatusList ids={["koha-open", "donto-traffic"]} />
      <DaySchedule
        alternatives={
          <DataTable
            columns={["方案", "適用", "說明"]}
            rows={[
              [
                "松島觀光協會かき小屋",
                "2026-11-06 至 2027-03-15，限一、三、五、六、日、祝",
                <>
                  40 分燒蠔吃到飽，大人 3,800 日圓，不提供生蠔。1/14（週四）定休，不能當日主線。{" "}
                  <TextLink href="https://www.tablecheck.com/ja/shops/matsushima-kakigoya/reserve">
                    專用網站預約
                  </TextLink>
                </>,
              ],
              [
                "KKday 20358 狐狸村＋松島拼車",
                "1/12 備選",
                "這是現有團中會到松島的一條。含烤蠔兌換，不是一餐，也會壓縮狐狸村時間，不當吃蠔主線。",
              ],
            ]}
          />
        }
        timeline={
          <Timeline
            items={[
              {
                title: "酒店出發，乘仙石線至松島海岸",
                description: "早上，約 40 分",
                price: "片道 440 日圓",
                detail: (
                  <TimeList
                    times={[
                      <span key="aoba">
                        從 <TextLink href={refs.mapsHotelAoba.href}>あおば通出口 1</TextLink> 入站較近（酒店官方徒步約 1 分）
                      </span>,
                      <span key="kaigan">
                        趕 11:30 前到 <TextLink href={refs.mapsMatsushimaKaigan.href}>松島海岸駅</TextLink>
                      </span>,
                      "不要由酒店走路去",
                      <TextLink key="matsushima-route" href={refs.mapsHotelMatsushima.href}>公共交通路線</TextLink>,
                    ]}
                  />
                ),
                link: { href: refs.mapsHotelAoba.href, label: "Google 地圖：酒店步行至あおば通駅" },
              },
              {
                title: "かき松島こうは吃蠔（必去）",
                description: "約 11:30 起",
                detail: (
                  <TimeList
                    times={[
                      "站前徒步即到",
                      "晝約 11:30–16:00；不定休，賣完可早關",
                      "出發前致電確認當日有開（022-353-3588 二號店）",
                      "可點生蠔、烤蠔",
                      "吃完後可順路看一下海岸，不排遠路",
                    ]}
                  />
                ),
                link: { href: refs.mapsKoha.href, label: "Google 地圖：かき松島こうは" },
              },
              {
                title: "仙石線回仙台",
                description: "午後",
                price: "片道 440 日圓",
                detail: "回酒店休息後，再出發趕松焚祭傍晚場次。",
              },
              {
                title: "大崎八幡宮松焚祭",
                description: "傍晚至夜間",
                price: "參觀免費",
                detail: (
                  <TimeList
                    intro="常態／2026 年模式，非 2027 年已公布時刻"
                    times={[
                      "不要由酒店走路去（約 4.7 公里）；乘巴士",
                      <span key="west-bus">
                        酒店步行約 5–8 分到 <TextLink href={refs.mapsHotelWestBusPool.href}>西口巴士池</TextLink>
                      </span>,
                      <span key="ryuoji">
                        平時約 20–25 分到 <TextLink href={refs.mapsRyuoji.href}>龍宝寺入口</TextLink>
                      </span>,
                      <span key="hachimangu">
                        再步行約 8–10 分至 <TextLink href={refs.mapsOsakiHachimangu.href}>大崎八幡宮</TextLink>
                      </span>,
                      "臨時便與站位 2027 年未公布",
                      "規制時段預留 60–90 分",
                      "御祈願受付 9:00–21:00",
                      "御神火：神社寫夕方 5 時頃或日沒頃，2026 年報道約 17:00 點火",
                      "裸参り盡量 18:00 後到，16:00–19:00 最擠",
                      "火可燃至 15 日未明；觀賞高峰在 14 日傍晚至夜間，不要把 15 日早晨當正場",
                      "裸参り須事前向神社申請，旅客不要當日臨時加入",
                      "不要主要靠夜路步行",
                    ]}
                  />
                ),
              },
            ]}
          />
        }
      />
      <SourceList
        links={[
          refs.koha,
          refs.kakiGoya,
          refs.matsutaki,
          refs.matutaki,
          refs.shrineTraffic,
          refs.mapsHotelAoba,
          refs.mapsKoha,
          refs.mapsHotelMatsushima,
          refs.mapsMatsushimaKaigan,
          refs.mapsHotelWestBusPool,
          refs.mapsRyuoji,
          refs.mapsOsakiHachimangu,
        ]}
      />
    </DayPanel>
  );
}
