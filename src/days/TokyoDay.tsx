import { DayStatusList } from "../components/ConfirmableStatus";
import { Alternatives } from "../components/Alternatives";
import { DataTable } from "../components/DataTable";
import { DayPanel } from "../components/DayPanel";
import { Properties } from "../components/Properties";
import { SourceList } from "../components/SourceList";
import { TextLink } from "../components/TextLink";
import { Timeline } from "../components/Timeline";
import { days } from "../data/pages";
import { refs } from "../data/refs";

const day = days[5];

export function TokyoDay() {
  return (
    <DayPanel day={day}>
      <Properties
        items={[
          {
            label: "在用交通",
            value:
              "東北新幹線はやぶさ指定席 e票（えきねっと）。全車指定席，沒有自由席。現行通常期大人 11,430 日圓。1/15（五）依現行季節規則是通常期。座位預計 2026-12-15 10:00（日本時間，香港時間 09:00）開賣，現在還買不到。現行表，出發前再對 2027年1月。時間為日本時間（JST）。不買 JR EAST PASS、JR TOKYO Wide Pass、全國 Japan Rail Pass。若尚未有 IC，1/10 可在仙台駅買 Welcome Suica（購卡起 28 日）。",
          },
          {
            label: "退房",
            value:
              "リッチモンドホテルプレミア仙台駅前，11:00 前退房。可更早離開；清晨交鑰匙或寄行李須向酒店確認。",
          },
          {
            label: "東京住宿",
            value: (
              <>
                板橋 大山駅南口 Airbnb，東武東上線大山駅南口步行約 3 分（房源標示）。1/15 入住、1/18 退房；連結所示 4 位客人。自助入住／退房；頁面未顯示入住與退房時刻，出發前再對 Airbnb。用戶提供；電郵尚未找到訂房確認。{" "}
                <TextLink href={refs.airbnbTokyo.href}>房源</TextLink>
                {" · "}
                <TextLink href={refs.hostCheckinGuide.href}>房東入住指引</TextLink>
              </>
            ),
          },
          {
            label: "下午建議",
            value: (
              <>
                <TextLink href={refs.teamlabTickets.href}>teamLab Planets</TextLink>
                {" （豐洲）。須官網日時指定預購 QR 票，現場窗口不賣。先到大山駅入住再出發。不要與 SHIBUYA SKY 同日硬疊。"}
              </>
            ),
          },
        ]}
      />
      <section>
        <h3 className="mb-3 font-serif text-lg font-semibold">狀態</h3>
        <DayStatusList ids={["hayabusa", "teamlab", "tokyo-airbnb"]} />
      </section>
      <Timeline
        items={[
          {
            title: "酒店出發",
            description: "約 06:40（估算）",
            detail:
              "走西口至仙台駅新幹線改札。官方徒步約 3 分，另加站內移動；冬天建議發車前 20–25 分已到月台。",
            link: { href: refs.mapsHotelSendaiWalk.href, label: "Google 地圖：酒店步行至仙台駅" },
          },
          {
            title: "はやぶさ102號（現行表）",
            description: "07:21–08:56",
            detail:
              "仙台至東京，約 1 小時 35 分。用えきねっと e票。東北新幹線不需預訂超大型行李位；三邊合計 250cm 以內、每件 30kg 以下、最多 2 件免費，置物處先到先用。",
            link: { href: refs.mapsSendaiTokyo.href, label: "Google 地圖：仙台駅至東京駅" },
          },
          {
            title: "抵達東京駅",
            description: "08:56",
            detail: "當日不排哈利波特影城。出新幹線後轉丸ノ內線至池袋，再轉東武東上線至大山。",
          },
          {
            title: "赴大山駅入住",
            description: "車上約 29–30 分；約 10:00–11:00 到（估算）",
            detail:
              "東京駅丸ノ內線至池袋，轉東武東上線至大山。車上約 29–30 分，IC 370 円，轉乘 1 次（駅探 2026-11-07 表）。連出閘、轉乘與南口步行，門到門約 50–70 分（估算，帶行李，出發前再對）。",
            link: { href: refs.mapsTokyoOyama.href, label: "Google 地圖：東京駅至大山駅" },
          },
          {
            title: "南口步行至住宿",
            description: "房源標示約 3 分",
            detail:
              "出南口後按房東入住指引步行至住宿。自助開鎖，密碼見房東簡報。住宅區、隔音一般，保持安靜。",
            link: { href: refs.mapsOyamaSouth.href, label: "Google 地圖：大山駅南口" },
          },
          {
            title: "teamLab Planets（豐洲）",
            description: "建議下午",
            detail:
              "須官網日時指定預購 QR 票，現場窗口不賣。會期至 2027 年底。由大山駅出發：東武東上線至池袋（約 6 分），轉有樂町線至豐洲（官方池袋至豐洲車上約 27 分，不含轉乘）；豐洲 7 番出口步行約 10 分，或轉ゆりかもめ一站至新豐洲再步行約 1 分。門到門約 55–70 分（估算，查閱 2026-11-15）。",
            link: {
              href: refs.mapsOyamaTeamlab.href,
              label: "Google 地圖：大山駅至 teamLab Planets",
            },
          },
        ]}
      />
      <Alternatives label="當日備選車次">
        <DataTable
          columns={["情況", "改做"]}
          rows={[
            ["能更早離開酒店", "はやぶさ2號，06:35 開、08:07 到；約 05:55–06:00 出發（估算）"],
            ["想再晚一點", "はやぶさ4號 07:53–09:23，或 08:17／08:44 開出（現行表）"],
            ["想較便宜", "やまびこ自由席現行約 10,780 日圓，約 2 小時–2 小時 25 分；帶行李不建議當主線"],
            ["1/15 太累或行李未安頓", "改 1/17 去 teamLab，仍須官網預購。不要與當日 SHIBUYA SKY 硬疊"],
            ["想先去 teamLab", "可在東京駅寄行李，下午由東京駅出發，再回大山入住"],
            ["不要同日再去 SHIBUYA SKY", "SKY 主線放 1/16 傍晚"],
          ]}
        />
      </Alternatives>
      <SourceList
        links={[
          refs.ekiTicket,
          refs.seatSale,
          refs.hayabusa2,
          refs.luggage,
          refs.mapsHotelSendaiWalk,
          refs.mapsSendaiTokyo,
          refs.airbnbTokyo,
          refs.hostCheckinGuide,
          refs.mapsTokyoOyama,
          refs.mapsOyamaSouth,
          refs.teamlabTickets,
          refs.teamlabAccess,
          refs.mapsOyamaTeamlab,
          refs.mapsTokyoTeamlab,
        ]}
      />
    </DayPanel>
  );
}
