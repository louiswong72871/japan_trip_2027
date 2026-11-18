import type { DayId } from "../data/pages";
import type { ComponentType, SVGProps } from "react";
import {
  IconArrive,
  IconDepart,
  IconFox,
  IconGinzan,
  IconHarry,
  IconJuhyo,
  IconKawagoe,
  IconOyster,
  IconTokyo,
} from "./icons";

export const dayIcons: Record<DayId, ComponentType<SVGProps<SVGSVGElement>>> = {
  arrive: IconArrive,
  ginzan: IconGinzan,
  fox: IconFox,
  juhyo: IconJuhyo,
  donto: IconOyster,
  tokyo: IconTokyo,
  harry: IconHarry,
  tokyo17: IconKawagoe,
  depart: IconDepart,
};
