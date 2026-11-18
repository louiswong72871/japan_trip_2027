import type { ComponentType } from "react";
import type { DayId } from "../data/pages";
import { ArriveDay } from "./ArriveDay";
import { DepartDay } from "./DepartDay";
import { DontoDay } from "./DontoDay";
import { FoxDay } from "./FoxDay";
import { GinzanDay } from "./GinzanDay";
import { HarryDay } from "./HarryDay";
import { JuhyoDay } from "./JuhyoDay";
import { KawagoeDay } from "./KawagoeDay";
import { TokyoDay } from "./TokyoDay";

export const dayViews: Record<DayId, ComponentType> = {
  arrive: ArriveDay,
  ginzan: GinzanDay,
  fox: FoxDay,
  juhyo: JuhyoDay,
  donto: DontoDay,
  tokyo: TokyoDay,
  harry: HarryDay,
  tokyo17: KawagoeDay,
  depart: DepartDay,
};
