import { DayStatusList } from "../components/ConfirmableStatus";
import { Alternatives } from "../components/Alternatives";
import { DataTable } from "../components/DataTable";
import { DayPanel } from "../components/DayPanel";
import { SourceList } from "../components/SourceList";
import { TextLink } from "../components/TextLink";
import { Timeline } from "../components/Timeline";
import { days } from "../data/pages";
import { refs } from "../data/refs";

const day = days[4];

export function DontoDay() {
  return (
    <DayPanel day={day}>
      <DayStatusList ids={["koha-open", "donto-traffic"]} />
      <Timeline
        items={[
          {
            title: "酒店出發，乘仙石線至松島海岸",
            description: "早上，約 40 分",
            detail:
              "從あおば通出口 1 入站較近（酒店官方徒步約 1 分），或由仙台站出發。片道 440 日圓（查閱 2026-11-14，出發前再對）。趕 11:30 前到站前。",
          },
          {
            title: "かき松島こうは吃蠔（必去）",
            description: "約 11:30 起",
            detail:
              "上午必去。1 月是旬。糸島在福岡，不在本次行程。松島海岸駅前店，站前徒步即到。晝約 11:30–16:00；不定休，賣完可早關。出發前致電確認當日有開（022-353-3588 二號店）。可點生蠔、烤蠔、蠔のひつまぶし；二號店一樓有松島カキフライバーガー。吃完後可順路看一下海岸，不排遠路。",
          },
          {
            title: "仙石線回仙台",
            description: "午後",
            detail: "回酒店休息後，再出發趕松焚祭傍晚場次。",
          },
          {
            title: "大崎八幡宮松焚祭",
            description: "傍晚至夜間",
            detail:
              "大崎八幡宮（仙台市青葉區）。御祈願受付 9:00–21:00。御神火：神社寫夕方 5 時頃或日沒頃；2026 年報道約 17:00 點火。裸参り盡量 18:00 後到；16:00–19:00 最擠。火可燃至 15 日未明；高峰在 14 日傍晚至夜間，不要把 15 日早晨當正場。參觀免費。裸参り須事前向神社申請（常態截止 12 月 23 日）並辦道路使用許可，不要當日臨時加入。市營巴士：酒店步行約 5–8 分到西口巴士池，平時約 20–25 分到龍宝寺入口，再步行約 8–10 分。臨時便與站位 2027 年未公布。規制時段預留 60–90 分。不要主要靠夜路步行。尊重隊列，遠離火堆。",
          },
        ]}
      />
      <Alternatives label="若改店或改跟團">
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
              "這是現有團中會到松島的一條。含竹雀庵烤蠔兌換，屬零食不是一餐，並會壓縮必去狐狸村的日間時間。不當吃蠔主方案。",
            ],
          ]}
        />
      </Alternatives>
      <SourceList
        links={[refs.koha, refs.kakiGoya, refs.matsutaki, refs.matutaki, refs.shrineTraffic]}
      />
    </DayPanel>
  );
}
