import { gearGapsSummary, gearItems } from "../data/gear";
import { GapStatusList } from "./ConfirmableStatus";
import { ModalDialog } from "./ModalDialog";

export function GearDialog({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <ModalDialog
      open={open}
      title="衣著與備案"
      onClose={onClose}
      widthClass="w-[min(36rem,92vw)]"
    >
      <div className="flex flex-col gap-4">
        {gearItems.map((item) => (
          <section key={item.title}>
            <h3 className="text-sm font-medium text-fg">{item.title}</h3>
            <p className="mt-1 text-sm text-muted-fg">{item.detail}</p>
          </section>
        ))}
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
