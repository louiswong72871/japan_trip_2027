import { gearFieldNotes, gearGapsSummary, gearItems } from "../data/gear";
import { GapStatusList } from "./ConfirmableStatus";
import { ModalDialog } from "./ModalDialog";

export function GearDialog({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const essential = gearItems[0];
  const weather = gearItems[1];

  return (
    <ModalDialog
      open={open}
      title="衣著與備案"
      onClose={onClose}
      widthClass="w-[min(36rem,92vw)]"
    >
      <div className="flex flex-col gap-4">
        <section>
          <h3 className="text-sm font-medium text-fg">{essential.title}</h3>
          <p className="mt-1 text-sm text-muted-fg">{essential.detail}</p>
        </section>
        <section>
          <h3 className="text-sm font-medium text-fg">藏王山頂穿著備註</h3>
          <p className="mt-1 text-sm text-muted-fg">
            二月實地經驗，供裝備參考，不是已核實的必備清單。
          </p>
          <div className="mt-3 flex flex-col gap-4">
            {gearFieldNotes.map((note) => (
              <div key={note.source}>
                <p className="text-sm font-medium text-fg">{note.source}</p>
                <ul className="mt-1 list-disc space-y-0.5 pl-5 text-sm text-muted-fg">
                  {note.layers.map((layer) => (
                    <li key={layer}>{layer}</li>
                  ))}
                </ul>
                <p className="mt-1 text-sm text-muted-fg">{note.note}</p>
              </div>
            ))}
          </div>
        </section>
        <section>
          <h3 className="text-sm font-medium text-fg">{weather.title}</h3>
          <p className="mt-1 text-sm text-muted-fg">{weather.detail}</p>
        </section>
        <section>
          <h3 className="text-sm font-medium text-fg">必要缺項</h3>
          <p className="mt-1 text-sm text-muted-fg">{gearGapsSummary}</p>
          <p className="mt-3 text-sm text-fg">
            以下為計劃中尚未核實或尚未下訂的項目。預設與行程原稿一致；可在本機標為已確認或寫下備註，不會代為購票或改訂。
          </p>
          <div className="mt-3">
            <GapStatusList />
          </div>
        </section>
      </div>
    </ModalDialog>
  );
}
