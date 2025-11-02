export function setupControls(container, targetGroup) {
  const isDragging = { current: false };
  const prevMouse = { x: 0, y: 0 };

  const onMouseDown = (e) => {
    isDragging.current = true;
    prevMouse.x = e.clientX;
    prevMouse.y = e.clientY;
  };
  const onMouseUp = () => (isDragging.current = false);
  const onMouseMove = (e) => {
    if (!isDragging.current) return;
    const deltaX = e.clientX - prevMouse.x;
    const deltaY = e.clientY - prevMouse.y;
    targetGroup.rotation.y += deltaX * 0.01;
    targetGroup.rotation.x += deltaY * 0.01;
    prevMouse.x = e.clientX;
    prevMouse.y = e.clientY;
  };

  container.addEventListener("mousedown", onMouseDown);
  container.addEventListener("mouseup", onMouseUp);
  container.addEventListener("mouseleave", onMouseUp);
  container.addEventListener("mousemove", onMouseMove);

  return () => {
    container.removeEventListener("mousedown", onMouseDown);
    container.removeEventListener("mouseup", onMouseUp);
    container.removeEventListener("mouseleave", onMouseUp);
    container.removeEventListener("mousemove", onMouseMove);
  };
}
