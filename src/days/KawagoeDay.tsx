import { DayStatusList } from "../components/ConfirmableStatus";
import { Alternatives } from "../components/Alternatives";
import { DataTable } from "../components/DataTable";
import { DayPanel } from "../components/DayPanel";
import { SourceList } from "../components/SourceList";
import { TextLink } from "../components/TextLink";
import { Timeline } from "../components/Timeline";
import { days } from "../data/pages";
import { refs } from "../data/refs";

const day = days[7];

export function KawagoeDay() {
  return (
    <DayPanel day={day}>
      <p className="text-sm text-fg">
        川越主線不必預購。相撲、ジブリ只在已有票時改走備選；teamLab 與 SHIBUYA SKY 亦為備選。
      </p>
      <DayStatusList ids={["sumo", "ghibli", "teamlab", "sky"]} />
      <Timeline
        items={[
          {
            title: "由大山住宿出發",
            description: "約 09:00–09:15（估算）",
            detail:
              "南口步行約 3 分（房源標示）入大山駅。東武東上線同一路線往川越：現行乘換檢索顯示急行、快速、川越特急、準急都不停大山，先乘普通。趕現行土休日一例 09:37 開出的普通（川越市行）。直達 10:29 到川越（現行土休日一例約 52 分）；或同班 10:06 到志木轉 10:17 到的急行，亦可在朝霞台轉急行、川越特急（約 40 分）。門到門至川越駅約 55–75 分（估算，含步行與候車）。也可坐到下一站川越市，喜多院官方徒歩約 18 分。Yahoo!路線情報 2026-11-22（日）表，IC 大人 429 円、車票 430 円（駅探 2026-11-18）；來回 IC 約 858 円，不必另買一日鐵路通票。現行表，出發前再對 2027年1月。預留候車與轉乘緩衝。",
            link: { href: refs.mapsOyamaKawagoe.href, label: "Google 地圖：大山駅至川越駅" },
          },
          {
            title: "喜多院（先去）",
            description: "上午",
            detail:
              "官方大人 400 円。11/24–2 月末日祝 9:00–16:20，受付至閉門 30 分前（15:50）；官方寫 1 月或會變更。市公所列拝観中止至 1/8，1/17 不在中止日。看客殿（家光誕生の間）、書院與五百羅漢。川越駅徒歩約 20 分，或乘小江戸巡回バス（現行大人 220 円；3 次以上可考慮 1 日券 600 円，時刻為 2025-04-01 表，出發前再對）。",
            link: { href: refs.mapsKawagoeKitain.href, label: "Google 地圖：川越駅步行至喜多院" },
          },
          {
            title: "蔵造りの町並み、時の鐘、午餐",
            description: "正午前後至午後",
            detail:
              "喜多院向北走到一番街。時の鐘免費，每日 6:00、12:00、15:00、18:00 鳴鐘。一帶午餐，不必預先訂位。再走菓子屋横丁；各店定休不同。可選川越まつり会館（10–3 月 9:30–17:30，入館至 17:00，一般 300 円；1/17 不是休館日）或本丸御殿（9:00–17:00，入館至 16:30，一般 100 円；週日開館）。",
            link: { href: refs.mapsKawagoeToki.href, label: "Google 地圖：川越駅步行至時の鐘" },
          },
          {
            title: "小江戸蔵里「KURA PLANET」",
            description: "日沒後至約 21:00",
            detail:
              "官方期間 2026-11-28 至 2027-02-28，日沒後至約 21:00，免費；荒天或中止。日落後氣溫低，預留候車與轉乘緩衝。川越駅徒歩約 15 分，本川越駅徒歩約 3 分。可在附近吃晚飯後回大山。",
            link: { href: refs.mapsKawagoeKurari.href, label: "Google 地圖：川越駅步行至小江戸蔵里" },
          },
          {
            title: "東武東上線回大山",
            description: "點燈結束後",
            detail:
              "回程同樣：普通可直達，或在成増／志木／朝霞台轉入停大山的普通。現行土休日一例：20:39 川越普通直達 21:23 到大山（44 分）；或 20:30 急行轉成増，21:08 到（38 分）。IC 429 円。現行土休日末班 23:44 普通直達，0:24 到大山，不必趕末班。出發前再對。",
            link: { href: refs.mapsOyamaKawagoe.href, label: "Google 地圖：大山駅至川越駅" },
          },
        ]}
      />
      <Alternatives label="當日備選">
        <DataTable
          columns={["情況", "改做"]}
          rows={[
            [
              "已買到 1/17 初場所票",
              <>
                1/17 是令和9年一月場所中日（日），両国国技館。官方 12 日目まで開場 8:45。由大山經池袋、秋葉原至両国，現行一例約 46 分、轉乘 2 次，門到門約 60–75 分（估算）。一般発売 2026-12-05 10:00（JST）；11/21–24 ファンクラブ 2 次抽選（須有料會員）；11/27–29 チケット大相撲先行抽選（免費登錄）；12/2–3 ぴあ先行。抽選完售則一般発売沒有該席。日曆可選不等於有位。{" "}
                <TextLink href={refs.sumoTickets.href}>チケット大相撲</TextLink>
                {" · "}
                <TextLink href={refs.mapsOyamaKokugikan.href}>大山駅至両国国技館</TextLink>
              </>,
            ],
            [
              "想留在東京市區",
              <>
                明治神宮＋原宿／表參道：大山至池袋轉副都心線至明治神宮前，現行約 26–33 分、轉乘 1 次，IC 366 円；門到門約 40–55 分（估算）。官方 1 月開門 6:40、閉門 16:20。表參道與代々木公園イルミネーション在 1/17 已結束。{" "}
                <TextLink href={refs.mapsOyamaJingu.href}>大山駅至明治神宮</TextLink>
              </>,
            ],
            [
              "淺草一日",
              <>
                大山至池袋轉山手線至上野，再轉銀座線至淺草。現行較快一例約 42 分、轉乘 2 次，門到門約 55–70 分（估算）。不必預購票。{" "}
                <TextLink href={refs.mapsOyamaAsakusa.href}>大山駅至淺草駅</TextLink>
              </>,
            ],
            [
              "傍晚想看丸の内燈飾",
              <>
                官方 2026-11-12 至 2027-02-14，16:00–23:00，免費。聖誕市集已於 12/25 結束，燈飾仍在。由川越再赴東京駅現行約 56 分–1 小時 6 分，屬跨區折返；若改走市區主線再去較順。{" "}
                <TextLink href={refs.mapsOyamaMarunouchi.href}>大山駅至東京駅</TextLink>
              </>,
            ],
            [
              "已買到ジブリ票",
              <>
                僅在已有 1/17 日時指定票時改去。1 月入場於 2026-12-10 10:00（JST）在ローチケ開賣，售完即止，窗口不賣。官方開館 10:00–18:00；1/17（日）不在已公布休館日。大山經池袋、新宿至三鷹再轉巴士，現行一例約 60 分、轉乘 3 次，門到門約 75–90 分（估算）。無票不要當主線。{" "}
                <TextLink href={refs.ghibliTicket.href}>官方購票方法</TextLink>
                {" · "}
                <TextLink href={refs.mapsOyamaGhibli.href}>大山駅至ジブリ美術館</TextLink>
              </>,
            ],
            [
              "鎌倉／江の島一日",
              <>
                大山經池袋轉湘南新宿ライン，現行較快約 1 小時 26 分–1 小時 28 分，門到門約 1 小時 40 分–2 小時（估算）。第二天要趕成田晚班，不當主線。{" "}
                <TextLink href={refs.mapsOyamaKamakura.href}>大山駅至鎌倉駅</TextLink>
              </>,
            ],
            ["1/16 哈利波特改到今天", "走法見 1/16。不當 1/17 主線。"],
            [
              "1/16 傍晚 SKY 改到今天",
              "票於 2027-01-03 00:00（JST）開賣。購票見 1/16。不要與 teamLab 同日硬疊。",
            ],
            [
              "1/15 沒去 teamLab",
              "改今天去，仍須官網預購。購票見 1/15。不要與 SKY 同日硬疊。",
            ],
          ]}
        />
      </Alternatives>
      <SourceList
        links={[
          refs.tojoLine,
          refs.tojoStopsPdf,
          refs.tobuFare,
          refs.ekitanOyamaKawagoe,
          refs.kitainVisit,
          refs.kitainCity,
          refs.tokiNoKane,
          refs.kurazukuri,
          refs.honmaruHours,
          refs.matsuriKaikan,
          refs.kurariLightup,
          refs.eagleBusFare,
          refs.eagleBusTime,
          refs.sumoSchedule,
          refs.sumoTickets,
          refs.ghibliTicket,
          refs.ghibliCalendar,
          refs.meijiJinguHours,
          refs.marunouchiIllumi,
          refs.mapsOyamaKawagoe,
          refs.mapsKawagoeKitain,
          refs.mapsKawagoeshiKitain,
          refs.mapsKawagoeToki,
          refs.mapsKawagoeKurari,
          refs.mapsOyamaKokugikan,
          refs.mapsOyamaAsakusa,
          refs.mapsOyamaJingu,
          refs.mapsOyamaKamakura,
          refs.mapsOyamaGhibli,
          refs.mapsOyamaMarunouchi,
        ]}
      />
    </DayPanel>
  );
}
