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

const day = days[0];

export function ArriveDay() {
  return (
    <DayPanel day={day}>
      <DayStatusList ids={["flights", "sendai-hotel"]} />
      <DaySchedule
        alternatives={
          <DataTable
            columns={["情況", "改做"]}
            rows={[
              ["出關較快", "可趕 14:28 開、14:55 到仙台"],
              ["錯過班次", "下一班約 20 分一班，直至末班 23:23 開、23:51 到"],
              [
                "行李多或想直達",
                <>
                  機場的士至酒店。{" "}
                  <TextLink href={refs.mapsDrive.href}>行車／的士路線</TextLink>
                </>,
              ],
            ]}
          />
        }
        timeline={
          <Timeline
            items={[
              {
                title: "香港國際機場 T2 出發",
                description: "08:55（香港時間）",
                detail: "香港快運 UO890。按航空公司報到時限到 T2。",
              },
              {
                title: "抵仙台機場",
                description: "14:00",
                detail: (
                  <TimeList
                    times={[
                      "出關及領行李約 30–60 分（估算），視當日而定",
                      "跟指示往仙台空港駅",
                    ]}
                  />
                ),
              },
              {
                title: "アクセス線往仙台站",
                description: "視出關時間；車程約 25 分",
                price: "大人 680 日圓（IC 672 日圓）",
                detail: (
                  <TimeList
                    intro="現行表（2026-03-14 改正，平日與土日祝相同，出發前再對 2027年1月）："
                    times={[
                      "14:28 開、14:55 到",
                      "14:48 開、15:13 到",
                      "15:08 開、15:33 到",
                      "15:28 開、15:53 到",
                    ]}
                    note="到著多為 3 番線。14:28 較緊，較穩乘 14:48 或 15:08。"
                  />
                ),
                link: { href: refs.mapsTransit.href, label: "Google 地圖：仙台空港至酒店" },
              },
              {
                title: "西口步行至酒店入住",
                description: "到站後約 5–10 分（估算）",
                detail: (
                  <TimeList
                    times={[
                      "出仙台站西口，官方徒步約 3 分，前台在 5F",
                      "14:00 起可入住",
                    ]}
                  />
                ),
                link: { href: refs.mapsWalk.href, label: "Google 地圖：西口步行至酒店" },
              },
              {
                title: "西口圈晚餐，不排遠行程",
                description: "傍晚",
              },
            ]}
          />
        }
      />
      <SourceList
        links={[
          refs.hotel,
          refs.senatTime,
          refs.senatFare,
          refs.mapsTransit,
          refs.mapsWalk,
          refs.mapsDrive,
        ]}
      />
    </DayPanel>
  );
}
