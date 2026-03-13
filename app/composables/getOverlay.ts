export default function getOverlay() {
  const overlay = useOverlay();
  onBeforeRouteLeave(() => overlay.closeAll());
  return overlay;
}
