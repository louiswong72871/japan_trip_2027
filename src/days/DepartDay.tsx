import { DayStatusList } from "../components/ConfirmableStatus";
import { DaySchedule } from "../components/Alternatives";
import { DataTable } from "../components/DataTable";
import { DayPanel } from "../components/DayPanel";
import { SourceList } from "../components/SourceList";
import { TimeList } from "../components/TimeList";
import { Timeline } from "../components/Timeline";
import { days } from "../data/pages";
import { refs } from "../data/refs";

const day = days[8];

export function DepartDay() {
  return (
    <DayPanel day={day}>
      <DayStatusList ids={["flights", "return-skyliner", "tokyo-airbnb"]} />
      <DaySchedule
        alternatives={
          <DataTable
            columns={["情況", "改做"]}
            rows={[
              [
                "想直達、行李較多",
                "Narita Express，東京→成田空港第2ビル普通車 3,140 日圓（公式 2026-03-14）。約 53 分。N'EX 來回票不適用（去程須由成田出發）。",
              ],
              [
                "想較便宜",
                "京成 Access Express 日暮里／上野→空港 1,240 日圓；較慢、停站多，冬天趕晚上國際航班較不穩",
              ],
              [
                "不要首選機場巴士",
                "東京駅八重洲北口 Airport Limousine 大人 3,100 日圓，冬天受路況影響，不建議當趕機主線",
              ],
              [
                "趕不上 16:45 班",
                "改乘現行平日 17:05 日暮里開出的 Skyliner（約 17:42 到 T2）；約 16:10 前由住宿出發。仍要目標 17:55 前到 T2。",
              ],
              [
                "改去上午哈利波特",
                "只可訂最早入場，正午前後結束並取行李，約 15:50–16:00 由大山出發。見 1/16 備選。",
              ],
            ]}
          />
        }
        timeline={
          <Timeline
            items={[
              {
                title: "由大山住宿出發",
                description: "建議約 15:50–16:00",
                price: "IC 370 日圓",
                detail: (
                  <TimeList
                    times={[
                      "自助退房；頁面未顯示退房時刻，出發前再對 Airbnb",
                      "東武東上線至池袋，轉山手線外迴至日暮里",
                      "門到門至日暮里約 35–45 分（估算，出發前再對）",
                    ]}
                  />
                ),
                link: { href: refs.mapsOyamaNippori.href, label: "Google 地圖：大山駅至日暮里駅" },
              },
              {
                title: "Skyliner 至成田第2航廈",
                description: "現行平日 16:45 開，約 17:22 到 T2",
                price: "約 2,470 日圓",
                detail: (
                  <TimeList
                    intro="日暮里至空港第2ビル最快約 36 分（官方）。全車指定席，要先取位。到 T2 後辦理登機。京成現行平日表，出發前再對。"
                    times={[
                      "16:45 開，約 17:22 到 T2（主線）",
                      "17:05 開，約 17:42 到 T2（備選；約 16:10 前由住宿出發）",
                    ]}
                    note="仍要目標 17:55 前到 T2。"
                  />
                ),
                link: { href: refs.mapsOyamaNarita.href, label: "Google 地圖：大山駅至成田第2航廈" },
              },
              {
                title: "香港快運 UO693",
                description: "20:55 起飛",
                detail: "成田 T2 出發，1/19 01:20（香港時間）抵香港 T1。",
              },
            ]}
          />
        }
      />
      <SourceList
        links={[
          refs.skylinerFares,
          refs.skylinerTimetable,
          refs.nexTickets,
          refs.mapsOyamaNippori,
          refs.mapsOyamaNarita,
        ]}
      />
    </DayPanel>
  );
}
