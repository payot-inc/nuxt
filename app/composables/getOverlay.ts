import type { ComponentProps } from "#build/types/layouts";
import type { OverlayOptions } from "@nuxt/ui/runtime/composables/useOverlay.js";
import type { Component } from "vue";

export default function getOverlay<T extends Component>(
  comp: T,
  options: OverlayOptions<ComponentProps<T>> = { destroyOnClose: false },
) {
  const overlay = useOverlay();
  const modal = overlay.create<T>(comp, options);
  onBeforeRouteLeave(() => overlay.closeAll());
  return modal;
}
