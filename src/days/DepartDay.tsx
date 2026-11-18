import { DayStatusList } from "../components/ConfirmableStatus";
import { Alternatives } from "../components/Alternatives";
import { DataTable } from "../components/DataTable";
import { DayPanel } from "../components/DayPanel";
import { SourceList } from "../components/SourceList";
import { Timeline } from "../components/Timeline";
import { days } from "../data/pages";
import { refs } from "../data/refs";

const day = days[8];

function Points({ items }: { items: string[] }) {
  return (
    <ul className="list-disc space-y-1 ps-4">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

export function DepartDay() {
  return (
    <DayPanel day={day}>
      <DayStatusList ids={["flights", "return-skyliner", "tokyo-airbnb"]} />
      <Timeline
        items={[
          {
            title: "15:50–16:00",
            description: "由大山住宿出發，自助退房",
            detail: (
              <Points
                items={[
                  "板橋大山駅南口 Airbnb",
                  "頁面未顯示退房時刻，出發前再對 Airbnb（待確認）",
                ]}
              />
            ),
          },
          {
            title: "約 35–45 分",
            description: "東武東上線至池袋，轉山手線外迴至日暮里",
            detail: (
              <Points
                items={[
                  "含步行與轉乘的門到門估算，出發前再對",
                  "駅探現行一例 13:32–13:56，24 分，IC 370 円，轉乘 1 次（2026-11-15）",
                ]}
              />
            ),
            link: { href: refs.mapsOyamaNippori.href, label: "Google 地圖：大山駅至日暮里駅" },
          },
          {
            title: "16:45",
            description: "日暮里開出 Skyliner",
            detail: (
              <Points
                items={[
                  "全車指定席，要先取位",
                  "京成現行平日表，出發前再對",
                ]}
              />
            ),
          },
          {
            title: "約 17:22",
            description: "到成田 T2",
            detail: (
              <Points
                items={[
                  "日暮里至空港第2ビル最快約 36 分（官方）",
                  "官方頁曾列日暮里／上野→空港第2ビル 2,470 日圓（IC 2,465）",
                  "經東京駅轉日暮里約 2,630 日圓",
                  "另一頁列標準 2,580、網上割引 2,310",
                  "冬天建議 17:55 前到 T2，其後辦理登機",
                ]}
              />
            ),
            link: { href: refs.mapsOyamaNarita.href, label: "Google 地圖：大山駅至成田第2航廈" },
          },
          {
            title: "20:55（JST）",
            description: "香港快運 UO693 起飛",
            detail: (
              <Points
                items={[
                  "成田 T2 出發",
                  "1/19 01:20（香港時間）抵香港 T1",
                ]}
              />
            ),
          },
        ]}
      />
      <Alternatives label="當日備選">
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
      </Alternatives>
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
