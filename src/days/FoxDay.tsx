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

const day = days[2];

export function FoxDay() {
  return (
    <DayPanel day={day}>
      <Properties
        items={[
          {
            label: "宮城藏王キツネ村",
            value: "1月12日（週二）日間必去，15:00 前離場，不排晚上",
          },
          {
            label: "官網",
            value: <TextLink href={refs.foxHome.href}>宮城藏王キツネ村</TextLink>,
          },
          {
            label: "冬季時間",
            value:
              "2026-10-15 起冬季營業：9:00-16:00，最終入場 15:30。暴風雪可縮短；雨天照常營業。",
          },
          {
            label: "費用與預約",
            value:
              "成人（中學生以上）1,500 日圓，現場現金；官方寫不做前售票。個人不須預約；2026年2月起不受理個人安排的團體預約。",
          },
        ]}
      />
      <section>
        <h3 className="mb-3 font-serif text-lg font-semibold">狀態</h3>
        <DayStatusList ids={["fox-transport"]} />
      </section>
      <section>
        <h3 className="mb-3 font-serif text-lg font-semibold">要去哪：日間時間線</h3>
        <Properties
          items={[
            {
              label: "在用交通",
              value:
                "やまびこ（不停白石藏王的はやぶさ／こまち不要乘）＋タケヤ循環線。1/12 平日不能用山麓アクセス線。現行表，出發前再對 2027年1月。時間為日本時間（JST）。",
            },
            {
              label: "費用（現行，須再對）",
              value:
                "新幹線自由席第三方報價片道 1,690 日圓；指定席用えきねっと再查。循環巴士大人 1,000 日圓。入場 1,500 日圓，現場現金。",
            },
          ]}
        />
        <div className="mt-4">
          <Timeline
            items={[
              {
                title: "酒店 5F 出發",
                description: "09:10–09:15（估算）",
                detail:
                  "走仙台站西口（官方徒步 3 分），入站轉 3 樓新幹線改札、4 樓 14 番線。發車前 20–25 分到月台。",
              },
              {
                title: "やまびこ 132號",
                description: "09:41–09:55",
                detail: "仙台 14番線開，白石藏王 2番線到。",
              },
              {
                title: "循環巴士第 1 便",
                description: "10:15–10:49",
                detail: "白石藏王站前上車，10:49 到狐狸村。在站前等車。滿員改乘 13:05。",
              },
              {
                title: "狐狸村（日間必去）",
                description: "10:49–15:00",
                detail: "在園內活動。15:00 必須離場趕末班。自備午餐。",
              },
              {
                title: "末班循環巴士",
                description: "15:00–15:36",
                detail: "由村開出，15:36 到白石藏王。",
              },
              {
                title: "やまびこ 143號（較穩）",
                description: "16:51–17:05",
                detail: "白石藏王 1番線開，仙台 14番線到。走西口回酒店，約 17:20 到。",
              },
            ]}
          />
        </div>
      </section>
      <Alternatives label="若改班或改跟團">
        <DataTable
          columns={["情況", "改做"]}
          rows={[
            ["想更早到白石藏王", "やまびこ 128：08:40 仙台開，08:53 到，仍轉 10:15 巴士"],
            ["錯過或坐滿 10:15", "下一班 13:05（13:39 到）或站前的士上山（官方約 20 分）"],
            ["惡天提早關門", "12:10 發村，12:46 到白石藏王"],
            ["趕不上 15:00 末班", "請村職員叫的士；其後新幹線現行有 16:51、17:51，末班約 23:13"],
          ]}
        />
        <DataTable
          columns={["團", "集合／出發", "去哪、做什麼", "時長／回程"]}
          rows={[
            [
              "KKday 20358 狐狸村＋松島拼車",
              "JR仙台站東口 08:30 或 09:00；出發前 10 分到。酒店在西口，須提早過去",
              "狐狸村；松島遊船（丸文松島汽船 2號櫃位換票）；食物券換魚餅、烤蠔。餐自理。司機日文、無導覽",
              "約 8 小時 30 分，東口解散。最少 12 人（頁內另列 15 人）。遊船停駛退還 1,200 日圓。含竹雀庵烤蠔兌換，屬零食不是一餐，亦會壓縮狐狸村時間。不當 1/14 吃蠔主方案。尚未下訂（2026-11-14 查）",
            ],
            [
              "KKday 23981 狐狸村包車半日",
              "08:00–13:00 自選；JR仙台站或附近酒店接送，本酒店可用",
              "只去狐狸村，園內約 90 分；單程車程約 90 分。日文司機、無導遊。按車計費",
              "約 4.5 小時，送回出發點。最少 1 人。尚未下訂（2026-11-14 查）",
            ],
          ]}
        />
      </Alternatives>
      <SourceList
        links={[
          refs.foxHome,
          refs.foxCalendar,
          refs.takeya,
          refs.accessLine,
          refs.yamabiko132,
          refs.yamabiko141,
          refs.kkdayFoxMatsushima,
          refs.kkdayFoxPrivate,
        ]}
      />
    </DayPanel>
  );
}
