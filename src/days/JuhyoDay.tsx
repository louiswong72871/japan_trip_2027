import { DayStatusList } from "../components/ConfirmableStatus";
import { Callout } from "../components/Callout";
import { DayPanel } from "../components/DayPanel";
import { Properties } from "../components/Properties";
import { SourceList } from "../components/SourceList";
import { TextLink } from "../components/TextLink";
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
      <Properties
        items={[
          {
            label: "山形藏王樹冰",
            value: "1月13日（週三）日間必去，早上出發，傍晚前下山",
          },
          {
            label: "官方纜車",
            value: <TextLink href={refs.ropewayGuide.href}>冬季乘車案內</TextLink>,
          },
          {
            label: "費用",
            value: "地藏山頂往復成人 4,400 日圓；樹冰高原駅往復 2,200 日圓。",
          },
          {
            label: "營業時間（現行，可變更）",
            value:
              "山麓線 8:30-17:00，山頂線 8:45-16:45。地藏山頂往復上行最終為藏王山麓駅 16:00 發。",
          },
        ]}
      />
      <section>
        <h3 className="mb-3 font-serif text-lg font-semibold">狀態</h3>
        <DayStatusList ids={["juhyo-transport"]} />
      </section>
      <section>
        <h3 className="mb-3 font-serif text-lg font-semibold">要去哪：日間時間線</h3>
        <Timeline
          items={[
            {
              title: "由酒店出發",
              description: "早上",
              detail:
                "日間必去，不排晚上。乘平日高速巴士或仙山線至山形站；不要用 1/11 土日祝時刻。具體班次尚未排定。",
            },
            {
              title: "山形站前 1 番乘 Z90",
              description: "現行約每小時一班，末班約 18:55",
              detail: "往藏王溫泉。",
            },
            {
              title: "纜車上地藏山頂",
              description: "山麓線 8:30–17:00，上行最終山麓 16:00",
              detail: "去地藏山頂／樹冰高原，不用宮城澄川代替。山頂線 8:45–16:45。",
            },
            {
              title: "在山頂，傍晚前下山",
              description: "日間",
              detail: "午餐可在山形市或溫泉街。2026-27 夜燈不含 1/13。",
            },
            {
              title: "C2 回山形站，再回仙台",
              description: "總站現行約 19:50 開、20:27 到站前",
              detail:
                "再乘平日高速巴士或仙山線回酒店。仙台東口冬季直達巴士 2026-27 季尚未公布，不能當可訂。",
            },
          ]}
        />
      </section>
      <SourceList
        links={[
          refs.juhyo,
          refs.ropewayGuide,
          refs.lighting,
          refs.z90,
          refs.c2,
          refs.directBus,
        ]}
      />
    </DayPanel>
  );
}
